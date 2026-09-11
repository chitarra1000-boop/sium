import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
import json
import re
import os
import time
import concurrent.futures
import difflib

DB_FILE = 'database_armi.json'
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
    
    desc_tab = soup.select_one('#tab-description')
    desc_text_raw = desc_tab.text if desc_tab else ''
    
    price_el = soup.select_one('p.price')
    price_text = price_el.text.strip() if price_el else ''
    price_match = re.search(r'(\d+)', price_text.replace('.', ''))
    price = int(price_match.group(1)) if price_match else 0
    
    rarity = "Comune"
    tipo = "Oggetti magici"
    
    rarity_m = re.search(r'Rarit\w+\s*([\w\s]+?)(?:Sintonia|Effetto|$)', desc_text_raw, re.IGNORECASE)
    if rarity_m:
        rarity = rarity_m.group(1).strip()
    
    tipo_m = re.search(r'Tipo\s*([\w\s]+?)(?:Rarit|$)', desc_text_raw, re.IGNORECASE)
    if tipo_m:
        tipo = tipo_m.group(1).strip()
        
    desc_clean = ""
    eff_m = re.split(r'Effetto', desc_text_raw, maxsplit=1, flags=re.IGNORECASE)
    if len(eff_m) > 1:
        desc_clean = eff_m[1].strip()
    else:
        desc_clean = desc_text_raw.strip()

    return {
        'nome': name,
        'descrizione': desc_clean,
        'rarita': rarity,
        'tipo': tipo,
        'prezzo': price,
        'valuta': 'mo'
    }

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
    
    for sc_item in scraped_items:
        raw_name = sc_item['nome']
        
        matches = difflib.get_close_matches(raw_name, local_names, n=1, cutoff=0.85)
        matched_local_name = matches[0] if matches else None
        
        if matched_local_name:
            local_item = local_items_by_name[matched_local_name]
            # Fix Homebrew ID if it's currently w_
            if local_item.get('id', '').startswith('w_'):
                print(f"Fixing ID for official item {local_item['nome']} (was homebrew)")
                local_item['id'] = local_item['id'].replace('w_', 'srd_o_')
        else:
            print(f"Creating new missing item {sc_item['nome']}")
            norm_name = normalize_name(raw_name)
            new_id = f"srd_o_{int(time.time()*1000)}_{norm_name[:5]}"
            new_item = {
                "id": new_id,
                "nome": sc_item['nome'],
                "descrizione": sc_item['descrizione'],
                "immagine": "", # INTENTIONALLY BLANK due to bad source images
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
