window._brancaloniaDefault = function(id) {
  return { 
    id: id || '', schedaTipo: 'brancalonia', 
    nome: '', classe: '', livello: 1, background: '', 
    nomeGiocatore: '', razza: '', allineamento: '', avatar: '',
    ca: 10, iniziativa: 0, velocita: 9, competenza: 2,
    pf_max: '', pf_temp: '', pf_attuali: '', dadi_vita: '',
    ispirazione: false, percezione_passiva: 10,
    for: 10, des: 10, cos: 10, int: 10, sag: 10, car: 10,
    ts_for: false, ts_des: false, ts_cos: false, ts_int: false, ts_sag: false, ts_car: false,
    sk_acro: false, sk_addes: false, sk_arc: false, sk_atl: false, sk_fur: false, 
    sk_ind: false, sk_ing: false, sk_intm: false, sk_intr: false, sk_intu: false, 
    sk_med: false, sk_nat: false, sk_perc: false, sk_pers: false, sk_rap: false, 
    sk_rel: false, sk_sopr: false, sk_sto: false,
    malefatte: '', tratti: '', ideali: '', legami: '', difetti: '', vivo: '', taglia: '', storia: '',
    indebolimento: [false, false, false, false, false, false],
    batoste: [false, false, false, false, false, false],
    tsm_s: [false, false, false], tsm_f: [false, false, false],
    equip: '', armi: '', mr: '', ma: '', mf: '', mo: '',
    cd_ts: '', bonus_inc: '', classe_inc: '', carat_inc: '',
    trucchetti: '', incantesimi: '', mosse: '', privilegi: '', zaino: '', alleati: '', note: ''
  };
};

window.renderBrancaloniaSheet = function(scheda) {
  var _dm = window.state ? window.state.schedePGViewMode : false;
  function save() {
    if(!_dm && window.fbSaveScheda) {
      if(window._schedaSaveTimer) clearTimeout(window._schedaSaveTimer);
      window._schedaSaveTimer = setTimeout(function(){ window.fbSaveScheda(); }, 600);
    }
  }

  function handleAvatarClick(callback) {
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

  function _inp(label, obj, key, type, ph) {
    var d = document.createElement('div'); d.style.cssText = 'display:flex;flex-direction:column;flex:1;min-width:60px;';
    var l = document.createElement('span'); l.textContent = label; l.style.cssText = 'font-size:11px;font-weight:900;color:#8B0000;text-transform:uppercase;margin-bottom:2px;font-family:"Cinzel",serif;letter-spacing:0.05em;';
    var i = document.createElement('input'); i.type = type || 'text'; i.value = obj[key] || ''; if(ph) i.placeholder = ph;
    i.readOnly = _dm;
    i.style.cssText = 'width:100%;background:#fff;border:2px solid #553b28;border-radius:2px;padding:6px;font-family:"Nunito",sans-serif;font-size:14px;outline:none;color:#111;box-shadow:inset 1px 1px 3px rgba(0,0,0,0.1);transition:border 0.2s;';
    i.onfocus = function(){ this.style.borderColor = '#d63031'; }; i.onblur = function(){ this.style.borderColor = '#553b28'; };
    i.oninput = function() { obj[key] = (type==='number'?Number(this.value):this.value); save(); };
    d.appendChild(l); d.appendChild(i); return d;
  }

  function _txt(label, obj, key, rows, ph) {
    var d = document.createElement('div'); d.style.cssText = 'display:flex;flex-direction:column;height:100%;';
    var l = document.createElement('span'); l.innerHTML = label; l.style.cssText = 'font-size:13px;font-weight:900;color:#553b28;text-transform:uppercase;border-bottom:2px solid #d63031;padding-bottom:3px;margin-bottom:6px;font-family:"Cinzel",serif;letter-spacing:0.05em;';
    var i = document.createElement('textarea'); i.value = obj[key] || ''; i.rows = rows || 3; if(ph) i.placeholder = ph;
    i.readOnly = _dm;
    i.style.cssText = 'flex:1;width:100%;background:repeating-linear-gradient(#fff, #fff 24px, #f4e9d8 25px);border:2px solid #553b28;border-radius:2px;padding:6px;font-family:"Nunito",sans-serif;font-size:14px;outline:none;color:#111;resize:none;line-height:25px;box-shadow:inset 1px 1px 3px rgba(0,0,0,0.05);transition:border 0.2s;';
    i.onfocus = function(){ this.style.borderColor = '#d63031'; }; i.onblur = function(){ this.style.borderColor = '#553b28'; };
    i.oninput = function() { obj[key] = this.value; save(); };
    d.appendChild(l); d.appendChild(i); return d;
  }
  
  function formatMod(val) { var m = Math.floor((val - 10) / 2); return m >= 0 ? '+'+m : m; }

  // MAIN WRAPPER
  var wrap = document.createElement('div'); wrap.style.cssText = 'display:flex;flex-direction:column;width:100%;height:100%;overflow:hidden;background:#3e2723;position:relative;';
  
  // NAVBAR
  var nav = document.createElement('div'); nav.style.cssText = 'background:#1a100c;border-bottom:3px solid #d63031;padding:0.5rem 1rem;display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;position:sticky;top:0;z-index:200;';
  var bk = document.createElement('button'); bk.innerHTML = '&#8592; Torna in Locanda'; bk.style.cssText = 'background:#553b28;border:1px solid #d63031;color:#fff;border-radius:3px;padding:0.4rem 0.8rem;font-size:12px;cursor:pointer;font-family:"Cinzel",serif;font-weight:bold;text-transform:uppercase;';
  bk.onclick = function() { 
    if(window.state && window.state.schedePGViewMode) { window.state.schedePGViewMode=false; window.state.schedePGOpenChar=null; window.state.schedaAttivaId=null; window.state.scheda={}; } 
    else { window.state.schedaAttivaId=null; window.state.scheda={}; } 
    if(window.renderMain) window.renderMain(); 
  };
  nav.appendChild(bk);
  var sp = document.createElement('span'); sp.style.flex = '1'; nav.appendChild(sp);
  
  var lavToggle = document.createElement('button'); lavToggle.innerHTML = '\uD83D\uDCDD Appunti del Canaglia'; lavToggle.style.cssText = 'background:#d63031; border:1px solid #ff7675; color:#fff; border-radius:3px; padding:0.4rem 0.8rem; font-size:12px; cursor:pointer; font-family:"Cinzel", serif; margin-right:10px; font-weight:bold; text-transform:uppercase;';
  lavToggle.onclick = function() {
    if(window._toggleGlobalLavagna) window._toggleGlobalLavagna();
    else { window.state.lavagnaOpen = !window.state.lavagnaOpen; if(window.renderMain) window.renderMain(); }
  };
  nav.appendChild(lavToggle);

  if(!_dm) {
    var btnDel = document.createElement('button'); btnDel.textContent = 'Manda al Creatore \u2620\uFE0F'; btnDel.style.cssText = 'background:#111;border:1px solid #d63031;color:#d63031;border-radius:3px;padding:0.4rem 0.8rem;font-size:12px;cursor:pointer;font-family:"Cinzel", serif;font-weight:bold;';
    btnDel.onclick = function() { 
      if(!confirm('Vuoi davvero uccidere definitivamente questa canaglia?')) return; 
      if(window.state && window.state.schedaAttivaId) { 
        if(window.fbDeleteSchedaItem) { window.fbDeleteSchedaItem(window.state.schedaAttivaId); } 
        else if(window._db) { window._db.ref('schedePG/'+window.state.currentUser.username+'/chars/'+window.state.schedaAttivaId).remove(); } 
        let idx = window.state.schedeList.findIndex(s => s.id === window.state.schedaAttivaId); 
        if(idx>=0) window.state.schedeList.splice(idx,1); 
        window.state.schedaAttivaId = null; window.state.scheda = {}; 
        if(window.renderMain) window.renderMain(); 
      } 
    };
    nav.appendChild(btnDel);
  } else {
    var bD = document.createElement('span'); bD.textContent='Occhio del Condottiero (Sola Lettura)'; bD.style.cssText='font-size:11px;color:#d63031;background:rgba(214,48,49,0.1);border:1px solid #d63031;border-radius:3px;padding:0.3rem 0.7rem;font-family:"Cinzel", serif;font-weight:bold;';
    nav.appendChild(bD);
  }
  wrap.appendChild(nav);

  // CONTENT AREA
  var contentArea = document.createElement('div');
  contentArea.style.cssText = 'flex:1;overflow-y:auto;padding:30px;display:flex;justify-content:center;background:radial-gradient(circle, #f9f4ec 0%, #e0d0b8 100%);';
  
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
  tCard.style.cssText = 'width:100%;max-width:1100px;display:flex;flex-direction:column;gap:25px;transform-origin:top center;transition:transform 0.1s ease-out;';

  // HEADER ROW
  var r1 = document.createElement('div');
  r1.style.cssText = 'display:grid;grid-template-columns:160px 1fr;gap:25px;background:#fff;border:4px solid #553b28;border-radius:8px;padding:20px;box-shadow:6px 6px 0px rgba(85,59,40,0.2);position:relative;';
  
  var decorL = document.createElement('div'); decorL.textContent='??'; decorL.style.cssText='position:absolute;top:-15px;left:-15px;font-size:36px;transform:rotate(-15deg);'; r1.appendChild(decorL);
  var decorR = document.createElement('div'); decorR.textContent='??'; decorR.style.cssText='position:absolute;top:-15px;right:-15px;font-size:36px;transform:rotate(15deg);'; r1.appendChild(decorR);

  var avatarBox = document.createElement('div');
  avatarBox.style.cssText = 'width:160px;height:160px;background:#f4e9d8;border:3px dashed #d63031;border-radius:8px;overflow:hidden;cursor:'+(_dm?'default':'pointer')+';display:flex;align-items:center;justify-content:center;position:relative;';
  var aIm = document.createElement('img'); aIm.style.cssText = 'width:100%;height:100%;object-fit:cover;display:'+(scheda.avatar?'block':'none')+';'; aIm.src = scheda.avatar || '';
  avatarBox.appendChild(aIm);
  if(!scheda.avatar) { avatarBox.innerHTML = '<div style="color:#d63031;text-align:center;font-size:13px;font-family:Cinzel,serif;padding:10px;font-weight:bold;">Faccia da Schiaffi<br>(Clicca per foto)</div>'; }
  avatarBox.onclick = function() { handleAvatarClick(function(url){ scheda.avatar=url; scheda.aspettoImg=url; aIm.src=url; aIm.style.display='block'; avatarBox.innerHTML=''; avatarBox.appendChild(aIm); save(); }); };
  r1.appendChild(avatarBox);

  var r1F = document.createElement('div'); r1F.style.cssText = 'display:flex;flex-direction:column;gap:15px;justify-content:center;';
  
  var titleBar = document.createElement('div');
  titleBar.style.cssText = 'text-align:center;font-family:"Cinzel", serif;font-size:42px;font-weight:900;color:#553b28;letter-spacing:0.1em;border-bottom:3px solid #d63031;padding-bottom:10px;text-transform:uppercase;';
  titleBar.innerHTML = 'BRANCALONIA <span style="font-size:16px;color:#d63031;vertical-align:middle;letter-spacing:normal;">Spaghetti Fantasy</span>';
  r1F.appendChild(titleBar);

  var r1G = document.createElement('div'); r1G.style.cssText = 'display:grid;grid-template-columns:repeat(4, 1fr);gap:15px;';
  r1G.appendChild(_inp('Nome Canaglia', scheda, 'nome', 'text', 'Es. Berto il Guercio'));
  scheda.nomePersonaggio = scheda.nomePersonaggio || scheda.nome; 
  r1G.appendChild(_inp('Classe', scheda, 'classe', 'text', 'Es. Pagano, Scagnozzo...'));
  r1G.appendChild(_inp('Livello', scheda, 'livello', 'number'));
  r1G.appendChild(_inp('Razza', scheda, 'razza', 'text', 'Es. Umano, Marionetta...'));
  r1G.appendChild(_inp('Allineamento', scheda, 'allineamento', 'text', 'Es. Caotico Cialtrone'));
  r1G.appendChild(_inp('Background', scheda, 'background', 'text'));
  r1G.appendChild(_inp('Giocatore', scheda, 'nomeGiocatore', 'text'));
  r1F.appendChild(r1G);
  r1.appendChild(r1F);
  tCard.appendChild(r1);
  // STATS & VITALS
  var r2 = document.createElement('div');
  r2.style.cssText = 'display:grid;grid-template-columns:320px 1fr 300px;gap:25px;';

  // LEFT COLUMN (Flavor Texts)
  var lCol = document.createElement('div');
  lCol.style.cssText = 'display:flex;flex-direction:column;gap:15px;';
  lCol.appendChild(_txt('Malefatte', scheda, 'malefatte', 4, 'Es. Rubato un maiale al podestà...'));
  lCol.appendChild(_txt('Tratti Caratteriali', scheda, 'tratti', 3));
  lCol.appendChild(_txt('Ideali', scheda, 'ideali', 3));
  lCol.appendChild(_txt('Legami', scheda, 'legami', 3));
  lCol.appendChild(_txt('Difetti', scheda, 'difetti', 3));
  lCol.appendChild(_txt('Preferibilmente Vivo', scheda, 'vivo', 4, 'Crimini e taglie pendenti...'));
  lCol.appendChild(_inp('Taglia Corrente', scheda, 'taglia', 'text', 'Es. 500 Monete d\'Oro'));
  lCol.appendChild(_txt('Storia del Personaggio', scheda, 'storia', 8, 'Come sei finito in questa banda di cialtroni?'));
  r2.appendChild(lCol);

  // MIDDLE COLUMN
  var mCol = document.createElement('div');
  mCol.style.cssText = 'display:flex;flex-direction:column;gap:20px;';
  
  var topM = document.createElement('div');
  topM.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;width:100%;';
  topM.appendChild(_inp('Iniziativa', scheda, 'iniziativa', 'number'));
  topM.appendChild(_inp('CA (Scudo/Armat.)', scheda, 'ca', 'number'));
  topM.appendChild(_inp('Bonus Competenza', scheda, 'competenza', 'number'));
  mCol.appendChild(topM);

  var vitBox = document.createElement('div');
  vitBox.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:15px;width:100%;background:#fff;padding:20px;border-radius:8px;border:3px solid #553b28;box-shadow:4px 4px 0px rgba(85,59,40,0.15);position:relative;';
  var vitDecor = document.createElement('div'); vitDecor.textContent='??'; vitDecor.style.cssText='position:absolute;top:-12px;left:-12px;font-size:24px;'; vitBox.appendChild(vitDecor);
  
  vitBox.appendChild(_inp('Max PF', scheda, 'pf_max', 'number'));
  vitBox.appendChild(_inp('PF Temporanei', scheda, 'pf_temp', 'number'));
  
  var pfa = _inp('PF Attuali', scheda, 'pf_attuali', 'number'); pfa.style.gridColumn='1 / -1';
  var pfaInp = pfa.querySelector('input'); pfaInp.style.fontSize = '36px'; pfaInp.style.textAlign = 'center'; pfaInp.style.height = '65px'; pfaInp.style.fontWeight = '900'; pfaInp.style.color = '#d63031';
  vitBox.appendChild(pfa);
  vitBox.appendChild(_inp('Dadi Vita', scheda, 'dadi_vita', 'text'));
  
  var tsmBox = document.createElement('div');
  tsmBox.style.cssText = 'display:flex;flex-direction:column;gap:5px;align-items:center;background:#f4e9d8;border:2px solid #553b28;border-radius:4px;padding:5px;';
  tsmBox.innerHTML = '<span style="font-size:11px;font-weight:900;color:#553b28;text-transform:uppercase;font-family:Cinzel,serif;">TS Morte ??</span>';
  function createDots(arr, key, color, cb) {
    var d = document.createElement('div'); d.style.cssText = 'display:flex;gap:6px;';
    arr.forEach(function(val, idx) {
      var dot = document.createElement('div');
      dot.style.cssText = 'width:16px;height:16px;border-radius:50%;border:2px solid '+color+';cursor:'+(_dm?'default':'pointer')+';background:'+(val?color:'#fff')+';';
      if(!_dm) {
        dot.onclick = function() { arr[idx] = !arr[idx]; dot.style.background = arr[idx] ? color : '#fff'; cb(); };
      }
      d.appendChild(dot);
    });
    return d;
  }
  var sRow = document.createElement('div'); sRow.style.cssText = 'display:flex;gap:5px;align-items:center;font-size:12px;font-weight:bold;'; sRow.innerHTML = 'Succ: '; sRow.appendChild(createDots(scheda.tsm_s, 'tsm_s', '#27ae60', save));
  var fRow = document.createElement('div'); fRow.style.cssText = 'display:flex;gap:5px;align-items:center;font-size:12px;font-weight:bold;'; fRow.innerHTML = 'Fall: '; fRow.appendChild(createDots(scheda.tsm_f, 'tsm_f', '#c0392b', save));
  tsmBox.appendChild(sRow); tsmBox.appendChild(fRow);
  vitBox.appendChild(tsmBox);
  mCol.appendChild(vitBox);

  // BRANCALONIA SPECIALTIES
  var bSpecial = document.createElement('div');
  bSpecial.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:20px;width:100%;';
  
  var indBox = document.createElement('div');
  indBox.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;background:#fff;padding:15px;border-radius:8px;border:3px dashed #d63031;box-shadow:inset 0 0 10px rgba(214,48,49,0.1);';
  indBox.innerHTML = '<span style="font-size:15px;font-weight:900;color:#d63031;font-family:Cinzel,serif;text-align:center;">Indebolimento<br><span style="font-size:24px;">??</span></span>';
  var indGrid = document.createElement('div'); indGrid.style.cssText = 'display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;';
  scheda.indebolimento.forEach(function(v,i){
    var dt=document.createElement('div'); dt.style.cssText='width:24px;height:24px;border-radius:50%;border:2px solid #d63031;cursor:'+(_dm?'default':'pointer')+';background:'+(v?'#d63031':'#fff')+';';
    if(!_dm) dt.onclick=function(){ scheda.indebolimento[i]=!scheda.indebolimento[i]; dt.style.background=scheda.indebolimento[i]?'#d63031':'#fff'; save(); }; indGrid.appendChild(dt);
  });
  indBox.appendChild(indGrid);
  
  var batBox = document.createElement('div');
  batBox.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;background:#fff;padding:15px;border-radius:8px;border:3px dashed #553b28;box-shadow:inset 0 0 10px rgba(85,59,40,0.1);';
  batBox.innerHTML = '<span style="font-size:15px;font-weight:900;color:#553b28;font-family:Cinzel,serif;text-align:center;">Batoste<br><span style="font-size:24px;">??</span></span>';
  var batGrid = document.createElement('div'); batGrid.style.cssText = 'display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;';
  scheda.batoste.forEach(function(v,i){
    var dt=document.createElement('div'); dt.style.cssText='width:24px;height:24px;border-radius:50%;border:2px solid #553b28;cursor:'+(_dm?'default':'pointer')+';background:'+(v?'#553b28':'#fff')+';';
    if(!_dm) dt.onclick=function(){ scheda.batoste[i]=!scheda.batoste[i]; dt.style.background=scheda.batoste[i]?'#553b28':'#fff'; save(); }; batGrid.appendChild(dt);
  });
  batBox.appendChild(batGrid);

  bSpecial.appendChild(indBox); bSpecial.appendChild(batBox);
  mCol.appendChild(bSpecial);

  mCol.appendChild(_txt('Equipaggiamento', scheda, 'equip', 8, 'Fiaschi, pagnotte, coltellacci...'));
  mCol.appendChild(_txt('Armi e Attacchi', scheda, 'armi', 6, 'Spadone a due mani +5 (2d6+3)'));

  r2.appendChild(mCol);

  // RIGHT COLUMN (Stats and Skills)
  var rCol = document.createElement('div');
  rCol.style.cssText = 'display:flex;flex-direction:column;gap:15px;';
  
  function _statBox(lbl, key) {
    var wrap = document.createElement('div'); wrap.style.cssText='display:flex;align-items:center;gap:15px;background:#fff;padding:8px 12px;border-radius:8px;border:3px solid #553b28;box-shadow:3px 3px 0px rgba(85,59,40,0.15);';
    var name = document.createElement('div'); name.textContent=lbl; name.style.cssText='font-family:"Cinzel",serif;font-weight:900;font-size:18px;color:#d63031;width:45px;';
    var inp = document.createElement('input'); inp.type='number'; inp.value=scheda[key]||10; inp.readOnly=_dm;
    inp.style.cssText='width:55px;height:45px;font-size:22px;font-weight:900;text-align:center;border:2px solid #553b28;border-radius:4px;outline:none;background:#f4e9d8;color:#111;';
    var mod = document.createElement('div'); mod.style.cssText='width:45px;text-align:center;font-size:22px;font-weight:900;color:#553b28;'; mod.textContent=formatMod(scheda[key]||10);
    inp.oninput=function(){ scheda[key]=Number(this.value); mod.textContent=formatMod(scheda[key]); save(); };
    wrap.appendChild(name); wrap.appendChild(inp); wrap.appendChild(mod); return wrap;
  }
  
  var statsGrid = document.createElement('div'); statsGrid.style.cssText='display:grid;gap:10px;';
  statsGrid.appendChild(_statBox('FOR', 'for')); statsGrid.appendChild(_statBox('DES', 'des')); statsGrid.appendChild(_statBox('COS', 'cos'));
  statsGrid.appendChild(_statBox('INT', 'int')); statsGrid.appendChild(_statBox('SAG', 'sag')); statsGrid.appendChild(_statBox('CAR', 'car'));
  rCol.appendChild(statsGrid);

  var skillsBox = document.createElement('div');
  skillsBox.style.cssText = 'background:#fff;padding:20px;border-radius:8px;border:3px solid #553b28;box-shadow:4px 4px 0px rgba(85,59,40,0.15);display:flex;flex-direction:column;gap:10px;';
  
  function _sk(lbl, key) {
    var row = document.createElement('div'); row.style.cssText = 'display:flex;align-items:center;gap:10px;font-size:13px;font-family:"Nunito",sans-serif;color:#111;font-weight:bold;';
    var chk = document.createElement('div'); chk.style.cssText = 'width:14px;height:14px;border-radius:50%;border:2px solid #553b28;cursor:'+(_dm?'default':'pointer')+';background:'+(scheda[key]?'#d63031':'#fff')+';flex-shrink:0; transition:background 0.2s;';
    if(!_dm) chk.onclick = function() { scheda[key]=!scheda[key]; chk.style.background=scheda[key]?'#d63031':'#fff'; save(); };
    row.appendChild(chk); row.appendChild(document.createTextNode(lbl)); return row;
  }
  
  var tsTitle = document.createElement('div'); tsTitle.textContent='Tiri Salvezza'; tsTitle.style.cssText='font-family:"Cinzel",serif;font-weight:900;color:#553b28;border-bottom:2px solid #d63031;padding-bottom:4px;'; skillsBox.appendChild(tsTitle);
  var tswrap = document.createElement('div'); tswrap.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;';
  tswrap.appendChild(_sk('Forza', 'ts_for')); tswrap.appendChild(_sk('Destrezza', 'ts_des')); tswrap.appendChild(_sk('Costituzione', 'ts_cos'));
  tswrap.appendChild(_sk('Intelligenza', 'ts_int')); tswrap.appendChild(_sk('Saggezza', 'ts_sag')); tswrap.appendChild(_sk('Carisma', 'ts_car'));
  skillsBox.appendChild(tswrap);
  
  var abTitle = document.createElement('div'); abTitle.textContent='Abilità'; abTitle.style.cssText='font-family:"Cinzel",serif;font-weight:900;color:#553b28;border-bottom:2px solid #d63031;padding-bottom:4px;'; skillsBox.appendChild(abTitle);
  var skwrap = document.createElement('div'); skwrap.style.cssText='display:grid;grid-template-columns:1fr;gap:4px;';
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

  var psp = document.createElement('div'); psp.style.cssText='display:flex;align-items:center;gap:10px;margin-top:15px;background:#f4e9d8;padding:10px;border-radius:4px;border:2px solid #553b28;';
  var pspC = document.createElement('div'); pspC.style.cssText='width:20px;height:20px;border-radius:50%;border:2px solid #553b28;cursor:'+(_dm?'default':'pointer')+';background:'+(scheda.ispirazione?'#f1c40f':'#fff')+';box-shadow:inset 0 0 5px rgba(0,0,0,0.2);';
  if(!_dm) pspC.onclick = function() { scheda.ispirazione=!scheda.ispirazione; pspC.style.background=scheda.ispirazione?'#f1c40f':'#fff'; save(); };
  psp.appendChild(pspC); 
  var inspL = document.createElement('span'); inspL.textContent='Ispirazione \u2728'; inspL.style.cssText='font-family:"Cinzel",serif;font-weight:900;color:#553b28;'; psp.appendChild(inspL);
  skillsBox.appendChild(psp);
  rCol.appendChild(skillsBox);
  
  var coinBox = document.createElement('div'); coinBox.style.cssText='display:grid;grid-template-columns:repeat(4, 1fr);gap:10px;background:#fff;padding:15px;border-radius:8px;border:3px solid #553b28;text-align:center;box-shadow:4px 4px 0px rgba(85,59,40,0.15);';
  coinBox.appendChild(_inp('MR', scheda, 'mr', 'text')); coinBox.appendChild(_inp('MA', scheda, 'ma', 'text'));
  coinBox.appendChild(_inp('MF', scheda, 'mf', 'text')); coinBox.appendChild(_inp('MO', scheda, 'mo', 'text'));
  rCol.appendChild(coinBox);

  r2.appendChild(rCol);
  tCard.appendChild(r2);
  // BOTTOM (MAGIC & EXTRAS)
  var r3 = document.createElement('div');
  r3.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:20px;padding-top:30px;border-top:4px dashed #553b28;position:relative;';
  
  var decorB = document.createElement('div'); decorB.textContent='???'; decorB.style.cssText='position:absolute;top:-25px;left:50%;transform:translateX(-50%);font-size:36px;'; r3.appendChild(decorB);

  var mLeft = document.createElement('div'); mLeft.style.cssText='display:flex;flex-direction:column;gap:20px;';
  var mHeader = document.createElement('div'); mHeader.style.cssText='display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:15px;background:#fff;padding:15px;border-radius:8px;border:3px solid #553b28;box-shadow:4px 4px 0px rgba(85,59,40,0.15);';
  mHeader.appendChild(_inp('Classe Inc.', scheda, 'classe_inc', 'text')); mHeader.appendChild(_inp('Carat. Inc.', scheda, 'carat_inc', 'text'));
  mHeader.appendChild(_inp('CD TS', scheda, 'cd_ts', 'number')); mHeader.appendChild(_inp('Bonus Atk', scheda, 'bonus_inc', 'number'));
  mLeft.appendChild(mHeader);
  mLeft.appendChild(_txt('Trucchetti', scheda, 'trucchetti', 5));
  mLeft.appendChild(_txt('Incantesimi (Slot/Livelli)', scheda, 'incantesimi', 12));
  mLeft.appendChild(_txt('Mosse e Privilegi di Banda', scheda, 'mosse', 10));
  r3.appendChild(mLeft);

  var mRight = document.createElement('div'); mRight.style.cssText='display:flex;flex-direction:column;gap:20px;';
  mRight.appendChild(_txt('Tratti e Privilegi', scheda, 'privilegi', 10));
  mRight.appendChild(_txt('Zaino e Cianfrusaglie', scheda, 'zaino', 10, 'Cordame, porchetta, santini...'));
  mRight.appendChild(_txt('Alleati e Organizzazioni', scheda, 'alleati', 8));
  mRight.appendChild(_txt('Note e Segreti', scheda, 'note', 8));
  r3.appendChild(mRight);

  tCard.appendChild(r3);
  
  contentArea.appendChild(tCard);
  wrap.appendChild(contentArea);
  
  return wrap;
};
