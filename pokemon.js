
// pokemon.js - D&D Pokemon Tabletop System

window._pokemonDefault = function(id) {
  return {
    id: id || '',
    schedaTipo: 'pokemon',
    nome: '', eta: '', giocatore: '', concept: '', rank: '', natura: '', confidence: '', soldi: '', hp: '', will: '', avatar: '',
    attrs: { str: 0, dex: 0, vit: 0, ins: 0 },
    skills: {
      brawl: 0, throw: 0, evasion: 0, weapons: 0,
      alert: 0, athletic: 0, nature: 0, stealth: 0,
      allure: 0, etiquette: 0, intimidate: 0, perform: 0,
      crafts: 0, lore: 0, medicine: 0, science: 0
    },
    social: { tough: 0, cool: 0, beauty: 0, clever: 0, cute: 0 },
    achievements: [],
    pokedex: { caught: '', seen: '' },
    inventory: { potion: '', superPotion: '', hyperPotion: '', smallPocket: '', mainPocket: '' },
    badges: ['', '', '', '', '', '', '', ''],
    party: [] // Array of Pokemon objects
  };
};

window._pokemonMonDefault = function() {
  return {
    id: 'p' + Date.now() + Math.floor(Math.random()*1000),
    avatar: '', numero: '', nome: '', abilita: '',
    hp: '', will: '', held: '', status: '', init: '', acc: '', dmg: '', eva: '', clash: '', def: '', sdef: '', rank: '',
    mosse: [
      { nome: '', tipo: '', freq: '', note: '' },
      { nome: '', tipo: '', freq: '', note: '' },
      { nome: '', tipo: '', freq: '', note: '' },
      { nome: '', tipo: '', freq: '', note: '' }
    ],
    attrs: { str: 0, dex: 0, vit: 0, spc: 0, ins: 0 },
    size: '', weight: '',
    social: { tough: 0, cool: 0, beauty: 0, cute: 0, clever: 0 },
    natura: '', conf: '', hap: '', loy: '', battles: '', victories: '',
    accessories: '', tipo: '', weakness: ''
  };
};

// Main renderer
window.renderPokemonSheet = function(scheda) {
  scheda.party = scheda.party || [];
  scheda.attrs = scheda.attrs || {};
  scheda.skills = scheda.skills || {};
  scheda.social = scheda.social || {};
  scheda.inventory = scheda.inventory || {};
  scheda.badges = scheda.badges || [];
  scheda.pokedex = scheda.pokedex || {};

  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex; width:100%; height:100%; overflow:hidden; background:#222; font-family:Arial, sans-serif; color:#ddd; position:relative;';

  // Left/Center: Trainer Card (scrollable)
  var trainerWrap = document.createElement('div');
  trainerWrap.style.cssText = 'flex:1; overflow-y:auto; padding:20px;';
  
  // Right: Party Sidebar
  var partyWrap = document.createElement('div');
  partyWrap.style.cssText = 'width:80px; background:#111; border-left:2px solid #444; display:flex; flex-direction:column; align-items:center; padding-top:10px; overflow-y:auto; z-index:50; transition:width 0.3s;';
  
  // Pokemon Overlay (hidden by default)
  var monOverlay = document.createElement('div');
  monOverlay.style.cssText = 'position:absolute; inset:0; background:rgba(0,0,0,0.85); z-index:100; display:none; flex-direction:column; padding:20px; overflow-y:auto;';

  function save() {
    if (window.fbSaveScheda) window.fbSaveScheda();
  }

  // --- TRAINER CARD BUILDER ---
  var tCard = document.createElement('div');
  tCard.style.cssText = 'max-width:900px; margin:0 auto; background:#e8f4f8; border-radius:12px; padding:20px; color:#111; box-shadow:0 8px 16px rgba(0,0,0,0.5); border:4px solid #b3d4e0; position:relative;';
  
  var header = document.createElement('div');
  header.style.cssText = 'display:flex; border-bottom:3px solid #333; padding-bottom:10px; margin-bottom:15px;';
  
  // Avatar
  var avBox = document.createElement('div');
  avBox.style.cssText = 'width:150px; height:150px; border:2px solid #555; background:#fff; margin-right:20px; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden; border-radius:8px;';
  var avImg = document.createElement('img');
  avImg.style.cssText = 'width:100%; height:100%; object-fit:cover; display:' + (scheda.avatar ? 'block' : 'none') + ';';
  avImg.src = scheda.avatar || '';
  var avTxt = document.createElement('span');
  avTxt.textContent = 'Avatar';
  avTxt.style.display = scheda.avatar ? 'none' : 'block';
  avBox.appendChild(avImg); avBox.appendChild(avTxt);
  avBox.onclick = function() {
    var url = prompt('URL Immagine Allenatore:', scheda.avatar);
    if (url !== null) {
      scheda.avatar = url;
      avImg.src = url;
      if (url) { avImg.style.display='block'; avTxt.style.display='none'; } else { avImg.style.display='none'; avTxt.style.display='block'; }
      save();
    }
  };
  header.appendChild(avBox);
  
  // Info grid
  var infoGrid = document.createElement('div');
  infoGrid.style.cssText = 'flex:1; display:grid; grid-template-columns:1fr 1fr; gap:10px;';
  
  function createInput(label, obj, key, type, width) {
    var d = document.createElement('div');
    d.style.cssText = 'display:flex; flex-direction:column;';
    var l = document.createElement('label');
    l.textContent = label;
    l.style.cssText = 'font-size:11px; font-weight:bold; color:#555; text-transform:uppercase;';
    var i = document.createElement(type === 'textarea' ? 'textarea' : 'input');
    if (type !== 'textarea') i.type = type || 'text';
    i.value = obj[key] || '';
    i.style.cssText = 'border:none; border-bottom:1px solid #999; background:transparent; padding:2px 4px; font-size:14px; outline:none; font-family:inherit;';
    if (width) i.style.width = width;
    i.oninput = function() { obj[key] = i.value; save(); };
    d.appendChild(l); d.appendChild(i);
    return d;
  }
  
  var leftInfo = document.createElement('div');
  leftInfo.style.cssText = 'display:flex; flex-direction:column; gap:5px;';
  leftInfo.appendChild(createInput('Nome', scheda, 'nome'));
  leftInfo.appendChild(createInput('Età', scheda, 'eta'));
  leftInfo.appendChild(createInput('Giocatore', scheda, 'giocatore'));
  leftInfo.appendChild(createInput('Concept', scheda, 'concept'));
  
  var rightInfo = document.createElement('div');
  rightInfo.style.cssText = 'display:flex; flex-direction:column; gap:5px;';
  rightInfo.appendChild(createInput("Trainer's Card Rank", scheda, 'rank'));
  rightInfo.appendChild(createInput('Natura', scheda, 'natura'));
  rightInfo.appendChild(createInput('Confidence', scheda, 'confidence'));
  
  var statsInfo = document.createElement('div');
  statsInfo.style.cssText = 'display:flex; gap:15px; margin-top:10px;';
  statsInfo.appendChild(createInput('Soldi ($)', scheda, 'soldi', 'text', '80px'));
  statsInfo.appendChild(createInput('HP', scheda, 'hp', 'text', '60px'));
  statsInfo.appendChild(createInput('WILL', scheda, 'will', 'text', '60px'));
  rightInfo.appendChild(statsInfo);
  
  infoGrid.appendChild(leftInfo);
  infoGrid.appendChild(rightInfo);
  header.appendChild(infoGrid);
  tCard.appendChild(header);

  // Body grid (Attributes/Skills vs Pokedex/Inventory/Badges)
  var bodyGrid = document.createElement('div');
  bodyGrid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:30px;';
  
  // --- LEFT COL: Stats ---
  var statsCol = document.createElement('div');
  
  function createDots(label, obj, key, max) {
    var w = document.createElement('div');
    w.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;';
    var l = document.createElement('span');
    l.textContent = label;
    l.style.cssText = 'font-size:12px; font-weight:bold; width:80px; text-transform:uppercase;';
    var d = document.createElement('div');
    d.style.cssText = 'display:flex; gap:3px;';
    
    var dots = [];
    for(let i=1; i<=max; i++) {
      let dot = document.createElement('div');
      dot.style.cssText = 'width:12px; height:12px; border-radius:50%; border:1px solid #333; cursor:pointer; background:' + (obj[key]>=i ? '#333' : 'transparent');
      dot.onclick = function() {
        if (obj[key] === i) obj[key] = i-1; // toggle off
        else obj[key] = i;
        dots.forEach((dd, idx) => { dd.style.background = (obj[key]>idx ? '#333' : 'transparent'); });
        save();
      };
      dots.push(dot);
      d.appendChild(dot);
    }
    w.appendChild(l); w.appendChild(d);
    return w;
  }
  
  var attrBox = document.createElement('div');
  attrBox.innerHTML = '<div style="font-weight:bold; margin-bottom:5px; border-bottom:1px solid #999;">ATTRIBUTI BASE</div>';
  attrBox.appendChild(createDots('Strength', scheda.attrs, 'str', 6));
  attrBox.appendChild(createDots('Dexterity', scheda.attrs, 'dex', 6));
  attrBox.appendChild(createDots('Vitality', scheda.attrs, 'vit', 6));
  attrBox.appendChild(createDots('Insight', scheda.attrs, 'ins', 6));
  statsCol.appendChild(attrBox);
  
  var skillBox = document.createElement('div');
  skillBox.innerHTML = '<div style="font-weight:bold; margin-bottom:5px; margin-top:15px; border-bottom:1px solid #999;">SKILLS</div>';
  var skMap = [
    ['Brawl','brawl'],['Throw','throw'],['Evasion','evasion'],['Weapons','weapons'],
    ['Alert','alert'],['Athletic','athletic'],['Nature','nature'],['Stealth','stealth'],
    ['Allure','allure'],['Etiquette','etiquette'],['Intimidate','intimidate'],['Perform','perform'],
    ['Crafts','crafts'],['Lore','lore'],['Medicine','medicine'],['Science','science']
  ];
  var skGrid = document.createElement('div');
  skGrid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:10px;';
  var skL = document.createElement('div'); var skR = document.createElement('div');
  skMap.forEach((sk, i) => {
    (i<8 ? skL : skR).appendChild(createDots(sk[0], scheda.skills, sk[1], 6));
  });
  skGrid.appendChild(skL); skGrid.appendChild(skR);
  skillBox.appendChild(skGrid);
  statsCol.appendChild(skillBox);
  
  var socBox = document.createElement('div');
  socBox.innerHTML = '<div style="font-weight:bold; margin-bottom:5px; margin-top:15px; border-bottom:1px solid #999;">SOCIAL ATTRIBUTES</div>';
  var socGrid = document.createElement('div');
  socGrid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:10px;';
  var socL = document.createElement('div'); var socR = document.createElement('div');
  ['Tough','Cool','Beauty','Clever','Cute'].forEach((sk, i) => {
    (i<3 ? socL : socR).appendChild(createDots(sk, scheda.social, sk.toLowerCase(), 6));
  });
  socGrid.appendChild(socL); socGrid.appendChild(socR);
  socBox.appendChild(socGrid);
  statsCol.appendChild(socBox);
  
  bodyGrid.appendChild(statsCol);
  
  // --- RIGHT COL: Dex, Inv, Badges ---
  var extraCol = document.createElement('div');
  
  var dexBox = document.createElement('div');
  dexBox.style.cssText = 'display:flex; gap:20px; background:#d0e6ef; padding:10px; border-radius:6px; margin-bottom:15px;';
  dexBox.innerHTML = '<div style="font-weight:bold; width:100px;">POKÉDEX</div>';
  dexBox.appendChild(createInput('Visti', scheda.pokedex, 'seen', 'text', '60px'));
  dexBox.appendChild(createInput('Catturati', scheda.pokedex, 'caught', 'text', '60px'));
  extraCol.appendChild(dexBox);
  
  var invBox = document.createElement('div');
  invBox.innerHTML = '<div style="font-weight:bold; margin-bottom:5px; border-bottom:1px solid #999;">ZAINO</div>';
  var potBox = document.createElement('div');
  potBox.style.cssText = 'display:flex; justify-content:space-between; margin-bottom:10px;';
  potBox.appendChild(createInput('Pozioni', scheda.inventory, 'potion', 'number', '50px'));
  potBox.appendChild(createInput('Super Poz.', scheda.inventory, 'superPotion', 'number', '50px'));
  potBox.appendChild(createInput('Hyper Poz.', scheda.inventory, 'hyperPotion', 'number', '50px'));
  invBox.appendChild(potBox);
  
  var pockBox = document.createElement('div');
  pockBox.style.cssText = 'display:flex; gap:10px;';
  var sp = createInput('Small Pocket', scheda.inventory, 'smallPocket', 'textarea'); sp.style.flex = '1'; sp.querySelector('textarea').style.height='60px'; sp.querySelector('textarea').style.resize='none';
  var mp = createInput('Main Pocket', scheda.inventory, 'mainPocket', 'textarea'); mp.style.flex = '1'; mp.querySelector('textarea').style.height='60px'; mp.querySelector('textarea').style.resize='none';
  pockBox.appendChild(sp); pockBox.appendChild(mp);
  invBox.appendChild(pockBox);
  extraCol.appendChild(invBox);
  
  var badgeBox = document.createElement('div');
  badgeBox.innerHTML = '<div style="font-weight:bold; margin-bottom:5px; margin-top:15px; border-bottom:1px solid #999;">MEDAGLIERE</div>';
  var bGrid = document.createElement('div');
  bGrid.style.cssText = 'display:grid; grid-template-columns:repeat(4, 1fr); gap:10px;';
  for(let i=0; i<8; i++) {
    let b = document.createElement('div');
    b.style.cssText = 'aspect-ratio:1; border:2px dashed #999; border-radius:50%; background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative;';
    let bIm = document.createElement('img');
    bIm.style.cssText = 'width:100%; height:100%; object-fit:contain; display:' + (scheda.badges[i] ? 'block' : 'none') + ';';
    bIm.src = scheda.badges[i] || '';
    let bTxt = document.createElement('span');
    bTxt.textContent = '+';
    bTxt.style.cssText = 'color:#ccc; font-size:24px; display:' + (scheda.badges[i] ? 'none' : 'block') + ';';
    b.appendChild(bIm); b.appendChild(bTxt);
    b.onclick = function() {
      var url = prompt('URL Immagine Medaglia:', scheda.badges[i]);
      if (url !== null) {
        scheda.badges[i] = url;
        bIm.src = url;
        if (url) { bIm.style.display='block'; bTxt.style.display='none'; } else { bIm.style.display='none'; bTxt.style.display='block'; }
        save();
      }
    };
    bGrid.appendChild(b);
  }
  badgeBox.appendChild(bGrid);
  extraCol.appendChild(badgeBox);
  
  bodyGrid.appendChild(extraCol);
  tCard.appendChild(bodyGrid);
  trainerWrap.appendChild(tCard);
  wrap.appendChild(trainerWrap);

  // --- PARTY SIDEBAR ---
  function renderSidebar() {
    partyWrap.innerHTML = '';
    var addBtn = document.createElement('div');
    addBtn.style.cssText = 'width:60px; height:60px; border-radius:50%; background:#333; color:#aaa; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:30px; margin-bottom:15px; border:2px dashed #666; transition:background 0.2s;';
    addBtn.innerHTML = '+';
    addBtn.title = 'Aggiungi Pokémon';
    addBtn.onclick = function() {
      if (scheda.party.length >= 6) { alert('Hai già 6 Pokémon!'); return; }
      scheda.party.push(window._pokemonMonDefault());
      save();
      renderSidebar();
    };
    if (scheda.party.length < 6) partyWrap.appendChild(addBtn);

    scheda.party.forEach((mon, i) => {
      var mBtn = document.createElement('div');
      mBtn.style.cssText = 'width:60px; height:60px; border-radius:50%; background:#222; border:2px solid #555; margin-bottom:15px; cursor:pointer; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0;';
      if (mon.avatar) {
        var im = document.createElement('img');
        im.src = mon.avatar;
        im.style.cssText = 'width:100%; height:100%; object-fit:cover;';
        mBtn.appendChild(im);
      } else {
        mBtn.innerHTML = '<span style="font-size:10px; color:#777;">' + (mon.nome || 'Pkm') + '</span>';
      }
      mBtn.onclick = function() { openMon(mon, i); };
      partyWrap.appendChild(mBtn);
    });
  }
  
  renderSidebar();
  wrap.appendChild(partyWrap);

  // --- POKEMON OVERLAY ---
  function openMon(mon, idx) {
    mon.mosse = mon.mosse || [];
    mon.attrs = mon.attrs || {};
    mon.social = mon.social || {};

    monOverlay.innerHTML = '';
    
    var topBar = document.createElement('div');
    topBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;';
    var delBtn = document.createElement('button');
    delBtn.textContent = '🗑 Elimina Pokémon';
    delBtn.style.cssText = 'background:#822; color:#fff; border:none; padding:8px 12px; border-radius:4px; cursor:pointer; font-weight:bold;';
    delBtn.onclick = function() {
      if (confirm('Eliminare ' + (mon.nome||'questo Pokémon') + '?')) {
        scheda.party.splice(idx, 1);
        save();
        monOverlay.style.display = 'none';
        renderSidebar();
      }
    };
    var clsBtn = document.createElement('button');
    clsBtn.textContent = '❌ Chiudi';
    clsBtn.style.cssText = 'background:#333; color:#fff; border:none; padding:8px 12px; border-radius:4px; cursor:pointer; font-weight:bold;';
    clsBtn.onclick = function() { monOverlay.style.display = 'none'; renderSidebar(); };
    topBar.appendChild(delBtn); topBar.appendChild(clsBtn);
    monOverlay.appendChild(topBar);
    
    // The Sheet
    var sheet = document.createElement('div');
    sheet.style.cssText = 'max-width:900px; margin:0 auto; background:#f4f4f4; border-radius:12px; padding:20px; color:#111; box-shadow:0 8px 16px rgba(0,0,0,0.8); border:4px solid #e05555; position:relative; flex:1; overflow-y:auto;';
    
    var header = document.createElement('div');
    header.style.cssText = 'display:flex; border-bottom:3px solid #333; padding-bottom:10px; margin-bottom:15px;';
    
    var avBox = document.createElement('div');
    avBox.style.cssText = 'width:120px; height:120px; border:3px solid #333; border-radius:50%; background:#fff; margin-right:20px; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden;';
    var avImg = document.createElement('img');
    avImg.style.cssText = 'width:100%; height:100%; object-fit:cover; display:' + (mon.avatar ? 'block' : 'none') + ';';
    avImg.src = mon.avatar || '';
    var avTxt = document.createElement('span');
    avTxt.textContent = 'Avatar';
    avTxt.style.display = mon.avatar ? 'none' : 'block';
    avBox.appendChild(avImg); avBox.appendChild(avTxt);
    avBox.onclick = function() {
      var url = prompt('URL Immagine Pokémon:', mon.avatar);
      if (url !== null) {
        mon.avatar = url; avImg.src = url;
        if (url) { avImg.style.display='block'; avTxt.style.display='none'; } else { avImg.style.display='none'; avTxt.style.display='block'; }
        save();
      }
    };
    header.appendChild(avBox);
    
    var hi = document.createElement('div');
    hi.style.cssText = 'flex:1; display:grid; grid-template-columns:1fr 1fr; gap:10px;';
    hi.appendChild(createInput('Nome/Soprannome', mon, 'nome'));
    hi.appendChild(createInput('# Pokédex', mon, 'numero'));
    hi.appendChild(createInput('Abilità', mon, 'abilita'));
    hi.appendChild(createInput('Tipo', mon, 'tipo'));
    header.appendChild(hi);
    sheet.appendChild(header);
    
    // Combat Stats
    var combatGrid = document.createElement('div');
    combatGrid.style.cssText = 'display:grid; grid-template-columns:repeat(6, 1fr); gap:10px; background:#e05555; padding:10px; border-radius:6px; margin-bottom:15px; color:#fff;';
    
    function createWhiteInput(label, obj, key) {
      var d = document.createElement('div');
      d.style.cssText = 'display:flex; flex-direction:column; align-items:center; background:#fff; color:#111; padding:5px; border-radius:4px; border:2px solid #333;';
      var l = document.createElement('span');
      l.textContent = label;
      l.style.cssText = 'font-size:10px; font-weight:bold; margin-bottom:2px;';
      var i = document.createElement('input');
      i.type = 'text'; i.value = obj[key] || '';
      i.style.cssText = 'border:none; border-bottom:1px solid #aaa; background:transparent; width:100%; text-align:center; font-weight:bold; outline:none;';
      i.oninput = function() { obj[key] = i.value; save(); };
      d.appendChild(l); d.appendChild(i);
      return d;
    }
    
    ['HP','WILL','Held Item','Status','Initiative','Accuracy','Damage','Evasion','Clash','DEF','S.DEF','Rank'].forEach(lbl => {
      var k = lbl.toLowerCase().replace(/[^a-z]/g,'');
      if(k==='helditem') k='held';
      if(k==='sdef') k='sdef';
      if(k==='initiative') k='init';
      if(k==='accuracy') k='acc';
      if(k==='damage') k='dmg';
      if(k==='evasion') k='eva';
      combatGrid.appendChild(createWhiteInput(lbl, mon, k));
    });
    sheet.appendChild(combatGrid);
    
    var bGrid = document.createElement('div');
    bGrid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:20px;';
    
    var lCol = document.createElement('div');
    var attrBox = document.createElement('div');
    attrBox.innerHTML = '<div style="font-weight:bold; border-bottom:2px solid #555; margin-bottom:8px;">ATTRIBUTI</div>';
    attrBox.appendChild(createDots('Strength', mon.attrs, 'str', 6));
    attrBox.appendChild(createDots('Dexterity', mon.attrs, 'dex', 6));
    attrBox.appendChild(createDots('Vitality', mon.attrs, 'vit', 6));
    attrBox.appendChild(createDots('Special', mon.attrs, 'spc', 6));
    attrBox.appendChild(createDots('Insight', mon.attrs, 'ins', 6));
    lCol.appendChild(attrBox);
    
    var mBox = document.createElement('div');
    mBox.style.cssText = 'margin-top:15px;';
    mBox.innerHTML = '<div style="font-weight:bold; border-bottom:2px solid #555; margin-bottom:8px;">MOSSE (MAX 6)</div>';
    for(let i=0; i<6; i++) {
      if(!mon.mosse[i]) mon.mosse[i] = {nome:'', tipo:'', freq:'', note:''};
      let m = mon.mosse[i];
      let r = document.createElement('div');
      r.style.cssText = 'border:1px solid #aaa; padding:5px; border-radius:4px; margin-bottom:5px; background:#fafafa;';
      let r1 = document.createElement('div');
      r1.style.cssText = 'display:flex; gap:5px; margin-bottom:3px;';
      r1.appendChild(createInput('Mossa', m, 'nome'));
      r1.appendChild(createInput('Tipo', m, 'tipo', 'text', '60px'));
      r1.appendChild(createInput('Freq/Pow', m, 'freq', 'text', '60px'));
      r.appendChild(r1);
      r.appendChild(createInput('Note', m, 'note', 'text', '100%'));
      mBox.appendChild(r);
    }
    lCol.appendChild(mBox);
    
    var rCol = document.createElement('div');
    var socBox = document.createElement('div');
    socBox.innerHTML = '<div style="font-weight:bold; border-bottom:2px solid #555; margin-bottom:8px;">SOCIAL ATTRIBUTES</div>';
    socBox.appendChild(createDots('Tough', mon.social, 'tough', 6));
    socBox.appendChild(createDots('Cool', mon.social, 'cool', 6));
    socBox.appendChild(createDots('Beauty', mon.social, 'beauty', 6));
    socBox.appendChild(createDots('Cute', mon.social, 'cute', 6));
    socBox.appendChild(createDots('Clever', mon.social, 'clever', 6));
    rCol.appendChild(socBox);
    
    var exBox = document.createElement('div');
    exBox.style.cssText = 'margin-top:15px; display:flex; flex-direction:column; gap:5px;';
    exBox.innerHTML = '<div style="font-weight:bold; border-bottom:2px solid #555; margin-bottom:8px;">INFO</div>';
    exBox.appendChild(createInput('Natura', mon, 'natura'));
    exBox.appendChild(createInput('Confidence', mon, 'conf'));
    exBox.appendChild(createInput('Felicità (HAP)', mon, 'hap'));
    exBox.appendChild(createInput('Lealtà (LOY)', mon, 'loy'));
    
    var sizeBox = document.createElement('div');
    sizeBox.style.cssText = 'display:flex; gap:10px; margin-top:5px;';
    sizeBox.appendChild(createInput('Size', mon, 'size'));
    sizeBox.appendChild(createInput('Weight', mon, 'weight'));
    exBox.appendChild(sizeBox);
    
    var batBox = document.createElement('div');
    batBox.style.cssText = 'display:flex; gap:10px; margin-top:5px;';
    batBox.appendChild(createInput('Battles', mon, 'battles'));
    batBox.appendChild(createInput('Victories', mon, 'victories'));
    exBox.appendChild(batBox);
    
    exBox.appendChild(createInput('Weakness', mon, 'weakness'));
    exBox.appendChild(createInput('Accessori/Fiocchi', mon, 'accessories', 'textarea'));
    
    rCol.appendChild(exBox);
    
    bGrid.appendChild(lCol);
    bGrid.appendChild(rCol);
    sheet.appendChild(bGrid);
    
    monOverlay.appendChild(sheet);
    monOverlay.style.display = 'flex';
  }

  wrap.appendChild(monOverlay);
  return wrap;
};
