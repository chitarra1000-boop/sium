import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
import json
import re
import os
import time
import concurrent.futures

DB_FILE = 'database_armi.json'
IMG_DIR = 'img'
BASE_URL = 'https://dungeonedraghi.it/compendio/oggetti-magici/'

headers = {'User-Agent': 'Mozilla/5.0'}

def get_soup(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        return BeautifulSoup(html, 'html.parser')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def extract_item_urls(page_num):
    url = f"{BASE_URL}page/{page_num}/" if page_num > 1 else BASE_URL
    soup = get_soup(url)
    if not soup: return []
    links = set()
    for a in soup.select('a.woocommerce-LoopProduct-link'):
        links.add(a['href'])
    return list(links)

def parse_item_page(url):
    soup = get_soup(url)
    if not soup: return None
    
    name_el = soup.select_one('h1.product_title')
    name = name_el.text.strip() if name_el else ''
    
    img_el = soup.select_one('div.woocommerce-product-gallery__image img')
    img_url = img_el['src'] if img_el else ''
    
    # Text block for description, rarity, type
    desc_tab = soup.select_one('#tab-description')
    desc_text_raw = desc_tab.text if desc_tab else ''
    desc_html = str(desc_tab) if desc_tab else ''
    
    # Price
    # The user screenshot showed 300 MO. We can look for price element or parse text
    price_el = soup.select_one('p.price')
    price_text = price_el.text.strip() if price_el else ''
    price_match = re.search(r'(\d+)', price_text.replace('.', ''))
    price = int(price_match.group(1)) if price_match else 0
    
    # Rarity and Type are often in the product meta or description
    # Sometimes it's like: Tipo: Anello | Rarità: Leggendario
    rarity = "Comune"
    tipo = "Oggetti magici"
    
    # We will try to extract them via regex from raw text
    rarity_m = re.search(r'Rarit\w+\s*([\w\s]+?)(?:Sintonia|Effetto|$)', desc_text_raw, re.IGNORECASE)
    if rarity_m:
        rarity = rarity_m.group(1).strip()
    
    tipo_m = re.search(r'Tipo\s*([\w\s]+?)(?:Rarit|$)', desc_text_raw, re.IGNORECASE)
    if tipo_m:
        tipo = tipo_m.group(1).strip()
        
    # the actual description usually comes after "Effetto"
    desc_clean = ""
    eff_m = re.split(r'Effetto', desc_text_raw, maxsplit=1, flags=re.IGNORECASE)
    if len(eff_m) > 1:
        desc_clean = eff_m[1].strip()
    else:
        desc_clean = desc_text_raw.strip()

    return {
        'nome': name,
        'immagine_url': img_url,
        'descrizione': desc_clean,
        'rarita': rarity,
        'tipo': tipo,
        'prezzo': price,
        'valuta': 'mo'
    }

import difflib

def normalize_name(n):
    return re.sub(r'[^a-z0-9]', '', n.lower())

def main():
    print("Loading local database...")
    with open(DB_FILE, 'r', encoding='utf-8') as f:
        db = json.load(f)
        
    local_names = [item.get('nome', '') for item in db]
    local_items_by_name = {n: item for n, item in zip(local_names, db)}
    
    print("Fetching item URLs from 20 pages...")
    item_urls = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        results = executor.map(extract_item_urls, range(1, 21))
        for r in results:
            item_urls.extend(r)
            
    item_urls = list(set(item_urls))
    print(f"Found {len(item_urls)} items.")
    
    print("Fetching item details...")
    scraped_items = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        results = executor.map(parse_item_page, item_urls)
        for r in results:
            if r:
                scraped_items.append(r)
                
    print(f"Scraped details for {len(scraped_items)} items.")
    
    # Process and merge
    for sc_item in scraped_items:
        raw_name = sc_item['nome']
        
        # Fuzzy match to avoid clones
        matches = difflib.get_close_matches(raw_name, local_names, n=1, cutoff=0.7)
        matched_local_name = matches[0] if matches else None
        
        # Download image
        ext = sc_item['immagine_url'].split('.')[-1] if '.' in sc_item['immagine_url'] else 'png'
        if len(ext) > 4: ext = 'png'
        img_filename = f"img/{normalize_name(raw_name)}.{ext}"
        img_path = img_filename
        
        if sc_item['immagine_url']:
            if not os.path.exists(img_filename):
                try:
                    import requests
                    resp = requests.get(sc_item['immagine_url'], headers={'User-Agent': 'Mozilla/5.0'})
                    resp.raise_for_status()
                    with open(img_filename, 'wb') as f:
                        f.write(resp.content)
                except Exception as e:
                    print(f"Failed to download image {sc_item['immagine_url']}: {e}")
                    img_path = sc_item['immagine_url'] # Fallback to URL
        else:
            img_path = ""
            
        if matched_local_name:
            # Update image if it differs
            local_item = local_items_by_name[matched_local_name]
            if local_item.get('immagine') != img_path:
                print(f"Updating image for {local_item['nome']}")
                local_item['immagine'] = img_path
        else:
            # Create new item
            print(f"Creating new item {sc_item['nome']}")
            norm_name = normalize_name(raw_name)
            new_id = f"w_{int(time.time()*1000)}_{norm_name[:5]}"
            new_item = {
                "id": new_id,
                "nome": sc_item['nome'],
                "descrizione": sc_item['descrizione'],
                "immagine": img_path,
                "prezzo": sc_item['prezzo'],
                "rarita": sc_item['rarita'],
                "tipo": sc_item['tipo'],
                "valuta": sc_item['valuta']
            }
            db.append(new_item)
            local_items_by_name[sc_item['nome']] = new_item
            local_names.append(sc_item['nome'])
            
    print("Saving updated database...")
    with open(DB_FILE, 'w', encoding='utf-8') as f:
        json.dump(db, f, indent=2, ensure_ascii=False)
        
    print("Done!")

if __name__ == '__main__':
    main()
