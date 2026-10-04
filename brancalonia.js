window._brancaloniaDefault = function(id) {
  return { 
    id: id || '', 
    schedaTipo: 'brancalonia', 
    nome: '', 
    classe: '', 
    livello: 1, 
    background: '', 
    nomeGiocatore: '', 
    razza: '', 
    allineamento: '', 
    avatar: '',
    
    ca: 10, iniziativa: 0, velocita: 9, competenza: 2,
    pf_max: '', pf_temp: '', pf_attuali: '', dadi_vita: '',
    ispirazione: false, percezione_passiva: 10,
    
    // Stats
    for: 10, des: 10, cos: 10, int: 10, sag: 10, car: 10,
    
    // TS
    ts_for: false, ts_des: false, ts_cos: false, ts_int: false, ts_sag: false, ts_car: false,
    
    // Abilità
    sk_acro: false, sk_addes: false, sk_arc: false, sk_atl: false, sk_fur: false, 
    sk_ind: false, sk_ing: false, sk_intm: false, sk_intr: false, sk_intu: false, 
    sk_med: false, sk_nat: false, sk_perc: false, sk_pers: false, sk_rap: false, 
    sk_rel: false, sk_sopr: false, sk_sto: false,
    
    // Brancalonia Specifics
    malefatte: '',
    tratti: '',
    ideali: '',
    legami: '',
    difetti: '',
    vivo: '',
    taglia: '',
    storia: '',
    
    indebolimento: [false, false, false, false, false, false],
    batoste: [false, false, false, false, false, false],
    
    tsm_s: [false, false, false],
    tsm_f: [false, false, false],
    
    equip: '',
    armi: '',
    
    mr: '', ma: '', mf: '', mo: '',
    
    // Magia
    cd_ts: '', bonus_inc: '',
    classe_inc: '', carat_inc: '',
    trucchetti: '',
    slot_tot: ['', '', '', '', '', '', '', '', ''],
    slot_spe: ['', '', '', '', '', '', '', '', ''],
    incantesimi: '',
    
    // Mosse
    mosse_tot: '', mosse_spe: '',
    mosse: '',
    
    // Tratti, Zaino, Alleati, Note
    privilegi: '',
    zaino: '',
    alleati: '',
    note: ''
  };
};

window.renderBrancaloniaSheet = function(scheda) {
  var _dm = state.schedePGViewMode;

  function save() {
    if(!_dm && window.fbSaveScheda) {
      if(window._schedaSaveTimer) clearTimeout(window._schedaSaveTimer);
      window._schedaSaveTimer = setTimeout(function(){ window.fbSaveScheda(); }, 600);
    }
  }

  function handleAvatarClick(currentAvatar, callback) {
    if(_dm) return;
    var fi = document.createElement('input'); fi.type = 'file'; fi.accept = 'image/*'; fi.style.display = 'none';
    document.body.appendChild(fi);
    fi.onchange = function(e) {
      document.body.removeChild(fi);
      var f = e.target.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function(ev) {
        var img = new Image();
        img.onload = function() {
          var max = 600; var ratio = Math.min(1, max/img.width, max/img.height);
          var cv = document.createElement('canvas'); cv.width = img.width * ratio; cv.height = img.height * ratio;
          cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
          callback(cv.toDataURL('image/jpeg', 0.85));
        };
        img.src = ev.target.result;
      };
      rd.readAsDataURL(f);
    };
    fi.click();
  }

  // Helper functions
  function _inp(label, obj, key, type) {
    var d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:2px;flex:1;min-width:80px;';
    var l = document.createElement('span'); l.textContent = label; l.style.cssText = 'font-size:10px;font-weight:bold;color:#4a3c31;text-transform:uppercase;';
    var i = document.createElement('input'); i.type = type || 'text'; i.value = obj[key] || '';
    i.readOnly = _dm;
    i.style.cssText = 'width:100%;background:rgba(255,255,255,0.6);border:1px solid #bda282;border-radius:4px;padding:4px;font-family:inherit;font-size:13px;outline:none;color:#111;';
    i.onfocus = function(){ this.style.background='#fff'; this.style.borderColor='#8b6f3f'; };
    i.onblur = function(){ this.style.background='rgba(255,255,255,0.6)'; this.style.borderColor='#bda282'; };
    i.oninput = function() { obj[key] = (type==='number'?Number(this.value):this.value); save(); };
    d.appendChild(l); d.appendChild(i); return d;
  }

  function _txt(label, obj, key, rows) {
    var d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:2px;height:100%;';
    var l = document.createElement('span'); l.textContent = label; l.style.cssText = 'font-size:11px;font-weight:bold;color:#4a3c31;text-transform:uppercase;border-bottom:1px solid #bda282;padding-bottom:2px;margin-bottom:4px;';
    var i = document.createElement('textarea'); i.value = obj[key] || ''; i.rows = rows || 3;
    i.readOnly = _dm;
    i.style.cssText = 'flex:1;width:100%;background:rgba(255,255,255,0.4);border:1px dashed #bda282;border-radius:4px;padding:6px;font-family:inherit;font-size:13px;outline:none;color:#111;resize:none;line-height:1.4;';
    i.onfocus = function(){ this.style.background='#fff'; this.style.borderStyle='solid'; this.style.borderColor='#8b6f3f'; };
    i.onblur = function(){ this.style.background='rgba(255,255,255,0.4)'; this.style.borderStyle='dashed'; this.style.borderColor='#bda282'; };
    i.oninput = function() { obj[key] = this.value; save(); };
    d.appendChild(l); d.appendChild(i); return d;
  }
  
  function calcMod(val) { return Math.floor((val - 10) / 2); }
  function formatMod(val) { var m = calcMod(val); return m >= 0 ? '+'+m : m; }

  // Main container
  var wrap = document.createElement('div'); wrap.style.cssText = 'display:flex;flex-direction:column;width:100%;height:100%;overflow:hidden;background:#ebe1d1;font-family:"Nunito", Arial, sans-serif;position:relative;';
  
  // Navbar
  var nav = document.createElement('div'); nav.style.cssText = 'background:#241d18;border-bottom:2px solid #bda282;padding:0.45rem 1rem;display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;position:sticky;top:0;z-index:200;';
  var bk = document.createElement('button'); bk.innerHTML = '&#8592; Torna ai personaggi'; bk.style.cssText = 'background:#4a3c31;border:1px solid #bda282;color:#ebe1d1;border-radius:3px;padding:0.3rem 0.75rem;font-size:11px;cursor:pointer;font-family:"Cinzel", serif;';
  bk.onclick = function() { 
    if(window.state && window.state.schedePGViewMode) { window.state.schedePGViewMode=false; window.state.schedePGOpenChar=null; window.state.schedaAttivaId=null; window.state.scheda={}; window.state.companions={}; } 
    else { window.state.schedaAttivaId=null; window.state.scheda={}; } 
    if (window.renderMain) window.renderMain(); 
  };
  nav.appendChild(bk);
  var sp = document.createElement('span'); sp.style.flex = '1'; nav.appendChild(sp);
  
  var lavToggle = document.createElement('button'); lavToggle.innerHTML = '\uD83D\uDCDD Lavagna Abilit\u00E0'; lavToggle.style.cssText = 'background:#1a1a2e; border:1px solid #c9a55c; color:#c9a55c; border-radius:3px; padding:0.3rem 0.75rem; font-size:11px; cursor:pointer; font-family:"Cinzel", serif; margin-right:10px; font-weight:bold;';
  lavToggle.onclick = function() {
    if (window._toggleGlobalLavagna) window._toggleGlobalLavagna();
    else { window.state.lavagnaOpen = !window.state.lavagnaOpen; if (window.renderMain) window.renderMain(); }
  };
  nav.appendChild(lavToggle);

  if(!_dm) {
    var btnDel = document.createElement('button'); btnDel.textContent = 'Elimina Scheda'; btnDel.style.cssText = 'background:#4a1010;border:1px solid #c04040;color:#f08080;border-radius:3px;padding:0.3rem 0.75rem;font-size:11px;cursor:pointer;font-family:"Cinzel", serif;';
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
    nav.appendChild(btnDel);
  } else {
    var bD = document.createElement('span'); bD.textContent='Vista Master'; bD.style.cssText='font-size:10px;color:#c9a55c;background:rgba(201,165,92,0.1);border:1px solid rgba(201,165,92,0.3);border-radius:3px;padding:0.2rem 0.6rem;font-family:"Cinzel", serif;';
    nav.appendChild(bD);
  }
  wrap.appendChild(nav);

  var contentArea = document.createElement('div');
  contentArea.style.cssText = 'flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;align-items:center;';
  
  // Native Ctrl+Wheel zoom logic
  contentArea.addEventListener('wheel', function(e) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      var tCard = contentArea.querySelector('.branca-card');
      if (!tCard) return;
      var cur = parseFloat(tCard.getAttribute('data-scale') || '1');
      var delta = e.deltaY > 0 ? -0.1 : 0.1;
      var ns = Math.max(0.4, Math.min(cur + delta, 3.0));
      tCard.setAttribute('data-scale', ns);
      tCard.style.transform = 'scale(' + ns + ')';
    }
  }, { passive: false });

  var tCard = document.createElement('div');
  tCard.className = 'branca-card';
  tCard.setAttribute('data-scale', '1');
  tCard.style.cssText = 'width:100%;max-width:1050px;display:flex;flex-direction:column;gap:20px;transform-origin:top center;transition:transform 0.1s ease-out;';

  // HEADER ROW
  var r1 = document.createElement('div');
  r1.style.cssText = 'display:grid;grid-template-columns:140px 1fr;gap:20px;background:#f3ecdf;border:3px solid #6b5543;border-radius:12px;padding:15px;box-shadow:0 4px 10px rgba(0,0,0,0.1);';
  
  var avatarBox = document.createElement('div');
  avatarBox.style.cssText = 'width:140px;height:140px;background:#3d2f25;border:4px solid #bda282;border-radius:8px;overflow:hidden;cursor:'+(_dm?'default':'pointer')+';display:flex;align-items:center;justify-content:center;position:relative;';
  var aIm = document.createElement('img'); aIm.style.cssText = 'width:100%;height:100%;object-fit:cover;display:'+(scheda.avatar?'block':'none')+';'; aIm.src = scheda.avatar || '';
  avatarBox.appendChild(aIm);
  if(!scheda.avatar) { avatarBox.innerHTML = '<div style="color:#bda282;text-align:center;font-size:11px;font-family:Cinzel,serif;padding:10px;">Clicca per Avatar</div>'; }
  avatarBox.onclick = function() { handleAvatarClick(scheda.avatar, function(url){ scheda.avatar=url; scheda.aspettoImg=url; aIm.src=url; aIm.style.display='block'; avatarBox.innerHTML=''; avatarBox.appendChild(aIm); save(); }); };
  r1.appendChild(avatarBox);

  var r1F = document.createElement('div');
  r1F.style.cssText = 'display:flex;flex-direction:column;gap:15px;justify-content:center;';
  
  var titleBar = document.createElement('div');
  titleBar.style.cssText = 'text-align:center;font-family:"Cinzel", serif;font-size:32px;font-weight:900;color:#6b5543;text-shadow:1px 1px 2px #fff;letter-spacing:0.1em;border-bottom:2px solid #bda282;padding-bottom:5px;';
  titleBar.textContent = 'BRANCALONIA';
  r1F.appendChild(titleBar);

  var r1G = document.createElement('div');
  r1G.style.cssText = 'display:grid;grid-template-columns:repeat(4, 1fr);gap:10px;';
  r1G.appendChild(_inp('Nome PG', scheda, 'nome', 'text'));
  scheda.nomePersonaggio = scheda.nomePersonaggio || scheda.nome; // Sync for dashboard
  
  r1G.appendChild(_inp('Classe', scheda, 'classe', 'text'));
  r1G.appendChild(_inp('Livello', scheda, 'livello', 'number'));
  r1G.appendChild(_inp('Razza', scheda, 'razza', 'text'));
  r1G.appendChild(_inp('Background', scheda, 'background', 'text'));
  r1G.appendChild(_inp('Allineamento', scheda, 'allineamento', 'text'));
  r1G.appendChild(_inp('Giocatore', scheda, 'nomeGiocatore', 'text'));
  r1F.appendChild(r1G);
  r1.appendChild(r1F);
  tCard.appendChild(r1);
  // STATS & VITALS
  var r2 = document.createElement('div');
  r2.style.cssText = 'display:grid;grid-template-columns:300px 1fr 300px;gap:20px;';

  // LEFT COLUMN (Texts)
  var lCol = document.createElement('div');
  lCol.style.cssText = 'display:flex;flex-direction:column;gap:15px;';
  lCol.appendChild(_txt('Malefatte', scheda, 'malefatte', 5));
  lCol.appendChild(_txt('Tratti Caratteriali', scheda, 'tratti', 3));
  lCol.appendChild(_txt('Ideali', scheda, 'ideali', 3));
  lCol.appendChild(_txt('Legami', scheda, 'legami', 3));
  lCol.appendChild(_txt('Difetti', scheda, 'difetti', 3));
  lCol.appendChild(_txt('Preferibilmente Vivo', scheda, 'vivo', 5));
  lCol.appendChild(_inp('Taglia', scheda, 'taglia', 'text'));
  lCol.appendChild(_txt('Storia del Personaggio', scheda, 'storia', 10));
  r2.appendChild(lCol);

  // MIDDLE COLUMN (Vitals, Graphics, Combat)
  var mCol = document.createElement('div');
  mCol.style.cssText = 'display:flex;flex-direction:column;gap:15px;align-items:center;';
  
  var topM = document.createElement('div');
  topM.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;width:100%;';
  topM.appendChild(_inp('Iniziativa', scheda, 'iniziativa', 'number'));
  topM.appendChild(_inp('CA', scheda, 'ca', 'number'));
  topM.appendChild(_inp('Competenza', scheda, 'competenza', 'number'));
  mCol.appendChild(topM);

  var vitBox = document.createElement('div');
  vitBox.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:15px;width:100%;background:#e8dccc;padding:15px;border-radius:8px;border:2px solid #bda282;';
  vitBox.appendChild(_inp('Max PF', scheda, 'pf_max', 'number'));
  vitBox.appendChild(_inp('PF Temp', scheda, 'pf_temp', 'number'));
  
  var pfa = _inp('PF Attuali', scheda, 'pf_attuali', 'number'); pfa.style.gridColumn='1 / -1';
  var pfaInp = pfa.querySelector('input'); pfaInp.style.fontSize = '32px'; pfaInp.style.textAlign = 'center'; pfaInp.style.height = '60px'; pfaInp.style.fontWeight = 'bold';
  vitBox.appendChild(pfa);
  vitBox.appendChild(_inp('Dadi Vita', scheda, 'dadi_vita', 'text'));
  
  var tsmBox = document.createElement('div');
  tsmBox.style.cssText = 'display:flex;flex-direction:column;gap:5px;align-items:center;';
  tsmBox.innerHTML = '<span style="font-size:10px;font-weight:bold;color:#4a3c31;text-transform:uppercase;">TS Morte</span>';
  
  function createDots(arr, key, saveCb) {
    var d = document.createElement('div'); d.style.cssText = 'display:flex;gap:4px;';
    arr.forEach(function(val, idx) {
      var dot = document.createElement('div');
      dot.style.cssText = 'width:14px;height:14px;border-radius:50%;border:2px solid #6b5543;cursor:'+(_dm?'default':'pointer')+';background:'+(val?'#6b5543':'transparent')+';';
      if(!_dm) {
        dot.onclick = function() {
          arr[idx] = !arr[idx];
          dot.style.background = arr[idx] ? '#6b5543' : 'transparent';
          saveCb();
        };
      }
      d.appendChild(dot);
    });
    return d;
  }
  var sRow = document.createElement('div'); sRow.style.cssText = 'display:flex;gap:5px;align-items:center;font-size:11px;'; sRow.innerHTML = 'Succ: '; sRow.appendChild(createDots(scheda.tsm_s, 'tsm_s', save));
  var fRow = document.createElement('div'); fRow.style.cssText = 'display:flex;gap:5px;align-items:center;font-size:11px;'; fRow.innerHTML = 'Fall: '; fRow.appendChild(createDots(scheda.tsm_f, 'tsm_f', save));
  tsmBox.appendChild(sRow); tsmBox.appendChild(fRow);
  vitBox.appendChild(tsmBox);
  mCol.appendChild(vitBox);

  // BRANCALONIA SPECIALTIES
  var bSpecial = document.createElement('div');
  bSpecial.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:20px;width:100%;margin-top:10px;';
  
  var indBox = document.createElement('div');
  indBox.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:8px;background:#e8dccc;padding:10px;border-radius:8px;border:2px dashed #bda282;';
  indBox.innerHTML = '<span style="font-size:13px;font-weight:bold;color:#4a3c31;font-family:Cinzel,serif;">Indebolimento \uD83C\uDF2D</span>';
  var indGrid = document.createElement('div'); indGrid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  scheda.indebolimento.forEach(function(v,i){
    var dt=document.createElement('div'); dt.style.cssText='width:20px;height:20px;border-radius:50%;border:2px solid #8c2a2a;cursor:'+(_dm?'default':'pointer')+';background:'+(v?'#8c2a2a':'transparent')+';';
    if(!_dm) dt.onclick=function(){ scheda.indebolimento[i]=!scheda.indebolimento[i]; dt.style.background=scheda.indebolimento[i]?'#8c2a2a':'transparent'; save(); }; indGrid.appendChild(dt);
  });
  indBox.appendChild(indGrid);
  
  var batBox = document.createElement('div');
  batBox.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:8px;background:#e8dccc;padding:10px;border-radius:8px;border:2px dashed #bda282;';
  batBox.innerHTML = '<span style="font-size:13px;font-weight:bold;color:#4a3c31;font-family:Cinzel,serif;">Batoste \uD83E\uDDB7</span>';
  var batGrid = document.createElement('div'); batGrid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  scheda.batoste.forEach(function(v,i){
    var dt=document.createElement('div'); dt.style.cssText='width:20px;height:20px;border-radius:50%;border:2px solid #5a5a5a;cursor:'+(_dm?'default':'pointer')+';background:'+(v?'#5a5a5a':'transparent')+';';
    if(!_dm) dt.onclick=function(){ scheda.batoste[i]=!scheda.batoste[i]; dt.style.background=scheda.batoste[i]?'#5a5a5a':'transparent'; save(); }; batGrid.appendChild(dt);
  });
  batBox.appendChild(batGrid);

  bSpecial.appendChild(indBox); bSpecial.appendChild(batBox);
  mCol.appendChild(bSpecial);

  mCol.appendChild(_txt('Equipaggiamento', scheda, 'equip', 6));
  mCol.appendChild(_txt('Armi e Attacchi', scheda, 'armi', 5));
  mCol.appendChild(_txt('Tratti e Privilegi', scheda, 'privilegi', 6));

  r2.appendChild(mCol);

  // RIGHT COLUMN (Stats and Skills)
  var rCol = document.createElement('div');
  rCol.style.cssText = 'display:flex;flex-direction:column;gap:15px;';
  
  function _statBox(lbl, key) {
    var wrap = document.createElement('div'); wrap.style.cssText='display:flex;align-items:center;gap:10px;background:#e8dccc;padding:5px 10px;border-radius:8px;border:2px solid #bda282;';
    var name = document.createElement('div'); name.textContent=lbl; name.style.cssText='font-family:"Cinzel",serif;font-weight:bold;font-size:16px;color:#6b5543;width:40px;';
    var inp = document.createElement('input'); inp.type='number'; inp.value=scheda[key]||10; inp.readOnly=_dm;
    inp.style.cssText='width:50px;height:40px;font-size:20px;font-weight:bold;text-align:center;border:1px solid #bda282;border-radius:6px;outline:none;background:#fff;';
    var mod = document.createElement('div'); mod.style.cssText='width:40px;text-align:center;font-size:18px;font-weight:bold;color:#4a3c31;'; mod.textContent=formatMod(scheda[key]||10);
    inp.oninput=function(){ scheda[key]=Number(this.value); mod.textContent=formatMod(scheda[key]); save(); };
    wrap.appendChild(name); wrap.appendChild(inp); wrap.appendChild(mod); return wrap;
  }
  
  var statsGrid = document.createElement('div'); statsGrid.style.cssText='display:grid;gap:8px;';
  statsGrid.appendChild(_statBox('FOR', 'for')); statsGrid.appendChild(_statBox('DES', 'des')); statsGrid.appendChild(_statBox('COS', 'cos'));
  statsGrid.appendChild(_statBox('INT', 'int')); statsGrid.appendChild(_statBox('SAG', 'sag')); statsGrid.appendChild(_statBox('CAR', 'car'));
  rCol.appendChild(statsGrid);

  var skillsBox = document.createElement('div');
  skillsBox.style.cssText = 'background:#e8dccc;padding:15px;border-radius:8px;border:2px solid #bda282;display:flex;flex-direction:column;gap:6px;';
  
  function _sk(lbl, key) {
    var row = document.createElement('div'); row.style.cssText = 'display:flex;align-items:center;gap:8px;font-size:12px;font-family:Arial,sans-serif;color:#333;';
    var chk = document.createElement('div'); chk.style.cssText = 'width:12px;height:12px;border-radius:50%;border:1px solid #6b5543;cursor:'+(_dm?'default':'pointer')+';background:'+(scheda[key]?'#6b5543':'#fff')+';flex-shrink:0;';
    if(!_dm) chk.onclick = function() { scheda[key]=!scheda[key]; chk.style.background=scheda[key]?'#6b5543':'#fff'; save(); };
    row.appendChild(chk); row.appendChild(document.createTextNode(lbl)); return row;
  }
  
  skillsBox.appendChild(document.createTextNode('Tiri Salvezza'));
  var tswrap = document.createElement('div'); tswrap.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #bda282;';
  tswrap.appendChild(_sk('Forza', 'ts_for')); tswrap.appendChild(_sk('Destrezza', 'ts_des')); tswrap.appendChild(_sk('Costituzione', 'ts_cos'));
  tswrap.appendChild(_sk('Intelligenza', 'ts_int')); tswrap.appendChild(_sk('Saggezza', 'ts_sag')); tswrap.appendChild(_sk('Carisma', 'ts_car'));
  skillsBox.appendChild(tswrap);
  
  skillsBox.appendChild(document.createTextNode('Abilità'));
  var skwrap = document.createElement('div'); skwrap.style.cssText='display:grid;grid-template-columns:1fr;gap:3px;';
  skwrap.appendChild(_sk('Acrobazia (Des)', 'sk_acro')); skwrap.appendChild(_sk('Addestrare Animali (Sag)', 'sk_addes'));
  skwrap.appendChild(_sk('Arcano (Int)', 'sk_arc')); skwrap.appendChild(_sk('Atletica (For)', 'sk_atl'));
  skwrap.appendChild(_sk('Furtività (Des)', 'sk_fur')); skwrap.appendChild(_sk('Indagare (Int)', 'sk_ind'));
  skwrap.appendChild(_sk('Inganno (Car)', 'sk_ing')); skwrap.appendChild(_sk('Intimidire (Car)', 'sk_intm'));
  skwrap.appendChild(_sk('Intrattenere (Car)', 'sk_intr')); skwrap.appendChild(_sk('Intuizione (Sag)', 'sk_intu'));
  skwrap.appendChild(_sk('Medicina (Sag)', 'sk_med')); skwrap.appendChild(_sk('Natura (Int)', 'sk_nat'));
  skwrap.appendChild(_sk('Percezione (Sag)', 'sk_perc')); skwrap.appendChild(_sk('Persuasione (Car)', 'sk_pers'));
  skwrap.appendChild(_sk('Rapidità di Mano (Des)', 'sk_rap')); skwrap.appendChild(_sk('Religione (Int)', 'sk_rel'));
  skwrap.appendChild(_sk('Sopravvivenza (Sag)', 'sk_sopr')); skwrap.appendChild(_sk('Storia (Int)', 'sk_sto'));
  skillsBox.appendChild(skwrap);

  var psp = document.createElement('div'); psp.style.cssText='display:flex;align-items:center;gap:10px;margin-top:10px;';
  var pspC = document.createElement('div'); pspC.style.cssText='width:16px;height:16px;border-radius:50%;border:2px solid #6b5543;cursor:'+(_dm?'default':'pointer')+';background:'+(scheda.ispirazione?'#6b5543':'#fff')+';';
  if(!_dm) pspC.onclick = function() { scheda.ispirazione=!scheda.ispirazione; pspC.style.background=scheda.ispirazione?'#6b5543':'#fff'; save(); };
  psp.appendChild(pspC); psp.appendChild(document.createTextNode('Ispirazione'));
  skillsBox.appendChild(psp);
  rCol.appendChild(skillsBox);
  
  var coinBox = document.createElement('div'); coinBox.style.cssText='display:grid;grid-template-columns:repeat(4, 1fr);gap:5px;background:#e8dccc;padding:10px;border-radius:8px;border:2px solid #bda282;text-align:center;';
  coinBox.appendChild(_inp('MR', scheda, 'mr', 'text')); coinBox.appendChild(_inp('MA', scheda, 'ma', 'text'));
  coinBox.appendChild(_inp('MF', scheda, 'mf', 'text')); coinBox.appendChild(_inp('MO', scheda, 'mo', 'text'));
  rCol.appendChild(coinBox);

  r2.appendChild(rCol);
  tCard.appendChild(r2);

  // BOTTOM (MAGIC & EXTRAS)
  var r3 = document.createElement('div');
  r3.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:10px;padding-top:20px;border-top:2px dashed #bda282;';
  
  var mLeft = document.createElement('div'); mLeft.style.cssText='display:flex;flex-direction:column;gap:15px;';
  var mHeader = document.createElement('div'); mHeader.style.cssText='display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;';
  mHeader.appendChild(_inp('Classe Inc.', scheda, 'classe_inc', 'text')); mHeader.appendChild(_inp('Carat. Inc.', scheda, 'carat_inc', 'text'));
  mHeader.appendChild(_inp('CD TS', scheda, 'cd_ts', 'number')); mHeader.appendChild(_inp('Bonus Atk', scheda, 'bonus_inc', 'number'));
  mLeft.appendChild(mHeader);
  mLeft.appendChild(_txt('Trucchetti', scheda, 'trucchetti', 4));
  mLeft.appendChild(_txt('Incantesimi (Slot/Livelli)', scheda, 'incantesimi', 10));
  mLeft.appendChild(_txt('Mosse', scheda, 'mosse', 8));
  r3.appendChild(mLeft);

  var mRight = document.createElement('div'); mRight.style.cssText='display:flex;flex-direction:column;gap:15px;';
  mRight.appendChild(_txt('Zaino (Oggetti vari)', scheda, 'zaino', 8));
  mRight.appendChild(_txt('Alleati e Organizzazioni', scheda, 'alleati', 8));
  mRight.appendChild(_txt('Note', scheda, 'note', 8));
  r3.appendChild(mRight);

  tCard.appendChild(r3);
  
  contentArea.appendChild(tCard);
  wrap.appendChild(contentArea);
  
  return wrap;
};
