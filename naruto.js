// naruto.js - D&D Naruto 5e System

window._narutoDefault = function(id) {
  return {
    id: id || '', schedaTipo: 'naruto', nome: '', clan: '', giocatore: '', classeLivello: '', villaggio: '', exp: '', avatar: '',
    profBonus: '+2', passives: { perception: 10, insight: 10 },
    stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    saves: { str: false, dex: false, con: false, int: false, wis: false, cha: false },
    skills: {
      athletics: false, taijutsu: false, acrobatics: false, sleight: false, stealth: false, chakraControl: false,
      crafting: false, history: false, investigation: false, nature: false, ninjutsu: false,
      animal: false, insight: false, medicine: false, perception: false, survival: false, genjutsu: false,
      deception: false, intimidation: false, performance: false, persuasion: false
    },
    combat: { ac: 10, init: '+0', speed: 30, hpMax: 10, hpCurrent: 10, hpTemp: 0, hitDice: '', cpMax: 10, cpCurrent: 10, cpTemp: 0, chakraDice: '' },
    traits: { personality: '', ideals: '', bonds: '', flaws: '' },
    attacks: [{name:'', atk:'', dmg:''},{name:'', atk:'', dmg:''},{name:'', atk:'', dmg:''},{name:'', atk:'', dmg:''},{name:'', atk:'', dmg:''}],
    equipment: '', features: '',
    appearance: { age: '', height: '', weight: '', eyes: '', skin: '', hair: '', desc: '' },
    allies: '', natureAffinity: { fire: false, water: false, earth: false, lightning: false, wind: false },
    jutsuBonuses: { ninAtk: '', ninDc: '', taiAtk: '', taiDc: '', genAtk: '', genDc: '' },
    jutsu: { e: [], d: [], c: [], b: [], a: [], s: [] }
  };
};

window.renderNarutoSheet = function(scheda) {
  scheda.stats = scheda.stats || {}; scheda.saves = scheda.saves || {}; scheda.skills = scheda.skills || {};
  scheda.combat = scheda.combat || {}; scheda.traits = scheda.traits || {}; scheda.attacks = scheda.attacks || [];
  scheda.appearance = scheda.appearance || {}; scheda.natureAffinity = scheda.natureAffinity || {};
  scheda.jutsuBonuses = scheda.jutsuBonuses || {}; scheda.jutsu = scheda.jutsu || { e:[], d:[], c:[], b:[], a:[], s:[] };

  let saveTimer = null;
  function save() {
    if (!window._db || !window.state || !window.state.currentUser) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function() { if (window.fbSaveScheda) window.fbSaveScheda(); }, 600);
  }

  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex; flex-direction:column; width:100%; height:100vh; overflow:hidden; background:#Eaeaea; font-family: "Georgia", serif; position:relative;';

  var nav = document.createElement('div');
  nav.style.cssText = 'background:#1a1a1a; border-bottom:1px solid #333; padding:0.45rem 1rem; display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; position:sticky; top:0; z-index:200;';
  var bk = document.createElement('button');
  bk.innerHTML = '&#8592; Torna ai personaggi';
  bk.style.cssText = 'background:#444; border:1px solid #666; color:#ccc; border-radius:3px; padding:0.3rem 0.75rem; font-size:11px; cursor:pointer; font-family:"Cinzel", serif;';
  bk.onclick = function() {
    if(window.state && window.state.schedePGViewMode) { window.state.schedePGViewMode=false; window.state.schedePGOpenChar=null; window.state.schedaAttivaId=null; window.state.scheda={}; window.state.companions={}; }
    else { window.state.schedaAttivaId=null; window.state.scheda={}; }
    if (window.renderMain) window.renderMain();
  };
  nav.appendChild(bk);
  var sp = document.createElement('span'); sp.style.flex = '1'; nav.appendChild(sp);
  var btnDel = document.createElement('button');
  btnDel.textContent = 'Elimina Scheda';
  btnDel.style.cssText = 'background:#4a1010; border:1px solid #c04040; color:#f08080; border-radius:3px; padding:0.3rem 0.75rem; font-size:11px; cursor:pointer; font-family:"Cinzel", serif;';
  btnDel.onclick = function() {
    if (!confirm('Sei sicuro di voler ELIMINARE DEFINITIVAMENTE questa scheda?')) return;
    if (window.state && window.state.schedaAttivaId) {
      if(window.fbDeleteSchedaItem) { window.fbDeleteSchedaItem(window.state.schedaAttivaId); }
      else if(window._db) { window._db.ref('schedePG/' + window.state.currentUser.username + '/chars/' + window.state.schedaAttivaId).remove(); }
      let idx = window.state.schedeList.findIndex(s => s.id === window.state.schedaAttivaId);
      if(idx>=0) window.state.schedeList.splice(idx,1);
      window.state.schedaAttivaId = null; window.state.scheda = {};
      if (window.renderMain) window.renderMain();
    }
  };
  if (!window.state || !window.state.schedePGViewMode) nav.appendChild(btnDel);
  wrap.appendChild(nav);

  var content = document.createElement('div');
  content.style.cssText = 'flex:1; overflow-y:auto; padding:20px;';

  var sheet = document.createElement('div');
  sheet.style.cssText = 'max-width:960px; margin:0 auto; background:#FFF; border:2px solid #000; padding:30px; box-shadow:0 0 20px rgba(0,0,0,0.3); border-radius:10px; color:#000;';

  function makeInput(obj, key, placeholder, width, styleExtra, isTextArea) {
    let el = document.createElement(isTextArea ? 'textarea' : 'input');
    if (!isTextArea) el.type = 'text';
    el.value = obj[key] || '';
    if (placeholder) el.placeholder = placeholder;
    el.style.cssText = 'border:none; border-bottom:1px solid #000; background:transparent; outline:none; font-family:inherit; padding:2px 4px; color:#000; ' + (styleExtra||'');
    if (width) el.style.width = width;
    el.oninput = function() { obj[key] = el.value; save(); };
    return el;
  }
  function makeCheckbox(obj, key) {
    let chk = document.createElement('input'); chk.type = 'checkbox';
    chk.checked = !!obj[key];
    chk.style.cursor = 'pointer';
    chk.onchange = function() { obj[key] = chk.checked; save(); };
    return chk;
  }
  function makeStatBlock(title, obj, modKey, skillsArr) {
    let b = document.createElement('div');
    b.style.cssText = 'border:2px solid #000; border-radius:10px; padding:15px; margin-bottom:15px; position:relative; box-shadow:2px 2px 0 rgba(0,0,0,0.1);';
    let t = document.createElement('div'); t.textContent = title; t.style.cssText = 'position:absolute; top:-10px; left:50%; transform:translateX(-50%); background:#FFF; padding:0 5px; font-weight:bold; font-size:12px; letter-spacing:1px;';
    b.appendChild(t);
    let valInp = document.createElement('input'); valInp.type='text'; valInp.value = obj[modKey] || '10'; valInp.style.cssText = 'width:100%; text-align:center; font-size:24px; font-weight:bold; border:none; border-bottom:1px solid #CCC; outline:none; font-family:inherit; margin-bottom:5px; color:#000;';
    valInp.oninput = function() { obj[modKey] = valInp.value; save(); };
    b.appendChild(valInp);
    
    let modSpan = document.createElement('div'); modSpan.style.cssText = 'text-align:center; font-size:16px; font-weight:bold; margin-bottom:10px; border:2px solid #000; border-radius:50%; width:36px; height:36px; line-height:32px; margin-left:auto; margin-right:auto;';
    function updateMod() { let v = parseInt(valInp.value)||0; let m = Math.floor((v-10)/2); modSpan.textContent = (m>=0?'+':'')+m; }
    updateMod(); valInp.addEventListener('input', updateMod);
    b.appendChild(modSpan);

    let svDiv = document.createElement('div'); svDiv.style.cssText = 'display:flex; align-items:center; gap:5px; font-size:12px; margin-bottom:5px; padding-bottom:5px; border-bottom:1px solid #EEE; font-weight:bold; text-transform:uppercase;';
    svDiv.appendChild(makeCheckbox(scheda.saves, modKey));
    svDiv.appendChild(document.createTextNode('SAVING THROWS'));
    b.appendChild(svDiv);

    skillsArr.forEach(sk => {
      let r = document.createElement('div'); r.style.cssText = 'display:flex; align-items:center; gap:5px; font-size:12px;';
      r.appendChild(makeCheckbox(scheda.skills, sk[0]));
      r.appendChild(document.createTextNode(sk[1]));
      b.appendChild(r);
    });
    return b;
  }

  var header = document.createElement('div');
  header.style.cssText = 'display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;';
  
  var hLeft = document.createElement('div'); hLeft.style.cssText = 'display:flex; flex-direction:column; gap:10px; width:250px;';
  var pbRow = document.createElement('div'); pbRow.style.cssText = 'display:flex; align-items:center; border:2px solid #000; border-radius:15px; overflow:hidden; font-weight:bold; padding-right:10px;';
  pbRow.appendChild(makeInput(scheda, 'profBonus', '+2', '50px', 'text-align:center; font-size:20px; border:none; border-right:2px solid #000; padding:10px; margin-right:10px;')); pbRow.appendChild(document.createTextNode('Proficiency Bonus'));
  hLeft.appendChild(pbRow);
  
  var passRow = document.createElement('div'); passRow.style.cssText = 'display:flex; gap:10px;';
  function pBox(lbl, k) { var pb=document.createElement('div'); pb.style.cssText='border:2px solid #000; border-radius:10px; display:flex; align-items:center; font-weight:bold; font-size:11px; padding-right:5px;'; pb.appendChild(makeInput(scheda.passives, k, '10', '30px', 'border:none; border-right:2px solid #000; text-align:center; padding:5px; margin-right:5px; font-size:14px;')); pb.appendChild(document.createTextNode(lbl)); return pb; }
  passRow.appendChild(pBox('Passive Perception', 'perception'));
  passRow.appendChild(pBox('Passive Insight', 'insight'));
  hLeft.appendChild(passRow);
  header.appendChild(hLeft);

  var hRight = document.createElement('div'); hRight.style.cssText = 'flex:1; margin-left:30px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px; border:2px solid #000; border-radius:10px; padding:15px;';
  function labeledField(lbl, obj, k) { var d=document.createElement('div'); var i = makeInput(obj, k, '', '100%', 'font-size:16px; font-weight:bold; border-bottom:1px solid #000;'); var l = document.createElement('div'); l.textContent = lbl; l.style.cssText = 'font-size:10px; text-transform:uppercase; color:#666; margin-top:2px;'; d.appendChild(i); d.appendChild(l); return d; }
  hRight.appendChild(labeledField('CHARACTER NAME', scheda, 'nome'));
  hRight.appendChild(labeledField('CLAN', scheda, 'clan'));
  hRight.appendChild(labeledField('PLAYER NAME', scheda, 'giocatore'));
  hRight.appendChild(labeledField('CLASS & LEVEL', scheda, 'classeLivello'));
  var xpField = labeledField('EXPERIENCE POINTS', scheda, 'exp'); xpField.style.gridColumn = '2 / 4';
  hRight.appendChild(xpField);
  header.appendChild(hRight);
  sheet.appendChild(header);

  var grid = document.createElement('div'); grid.style.cssText = 'display:grid; grid-template-columns:250px 1fr 300px; gap:30px;';

  var leftCol = document.createElement('div');
  leftCol.appendChild(makeStatBlock('STRENGTH', scheda.stats, 'str', [['athletics','Athletics'],['taijutsu','Taijutsu']]));
  leftCol.appendChild(makeStatBlock('DEXTERITY', scheda.stats, 'dex', [['acrobatics','Acrobatics'],['sleight','Sleight of Hand'],['stealth','Stealth']]));
  leftCol.appendChild(makeStatBlock('CONSTITUTION', scheda.stats, 'con', [['chakraControl','Chakra Control']]));
  leftCol.appendChild(makeStatBlock('INTELLIGENCE', scheda.stats, 'int', [['crafting','Crafting'],['history','History'],['investigation','Investigation'],['nature','Nature'],['ninjutsu','Ninjutsu']]));
  leftCol.appendChild(makeStatBlock('WISDOM', scheda.stats, 'wis', [['animal','Animal Handling'],['insight','Insight'],['medicine','Medicine'],['perception','Perception'],['survival','Survival'],['genjutsu','Genjutsu']]));
  leftCol.appendChild(makeStatBlock('CHARISMA', scheda.stats, 'cha', [['deception','Deception'],['intimidation','Intimidation'],['performance','Performance'],['persuasion','Persuasion']]));
  grid.appendChild(leftCol);

  var midCol = document.createElement('div'); midCol.style.cssText = 'display:flex; flex-direction:column; gap:20px;';
  
  var cmbTop = document.createElement('div'); cmbTop.style.cssText = 'display:flex; justify-content:space-around; gap:10px;';
  function shieldBox(lbl, obj, k, bR) { var b=document.createElement('div'); b.style.cssText='border:2px solid #000; width:80px; height:90px; display:flex; flex-direction:column; align-items:center; justify-content:center; '+bR+'; box-shadow:2px 2px 0 rgba(0,0,0,0.1);'; var i=makeInput(obj,k,'','50px','text-align:center; font-size:24px; font-weight:bold; border:none;'); var l=document.createElement('div'); l.textContent=lbl; l.style.cssText='font-size:11px; font-weight:bold;'; b.appendChild(i); b.appendChild(l); return b; }
  cmbTop.appendChild(shieldBox('ARMOR CLASS', scheda.combat, 'ac', 'border-radius:10px 10px 50% 50%'));
  cmbTop.appendChild(shieldBox('INITIATIVE', scheda.combat, 'init', 'border-radius:10px'));
  cmbTop.appendChild(shieldBox('SPEED', scheda.combat, 'speed', 'border-radius:10px'));
  midCol.appendChild(cmbTop);

  var pools = document.createElement('div'); pools.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:15px;';
  function poolBox(lbl, curK, maxK, obj) { var b=document.createElement('div'); b.style.cssText='border:2px solid #000; border-radius:10px; padding:10px; text-align:center; box-shadow:2px 2px 0 rgba(0,0,0,0.1);'; var h=document.createElement('div'); h.style.cssText='font-size:12px; font-weight:bold; margin-bottom:5px; border-bottom:1px solid #000; padding-bottom:5px; display:flex; justify-content:space-between;'; h.innerHTML = '<span>Max</span><span>'+lbl+'</span>'; var maxI=makeInput(obj, maxK, '', '30px', 'border:none; text-align:left; font-size:14px; font-weight:normal;'); h.insertBefore(maxI, h.firstChild.nextSibling); var curI=makeInput(obj, curK, '0', '100%', 'text-align:center; font-size:32px; font-weight:bold; border:none;'); b.appendChild(h); b.appendChild(curI); return b; }
  pools.appendChild(poolBox('Hit Points', 'hpCurrent', 'hpMax', scheda.combat));
  pools.appendChild(poolBox('Chakra Points', 'cpCurrent', 'cpMax', scheda.combat));
  midCol.appendChild(pools);

  var diceRow = document.createElement('div'); diceRow.style.cssText = 'display:flex; gap:15px;';
  function dieBox(lbl, k) { var b=document.createElement('div'); b.style.cssText='border:2px solid #000; border-radius:10px; padding:10px; flex:1; display:flex; flex-direction:column; box-shadow:2px 2px 0 rgba(0,0,0,0.1);'; var hd=document.createElement('div'); hd.textContent='Total ________'; hd.style.cssText='font-size:10px; margin-bottom:5px; color:#666;'; var i=makeInput(scheda.combat, k, '', '100%', 'text-align:center; font-size:24px; border:none; flex:1;'); var l=document.createElement('div'); l.textContent=lbl; l.style.cssText='font-size:12px; margin-top:5px; font-weight:bold; text-align:center; border-top:1px solid #000; padding-top:5px;'; b.appendChild(hd); b.appendChild(i); b.appendChild(l); return b; }
  diceRow.appendChild(dieBox('Hit Die', 'hitDice')); diceRow.appendChild(dieBox('Chakra Die', 'chakraDice'));
  midCol.appendChild(diceRow);

  var atkBox = document.createElement('div'); atkBox.style.cssText = 'border:2px solid #000; border-radius:10px; padding:15px; flex:1; min-height:250px; display:flex; flex-direction:column; box-shadow:2px 2px 0 rgba(0,0,0,0.1);';
  var atkH = document.createElement('div'); atkH.style.cssText = 'display:grid; grid-template-columns:2fr 1fr 2fr; font-size:10px; font-weight:bold; color:#666; margin-bottom:5px;'; atkH.innerHTML = '<span>NAME</span><span>ATK BONUS</span><span>DAMAGE/TYPE</span>'; atkBox.appendChild(atkH);
  scheda.attacks.forEach(a => {
    var r = document.createElement('div'); r.style.cssText = 'display:grid; grid-template-columns:2fr 1fr 2fr; gap:5px; margin-bottom:5px; background:#F5F5F5; border-radius:4px; padding:4px;';
    r.appendChild(makeInput(a, 'name', '', '100%', 'background:transparent; border:none;'));
    r.appendChild(makeInput(a, 'atk', '', '100%', 'background:transparent; border:none; text-align:center;'));
    r.appendChild(makeInput(a, 'dmg', '', '100%', 'background:transparent; border:none;'));
    atkBox.appendChild(r);
  });
  var atkF = document.createElement('div'); atkF.textContent = 'ATTACKS & JUTSU'; atkF.style.cssText = 'font-weight:bold; text-align:center; margin-top:auto; font-size:14px;'; atkBox.appendChild(atkF);
  midCol.appendChild(atkBox);
  grid.appendChild(midCol);

  var actualRightCol = document.createElement('div'); actualRightCol.style.cssText = 'display:flex; flex-direction:column; gap:15px;';
  function textBoxArea(lbl, k, obj, h) { var b=document.createElement('div'); b.style.cssText='border:2px solid #000; border-radius:10px; padding:10px; display:flex; flex-direction:column; min-height:'+h+'px; box-shadow:2px 2px 0 rgba(0,0,0,0.1);'; var i=makeInput(obj, k, '', '100%', 'flex:1; resize:none; border:none; padding:0; font-size:12px;', true); var l=document.createElement('div'); l.textContent=lbl; l.style.cssText='font-size:10px; font-weight:bold; margin-top:5px; text-align:center; text-transform:uppercase;'; b.appendChild(i); b.appendChild(l); return b; }
  actualRightCol.appendChild(textBoxArea('PERSONALITY TRAITS', 'personality', scheda.traits, 90));
  actualRightCol.appendChild(textBoxArea('IDEALS', 'ideals', scheda.traits, 80));
  actualRightCol.appendChild(textBoxArea('BONDS', 'bonds', scheda.traits, 80));
  actualRightCol.appendChild(textBoxArea('FLAWS', 'flaws', scheda.traits, 80));
  var featBox2 = document.createElement('div'); featBox2.style.cssText = 'border:2px solid #000; border-radius:10px; padding:10px; display:flex; flex-direction:column; flex:1; min-height:200px; box-shadow:2px 2px 0 rgba(0,0,0,0.1);';
  featBox2.appendChild(makeInput(scheda, 'features', '', '100%', 'flex:1; resize:none; border:none; padding:0; font-size:12px;', true));
  var featLbl2 = document.createElement('div'); featLbl2.textContent='FEATURES & TRAITS & PROFICIENCIES'; featLbl2.style.cssText='font-size:10px; font-weight:bold; margin-top:5px; text-align:center;'; featBox2.appendChild(featLbl2);
  actualRightCol.appendChild(featBox2);
  grid.appendChild(actualRightCol);

  sheet.appendChild(grid);

  // SECOND PAGE - EQUIPMENT & MORE
  var page2 = document.createElement('div'); page2.style.cssText = 'margin-top:20px; border-top:4px double #000; padding-top:20px; display:grid; grid-template-columns:1fr 1fr; gap:30px;';
  var eqBox = document.createElement('div'); eqBox.style.cssText = 'border:2px solid #000; border-radius:10px; padding:10px; display:flex; flex-direction:column; min-height:400px; box-shadow:2px 2px 0 rgba(0,0,0,0.1);';
  var eqL = document.createElement('div'); eqL.textContent = 'EQUIPMENT'; eqL.style.cssText = 'font-weight:bold; margin-bottom:5px; text-align:center;'; eqBox.appendChild(eqL);
  eqBox.appendChild(makeInput(scheda, 'equipment', '', '100%', 'flex:1; resize:none; border:none;', true));
  page2.appendChild(eqBox);
  
  var appearBox = document.createElement('div'); appearBox.style.cssText = 'border:2px solid #000; border-radius:10px; padding:20px; display:flex; flex-direction:column; align-items:center; box-shadow:2px 2px 0 rgba(0,0,0,0.1);';
  var apL = document.createElement('div'); apL.textContent = 'CHARACTER APPEARANCE'; apL.style.cssText = 'font-weight:bold; margin-bottom:15px;'; appearBox.appendChild(apL);
  var avWrap = document.createElement('div'); avWrap.style.cssText = 'width:200px; height:200px; border:2px dashed #666; border-radius:10px; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden; margin-bottom:15px; background:#F0F0F0;';
  var avIm = document.createElement('img'); avIm.style.cssText = 'width:100%; height:100%; object-fit:cover; display:'+(scheda.avatar?'block':'none')+';'; avIm.src=scheda.avatar||'';
  var avT = document.createElement('span'); avT.textContent='PICTURE'; avT.style.display=scheda.avatar?'none':'block';
  avWrap.appendChild(avIm); avWrap.appendChild(avT);
  avWrap.onclick = function() { let u = prompt('Immagine URL:', scheda.avatar); if(u!==null) { scheda.avatar=u; avIm.src=u; if(u){avIm.style.display='block';avT.style.display='none';}else{avIm.style.display='none';avT.style.display='block';} save(); } };
  appearBox.appendChild(avWrap);
  appearBox.appendChild(makeInput(scheda.appearance, 'desc', 'Physical Description...', '100%', 'flex:1; resize:none; border:none; padding:10px; background:#FAFAFA; border-radius:5px;', true));
  page2.appendChild(appearBox);

  sheet.appendChild(page2);

  // THIRD PAGE - JUTSU LIST
  var page3 = document.createElement('div'); page3.style.cssText = 'margin-top:40px; border-top:4px double #000; padding-top:20px;';
  var jutHeader = document.createElement('div'); jutHeader.style.cssText = 'display:flex; align-items:center; border:2px solid #000; border-radius:30px; margin-bottom:20px; box-shadow:2px 2px 0 rgba(0,0,0,0.1); overflow:hidden; background:#EEE;';
  var jutT = document.createElement('div'); jutT.textContent = 'Jutsu List'; jutT.style.cssText = 'font-size:24px; font-weight:bold; padding:10px 30px; background:#FFF; border-right:2px solid #000;'; jutHeader.appendChild(jutT);
  var jutStats = document.createElement('div'); jutStats.style.cssText = 'display:flex; flex:1; justify-content:space-around; align-items:center; padding:5px 20px;';
  function jtBlock(lbl1, k1, lbl2, k2) { var d=document.createElement('div'); d.style.cssText='display:flex; flex-direction:column; gap:5px;'; var r1=document.createElement('div'); r1.style.cssText='display:flex; align-items:center; justify-content:space-between; gap:5px; font-size:11px; font-weight:bold;'; r1.appendChild(document.createTextNode(lbl1)); r1.appendChild(makeInput(scheda.jutsuBonuses, k1, '', '50px', 'background:#FFF; border-radius:10px; text-align:center; border:2px solid #000; padding:2px; font-size:14px;')); var r2=document.createElement('div'); r2.style.cssText='display:flex; align-items:center; justify-content:space-between; gap:5px; font-size:11px; font-weight:bold;'; r2.appendChild(document.createTextNode(lbl2)); r2.appendChild(makeInput(scheda.jutsuBonuses, k2, '', '50px', 'background:#FFF; border-radius:10px; text-align:center; border:2px solid #000; padding:2px; font-size:14px;')); d.appendChild(r1); d.appendChild(r2); return d; }
  jutStats.appendChild(jtBlock('Ninjutsu Attack Bonus', 'ninAtk', 'Ninjutsu Save DC', 'ninDc'));
  jutStats.appendChild(jtBlock('Taijutsu Attack Bonus', 'taiAtk', 'Taijutsu Save DC', 'taiDc'));
  jutStats.appendChild(jtBlock('Genjutsu Attack Bonus', 'genAtk', 'Genjutsu Save DC', 'genDc'));
  jutHeader.appendChild(jutStats);
  page3.appendChild(jutHeader);

  var jutRanks = document.createElement('div'); jutRanks.style.cssText = 'display:grid; grid-template-columns:1fr 1fr 1fr; gap:30px;';
  function renderJutsuRank(rankKey, rankLabel) {
    let b = document.createElement('div');
    b.style.cssText = 'border:2px solid #000; border-radius:10px; padding:15px; min-height:400px; display:flex; flex-direction:column; box-shadow:2px 2px 0 rgba(0,0,0,0.1); background:#FAFAFA;';
    let hl = document.createElement('div'); hl.style.cssText = 'text-align:center; font-weight:bold; border:2px solid #000; border-radius:5px; padding:5px; margin-bottom:15px; font-size:18px; display:flex; justify-content:space-between; align-items:center; background:#FFF;';
    let span = document.createElement('span'); span.textContent = rankLabel; span.style.flex='1'; hl.appendChild(span);
    let addBtn = document.createElement('button'); addBtn.textContent = '+'; addBtn.style.cssText = 'cursor:pointer; background:#EEE; border:1px solid #000; border-radius:3px; width:24px; height:24px; font-weight:bold; padding:0;';
    hl.appendChild(addBtn);
    b.appendChild(hl);
    
    let listCont = document.createElement('div'); listCont.style.cssText = 'display:flex; flex-direction:column; gap:5px; flex:1;';
    function drawList() {
      listCont.innerHTML = '';
      scheda.jutsu[rankKey].forEach((j, i) => {
        let r = document.createElement('div'); r.style.cssText = 'display:flex; gap:5px; align-items:center; border-bottom:1px solid #CCC; padding-bottom:3px;';
        let jI = makeInput(scheda.jutsu[rankKey], i, 'Jutsu name / note...', '100%', 'border:none; background:transparent;'); jI.style.flex='1'; r.appendChild(jI);
        let rem = document.createElement('button'); rem.innerHTML = '&times;'; rem.style.cssText='cursor:pointer; background:none; border:none; color:#C00; font-size:18px; font-weight:bold; padding:0 5px;';
        rem.onclick = function(){ scheda.jutsu[rankKey].splice(i,1); save(); drawList(); };
        r.appendChild(rem); listCont.appendChild(r);
      });
    }
    drawList();
    addBtn.onclick = function() { scheda.jutsu[rankKey].push(''); save(); drawList(); };
    b.appendChild(listCont);
    return b;
  }

  jutRanks.appendChild(renderJutsuRank('e', 'E-Rank'));
  jutRanks.appendChild(renderJutsuRank('c', 'C-Rank'));
  jutRanks.appendChild(renderJutsuRank('a', 'A-Rank'));
  jutRanks.appendChild(renderJutsuRank('d', 'D-Rank'));
  jutRanks.appendChild(renderJutsuRank('b', 'B-Rank'));
  jutRanks.appendChild(renderJutsuRank('s', 'S-Rank'));
  
  page3.appendChild(jutRanks);
  sheet.appendChild(page3);

  content.appendChild(sheet);
  wrap.appendChild(content);

  return wrap;
};