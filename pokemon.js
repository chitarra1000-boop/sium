
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
    party: []
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

window.renderPokemonSheet = function(scheda) {
  scheda.party = scheda.party || [];
  scheda.attrs = scheda.attrs || {};
  scheda.skills = scheda.skills || {};
  scheda.social = scheda.social || {};
  scheda.inventory = scheda.inventory || {};
  scheda.badges = scheda.badges || ['', '', '', '', '', '', '', ''];
  scheda.pokedex = scheda.pokedex || {};

  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex; width:100%; height:100%; overflow:hidden; background:#5a5a5a; font-family:"EB Garamond", serif; color:#e0e0e0; position:relative;';

  var trainerWrap = document.createElement('div');
  trainerWrap.style.cssText = 'flex:1; overflow-y:auto; padding:30px;';
  
  var partyWrap = document.createElement('div');
  partyWrap.style.cssText = 'width:90px; background:#111; border-left:1px solid #3a3a4a; display:flex; flex-direction:column; align-items:center; padding-top:20px; overflow-y:auto; z-index:50; box-shadow:-4px 0 16px rgba(0,0,0,0.5);';
  
  var monOverlay = document.createElement('div');
  monOverlay.style.cssText = 'position:absolute; inset:0; background:rgba(5,5,10,0.92); z-index:100; display:none; flex-direction:column; padding:30px; overflow-y:auto; backdrop-filter:blur(4px);';

  function save() {
    if (window.fbSaveScheda) window.fbSaveScheda();
  }

  function createHeader(text) {
    var d = document.createElement('div');
    d.style.cssText = 'font-family:"Cinzel", serif; font-size:14px; font-weight:700; color:#c9a55c; letter-spacing:0.1em; border-bottom:1px solid #c9a55c; margin-bottom:12px; padding-bottom:4px; text-transform:uppercase;';
    d.textContent = text;
    return d;
  }

  function createInput(label, obj, key, type, width) {
    var d = document.createElement('div');
    d.style.cssText = 'display:flex; flex-direction:column;';
    var l = document.createElement('label');
    l.textContent = label;
    l.style.cssText = 'font-family:"Cinzel", serif; font-size:11px; font-weight:700; color:#f0d070; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:4px;';
    var i = document.createElement(type === 'textarea' ? 'textarea' : 'input');
    if (type !== 'textarea') i.type = type || 'text';
    i.value = obj[key] || '';
    i.style.cssText = 'background:rgba(255,255,255,0.06); border:1px solid #8b6f3f; border-radius:3px; color:#f0e4cc; font-family:"EB Garamond", serif; font-size:15px; padding:4px 8px; outline:none; transition:border-color 0.2s;';
    i.onfocus = function() { i.style.borderColor = '#c9a55c'; };
    i.onblur = function() { i.style.borderColor = '#8b6f3f'; };
    if (width) i.style.width = width;
    i.oninput = function() { obj[key] = i.value; save(); };
    d.appendChild(l); d.appendChild(i);
    return d;
  }

  function createDots(label, obj, key, max) {
    var w = document.createElement('div');
    w.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;';
    var l = document.createElement('span');
    l.textContent = label;
    l.style.cssText = 'font-size:14px; font-weight:600; width:100px; color:#e0e0e0;';
    var d = document.createElement('div');
    d.style.cssText = 'display:flex; gap:4px;';
    
    var dots = [];
    for(let i=1; i<=max; i++) {
      let dot = document.createElement('div');
      dot.style.cssText = 'width:12px; height:12px; border-radius:50%; border:1px solid #c9a55c; cursor:pointer; transition:background 0.2s; box-shadow:0 0 4px rgba(201,165,92,0.2);';
      dot.style.background = obj[key]>=i ? '#c9a55c' : 'rgba(0,0,0,0.5)';
      dot.onclick = function() {
        if (obj[key] === i) obj[key] = i-1;
        else obj[key] = i;
        dots.forEach((dd, idx) => { dd.style.background = (obj[key]>idx ? '#c9a55c' : 'rgba(0,0,0,0.5)'); });
        save();
      };
      dots.push(dot);
      d.appendChild(dot);
    }
    w.appendChild(l); w.appendChild(d);
    return w;
  }

  // --- TRAINER CARD BUILDER ---
  var tCard = document.createElement('div');
  tCard.style.cssText = 'max-width:960px; margin:0 auto; background:#1a1a1a; border-radius:8px; padding:30px; box-shadow:0 12px 32px rgba(0,0,0,0.6); border:2px solid #c9a55c; position:relative;';
  
  var header = document.createElement('div');
  header.style.cssText = 'display:flex; border-bottom:2px solid #8b6f3f; padding-bottom:20px; margin-bottom:20px;';
  
  var avBox = document.createElement('div');
  avBox.style.cssText = 'width:160px; height:160px; border:2px solid #c9a55c; background:#111; margin-right:25px; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden; border-radius:6px; box-shadow:0 4px 12px rgba(0,0,0,0.5); position:relative;';
  var avImg = document.createElement('img');
  avImg.style.cssText = 'width:100%; height:100%; object-fit:cover; display:' + (scheda.avatar ? 'block' : 'none') + ';';
  avImg.src = scheda.avatar || '';
  var avTxt = document.createElement('span');
  avTxt.textContent = 'Avatar';
  avTxt.style.cssText = 'font-family:"Cinzel", serif; color:#c9a55c; font-size:14px;';
  avTxt.style.display = scheda.avatar ? 'none' : 'block';
  avBox.appendChild(avImg); avBox.appendChild(avTxt);
  avBox.onclick = function() {
    var url = prompt('URL Immagine Allenatore:', scheda.avatar);
    if (url !== null) {
      scheda.avatar = url; avImg.src = url;
      if (url) { avImg.style.display='block'; avTxt.style.display='none'; } else { avImg.style.display='none'; avTxt.style.display='block'; }
      save();
    }
  };
  header.appendChild(avBox);
  
  var infoGrid = document.createElement('div');
  infoGrid.style.cssText = 'flex:1; display:grid; grid-template-columns:1fr 1fr; gap:20px;';
  
  var leftInfo = document.createElement('div');
  leftInfo.style.cssText = 'display:flex; flex-direction:column; gap:10px;';
  leftInfo.appendChild(createInput('Nome', scheda, 'nome'));
  leftInfo.appendChild(createInput('Eta', scheda, 'eta'));
  leftInfo.appendChild(createInput('Giocatore', scheda, 'giocatore'));
  leftInfo.appendChild(createInput('Concept', scheda, 'concept'));
  
  var rightInfo = document.createElement('div');
  rightInfo.style.cssText = 'display:flex; flex-direction:column; gap:10px;';
  rightInfo.appendChild(createInput("Trainer\'s Card Rank", scheda, 'rank'));
  rightInfo.appendChild(createInput('Natura', scheda, 'natura'));
  rightInfo.appendChild(createInput('Confidence', scheda, 'confidence'));
  
  var statsInfo = document.createElement('div');
  statsInfo.style.cssText = 'display:flex; gap:15px; margin-top:10px;';
  statsInfo.appendChild(createInput('Soldi ($)', scheda, 'soldi', 'text', '80px'));
  statsInfo.appendChild(createInput('HP', scheda, 'hp', 'text', '60px'));
  statsInfo.appendChild(createInput('WILL', scheda, 'will', 'text', '60px'));
  rightInfo.appendChild(statsInfo);
  
  infoGrid.appendChild(leftInfo); infoGrid.appendChild(rightInfo);
  header.appendChild(infoGrid);
  tCard.appendChild(header);

  var bodyGrid = document.createElement('div');
  bodyGrid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:40px;';
  
  var statsCol = document.createElement('div');
  var attrBox = document.createElement('div');
  attrBox.appendChild(createHeader('Attributi Base'));
  attrBox.appendChild(createDots('Strength', scheda.attrs, 'str', 6));
  attrBox.appendChild(createDots('Dexterity', scheda.attrs, 'dex', 6));
  attrBox.appendChild(createDots('Vitality', scheda.attrs, 'vit', 6));
  attrBox.appendChild(createDots('Insight', scheda.attrs, 'ins', 6));
  statsCol.appendChild(attrBox);
  
  var skillBox = document.createElement('div');
  skillBox.style.marginTop = '25px';
  skillBox.appendChild(createHeader('Skills'));
  var skMap = [['Brawl','brawl'],['Throw','throw'],['Evasion','evasion'],['Weapons','weapons'],['Alert','alert'],['Athletic','athletic'],['Nature','nature'],['Stealth','stealth'],['Allure','allure'],['Etiquette','etiquette'],['Intimidate','intimidate'],['Perform','perform'],['Crafts','crafts'],['Lore','lore'],['Medicine','medicine'],['Science','science']];
  var skGrid = document.createElement('div');
  skGrid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:15px;';
  var skL = document.createElement('div'); var skR = document.createElement('div');
  skMap.forEach((sk, i) => { (i<8 ? skL : skR).appendChild(createDots(sk[0], scheda.skills, sk[1], 6)); });
  skGrid.appendChild(skL); skGrid.appendChild(skR);
  skillBox.appendChild(skGrid);
  statsCol.appendChild(skillBox);
  
  var socBox = document.createElement('div');
  socBox.style.marginTop = '25px';
  socBox.appendChild(createHeader('Social Attributes'));
  var socGrid = document.createElement('div');
  socGrid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:15px;';
  var socL = document.createElement('div'); var socR = document.createElement('div');
  ['Tough','Cool','Beauty','Clever','Cute'].forEach((sk, i) => { (i<3 ? socL : socR).appendChild(createDots(sk, scheda.social, sk.toLowerCase(), 6)); });
  socGrid.appendChild(socL); socGrid.appendChild(socR);
  socBox.appendChild(socGrid);
  statsCol.appendChild(socBox);
  
  bodyGrid.appendChild(statsCol);
  
  var extraCol = document.createElement('div');
  var dexBox = document.createElement('div');
  dexBox.style.cssText = 'display:flex; gap:25px; background:rgba(0,0,0,0.3); padding:15px; border-radius:6px; margin-bottom:25px; border:1px solid #8b6f3f;';
  var pTitle = document.createElement('div');
  pTitle.style.cssText = 'font-family:"Cinzel", serif; color:#c9a55c; font-weight:700; width:100px; align-self:center; letter-spacing:0.1em;';
  pTitle.textContent = 'POKEDEX';
  dexBox.appendChild(pTitle);
  dexBox.appendChild(createInput('Visti', scheda.pokedex, 'seen', 'text', '60px'));
  dexBox.appendChild(createInput('Catturati', scheda.pokedex, 'caught', 'text', '60px'));
  extraCol.appendChild(dexBox);
  
  var invBox = document.createElement('div');
  invBox.appendChild(createHeader('Zaino'));
  var potBox = document.createElement('div');
  potBox.style.cssText = 'display:flex; justify-content:space-between; margin-bottom:15px;';
  potBox.appendChild(createInput('Pozioni', scheda.inventory, 'potion', 'number', '50px'));
  potBox.appendChild(createInput('Super Poz.', scheda.inventory, 'superPotion', 'number', '50px'));
  potBox.appendChild(createInput('Hyper Poz.', scheda.inventory, 'hyperPotion', 'number', '50px'));
  invBox.appendChild(potBox);
  
  var pockBox = document.createElement('div');
  pockBox.style.cssText = 'display:flex; gap:15px;';
  var sp = createInput('Small Pocket', scheda.inventory, 'smallPocket', 'textarea'); sp.style.flex = '1'; sp.querySelector('textarea').style.height='80px'; sp.querySelector('textarea').style.resize='none';
  var mp = createInput('Main Pocket', scheda.inventory, 'mainPocket', 'textarea'); mp.style.flex = '1'; mp.querySelector('textarea').style.height='80px'; mp.querySelector('textarea').style.resize='none';
  pockBox.appendChild(sp); pockBox.appendChild(mp);
  invBox.appendChild(pockBox);
  extraCol.appendChild(invBox);
  
  var badgeBox = document.createElement('div');
  badgeBox.style.marginTop = '25px';
  badgeBox.appendChild(createHeader('Medagliere'));
  var bGrid = document.createElement('div');
  bGrid.style.cssText = 'display:grid; grid-template-columns:repeat(4, 1fr); gap:15px; padding:10px; background:rgba(0,0,0,0.2); border-radius:6px; border:1px solid #8b6f3f;';
  for(let i=0; i<8; i++) {
    let b = document.createElement('div');
    b.style.cssText = 'aspect-ratio:1; border:2px dashed #c9a55c; border-radius:50%; background:#111; cursor:pointer; display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative; transition:border-color 0.2s, box-shadow 0.2s;';
    b.onmouseenter = function() { b.style.borderColor = '#c9a55c'; b.style.boxShadow = '0 0 10px rgba(201,165,92,0.3)'; };
    b.onmouseleave = function() { b.style.borderColor = '#c9a55c'; b.style.boxShadow = 'none'; };
    let bIm = document.createElement('img');
    bIm.style.cssText = 'width:80%; height:80%; object-fit:contain; display:' + (scheda.badges[i] ? 'block' : 'none') + ';';
    bIm.src = scheda.badges[i] || '';
    let bTxt = document.createElement('span');
    bTxt.textContent = '+';
    bTxt.style.cssText = 'color:#c9a55c; font-size:24px; display:' + (scheda.badges[i] ? 'none' : 'block') + '; font-weight:100;';
    b.appendChild(bIm); b.appendChild(bTxt);
    b.onclick = function() {
      var url = prompt('URL Immagine Medaglia:', scheda.badges[i]);
      if (url !== null) {
        scheda.badges[i] = url; bIm.src = url;
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
    addBtn.style.cssText = 'width:60px; height:60px; border-radius:50%; background:#1a1a1a; color:#8b6f3f; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:30px; margin-bottom:20px; border:2px dashed #8b6f3f; transition:background 0.2s, color 0.2s, border-color 0.2s; font-family:"Cinzel", serif; font-weight:100;';
    addBtn.innerHTML = '+';
    addBtn.title = 'Aggiungi Pokemon';
    addBtn.onmouseenter = function() { addBtn.style.borderColor='#c9a55c'; addBtn.style.color='#c9a55c'; addBtn.style.background='rgba(201,165,92,0.1)'; };
    addBtn.onmouseleave = function() { addBtn.style.borderColor='#8b6f3f'; addBtn.style.color='#8b6f3f'; addBtn.style.background='#1a1f2a'; };
    addBtn.onclick = function() {
      if (scheda.party.length >= 6) { alert('Hai gia 6 Pokemon!'); return; }
      scheda.party.push(window._pokemonMonDefault());
      save(); renderSidebar();
    };
    if (scheda.party.length < 6) partyWrap.appendChild(addBtn);

    scheda.party.forEach((mon, i) => {
      var mBtn = document.createElement('div');
      mBtn.style.cssText = 'width:64px; height:64px; border-radius:50%; background:#111; border:2px solid #8b6f3f; margin-bottom:15px; cursor:pointer; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0; transition:border-color 0.2s, transform 0.2s, box-shadow 0.2s;';
      mBtn.onmouseenter = function() { mBtn.style.borderColor='#c9a55c'; mBtn.style.transform='scale(1.05)'; mBtn.style.boxShadow='0 0 12px rgba(201,165,92,0.5)'; };
      mBtn.onmouseleave = function() { mBtn.style.borderColor='#8b6f3f'; mBtn.style.transform='none'; mBtn.style.boxShadow='none'; };
      if (mon.avatar) {
        var im = document.createElement('img');
        im.src = mon.avatar;
        im.style.cssText = 'width:100%; height:100%; object-fit:cover;';
        mBtn.appendChild(im);
      } else {
        mBtn.innerHTML = '<span style="font-size:10px; color:#c9a55c; font-family:'Cinzel', serif; letter-spacing:0.05em; text-align:center;">' + (mon.nome || 'Pkm') + '</span>';
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
    topBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; max-width:960px; margin:0 auto 15px auto; width:100%;';
    
    var delBtn = document.createElement('button');
    delBtn.textContent = ' Elimina Pokemon';
    delBtn.style.cssText = 'background:rgba(180,40,40,0.2); color:#e06666; border:1px solid #b42828; padding:8px 16px; border-radius:4px; cursor:pointer; font-family:"Cinzel", serif; font-weight:700; font-size:12px; letter-spacing:0.05em; transition:background 0.2s;';
    delBtn.onmouseenter = function(){ delBtn.style.background='rgba(180,40,40,0.4)'; };
    delBtn.onmouseleave = function(){ delBtn.style.background='rgba(180,40,40,0.2)'; };
    delBtn.onclick = function() {
      if (confirm('Eliminare ' + (mon.nome||'questo Pokemon') + '?')) {
        scheda.party.splice(idx, 1);
        save(); monOverlay.style.display = 'none'; renderSidebar();
      }
    };
    
    var clsBtn = document.createElement('button');
    clsBtn.textContent = '❌ Chiudi';
    clsBtn.style.cssText = 'background:rgba(201,165,92,0.1); color:#c9a55c; border:1px solid #c9a55c; padding:8px 16px; border-radius:4px; cursor:pointer; font-family:"Cinzel", serif; font-weight:700; font-size:12px; letter-spacing:0.05em; transition:background 0.2s;';
    clsBtn.onmouseenter = function(){ clsBtn.style.background='rgba(201,165,92,0.25)'; };
    clsBtn.onmouseleave = function(){ clsBtn.style.background='rgba(201,165,92,0.1)'; };
    clsBtn.onclick = function() { monOverlay.style.display = 'none'; renderSidebar(); };
    
    topBar.appendChild(delBtn); topBar.appendChild(clsBtn);
    monOverlay.appendChild(topBar);
    
    var sheet = document.createElement('div');
    sheet.style.cssText = 'max-width:960px; margin:0 auto; background:#1a1a1a; border-radius:8px; padding:30px; color:#e0e0e0; box-shadow:0 12px 32px rgba(0,0,0,0.8); border:1px solid #6b3a3a; position:relative; flex:1; overflow-y:auto;';
    
    var headerP = document.createElement('div');
    headerP.style.cssText = 'display:flex; border-bottom:2px solid #5a2a2a; padding-bottom:20px; margin-bottom:20px;';
    
    var avBox = document.createElement('div');
    avBox.style.cssText = 'width:140px; height:140px; border:2px solid #e05555; border-radius:50%; background:#111; margin-right:30px; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden; box-shadow:0 4px 16px rgba(224,85,85,0.2); position:relative;';
    var avImg = document.createElement('img');
    avImg.style.cssText = 'width:100%; height:100%; object-fit:cover; display:' + (mon.avatar ? 'block' : 'none') + ';';
    avImg.src = mon.avatar || '';
    var avTxt = document.createElement('span');
    avTxt.textContent = 'Avatar';
    avTxt.style.cssText = 'font-family:"Cinzel", serif; color:#e05555; font-size:14px;';
    avTxt.style.display = mon.avatar ? 'none' : 'block';
    avBox.appendChild(avImg); avBox.appendChild(avTxt);
    avBox.onclick = function() {
      var url = prompt('URL Immagine Pokemon:', mon.avatar);
      if (url !== null) {
        mon.avatar = url; avImg.src = url;
        if (url) { avImg.style.display='block'; avTxt.style.display='none'; } else { avImg.style.display='none'; avTxt.style.display='block'; }
        save();
      }
    };
    headerP.appendChild(avBox);
    
    var hi = document.createElement('div');
    hi.style.cssText = 'flex:1; display:grid; grid-template-columns:1fr 1fr; gap:15px; align-content:center;';
    hi.appendChild(createInput('Nome/Soprannome', mon, 'nome'));
    hi.appendChild(createInput('# Pokedex', mon, 'numero'));
    hi.appendChild(createInput('Abilita', mon, 'abilita'));
    hi.appendChild(createInput('Tipo', mon, 'tipo'));
    headerP.appendChild(hi);
    sheet.appendChild(headerP);
    
    var combatGrid = document.createElement('div');
    combatGrid.style.cssText = 'display:grid; grid-template-columns:repeat(6, 1fr); gap:10px; background:rgba(224,85,85,0.05); padding:15px; border-radius:6px; margin-bottom:25px; border:1px solid rgba(224,85,85,0.3);';
    
    function createCombatInput(label, obj, key) {
      var d = document.createElement('div');
      d.style.cssText = 'display:flex; flex-direction:column; align-items:center; background:rgba(0,0,0,0.4); padding:8px 4px; border-radius:4px; border:1px solid #5a2a2a;';
      var l = document.createElement('span');
      l.textContent = label;
      l.style.cssText = 'font-family:"Cinzel", serif; font-size:10px; font-weight:700; color:#e06666; margin-bottom:4px; text-transform:uppercase;';
      var i = document.createElement('input');
      i.type = 'text'; i.value = obj[key] || '';
      i.style.cssText = 'border:none; border-bottom:1px solid #7a3a3a; background:transparent; width:100%; text-align:center; font-family:"EB Garamond", serif; font-size:16px; font-weight:bold; color:#f0e4cc; outline:none; transition:border-color 0.2s;';
      i.onfocus = function() { i.style.borderColor = '#e05555'; };
      i.onblur = function() { i.style.borderColor = '#7a3a3a'; };
      i.oninput = function() { obj[key] = i.value; save(); };
      d.appendChild(l); d.appendChild(i);
      return d;
    }
    
    ['HP','WILL','Held Item','Status','Initiative','Accuracy','Damage','Evasion','Clash','DEF','S.DEF','Rank'].forEach(lbl => {
      var k = lbl.toLowerCase().replace(/[^a-z]/g,'');
      if(k==='helditem') k='held'; if(k==='sdef') k='sdef'; if(k==='initiative') k='init';
      if(k==='accuracy') k='acc'; if(k==='damage') k='dmg'; if(k==='evasion') k='eva';
      combatGrid.appendChild(createCombatInput(lbl, mon, k));
    });
    sheet.appendChild(combatGrid);
    
    var bGrid = document.createElement('div');
    bGrid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:30px;';
    
    var lCol = document.createElement('div');
    var attrBox = document.createElement('div');
    attrBox.appendChild(createHeader('Attributi'));
    attrBox.appendChild(createDots('Strength', mon.attrs, 'str', 6));
    attrBox.appendChild(createDots('Dexterity', mon.attrs, 'dex', 6));
    attrBox.appendChild(createDots('Vitality', mon.attrs, 'vit', 6));
    attrBox.appendChild(createDots('Special', mon.attrs, 'spc', 6));
    attrBox.appendChild(createDots('Insight', mon.attrs, 'ins', 6));
    lCol.appendChild(attrBox);
    
    var mBox = document.createElement('div');
    mBox.style.marginTop = '25px';
    mBox.appendChild(createHeader('Mosse (Max 6)'));
    for(let i=0; i<6; i++) {
      if(!mon.mosse[i]) mon.mosse[i] = {nome:'', tipo:'', freq:'', note:''};
      let m = mon.mosse[i];
      let r = document.createElement('div');
      r.style.cssText = 'border:1px solid #8b6f3f; padding:10px; border-radius:4px; margin-bottom:8px; background:rgba(0,0,0,0.2);';
      let r1 = document.createElement('div');
      r1.style.cssText = 'display:flex; gap:10px; margin-bottom:8px;';
      r1.appendChild(createInput('Mossa', m, 'nome'));
      r1.appendChild(createInput('Tipo', m, 'tipo', 'text', '70px'));
      r1.appendChild(createInput('Freq/Pow', m, 'freq', 'text', '70px'));
      r.appendChild(r1);
      r.appendChild(createInput('Note', m, 'note', 'text', '100%'));
      mBox.appendChild(r);
    }
    lCol.appendChild(mBox);
    
    var rCol = document.createElement('div');
    var socBox = document.createElement('div');
    socBox.appendChild(createHeader('Social Attributes'));
    socBox.appendChild(createDots('Tough', mon.social, 'tough', 6));
    socBox.appendChild(createDots('Cool', mon.social, 'cool', 6));
    socBox.appendChild(createDots('Beauty', mon.social, 'beauty', 6));
    socBox.appendChild(createDots('Cute', mon.social, 'cute', 6));
    socBox.appendChild(createDots('Clever', mon.social, 'clever', 6));
    rCol.appendChild(socBox);
    
    var exBox = document.createElement('div');
    exBox.style.cssText = 'margin-top:25px; display:flex; flex-direction:column; gap:12px;';
    exBox.appendChild(createHeader('Info & Statistiche'));
    
    var row1 = document.createElement('div'); row1.style.cssText = 'display:flex; gap:15px;';
    row1.appendChild(createInput('Natura', mon, 'natura')); row1.appendChild(createInput('Confidence', mon, 'conf'));
    exBox.appendChild(row1);
    
    var row2 = document.createElement('div'); row2.style.cssText = 'display:flex; gap:15px;';
    row2.appendChild(createInput('Felicita (HAP)', mon, 'hap')); row2.appendChild(createInput('Lealta (LOY)', mon, 'loy'));
    exBox.appendChild(row2);
    
    var sizeBox = document.createElement('div'); sizeBox.style.cssText = 'display:flex; gap:15px;';
    sizeBox.appendChild(createInput('Size', mon, 'size')); sizeBox.appendChild(createInput('Weight', mon, 'weight'));
    exBox.appendChild(sizeBox);
    
    var batBox = document.createElement('div'); batBox.style.cssText = 'display:flex; gap:15px;';
    batBox.appendChild(createInput('Battles', mon, 'battles')); batBox.appendChild(createInput('Victories', mon, 'victories'));
    exBox.appendChild(batBox);
    
    exBox.appendChild(createInput('Weakness', mon, 'weakness'));
    exBox.appendChild(createInput('Accessori/Fiocchi', mon, 'accessories', 'textarea'));
    
    rCol.appendChild(exBox);
    
    bGrid.appendChild(lCol); bGrid.appendChild(rCol);
    sheet.appendChild(bGrid);
    
    monOverlay.appendChild(sheet);
    monOverlay.style.display = 'flex';
  }

  wrap.appendChild(monOverlay);
  return wrap;
};
