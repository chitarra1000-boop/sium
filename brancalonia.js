// Default Coordinates (Rough estimates, user will calibrate them)
window.BRANCA_COORDS = {
  p1: {
    nome: {t:9.5, l:9, w:28, h:2, type:'t'}, classe: {t:9.5, l:43, w:18, h:2, type:'t'}, livello: {t:9.5, l:62.5, w:4, h:2, type:'n'},
    background: {t:13.5, l:43, w:23.5, h:2, type:'t'}, giocatore: {t:13.5, l:68, w:19, h:2, type:'t'},
    razza: {t:17, l:43, w:15, h:2, type:'t'}, allineamento: {t:17, l:60.5, w:15, h:2, type:'t'},
    ispirazione: {t:22.5, l:6.8, w:2, h:1.4, type:'c'},
    competenza: {t:26, l:17, w:4, h:2, type:'n'}, percezione: {t:81.2, l:5.5, w:4, h:2.2, type:'n'},
    ca: {t:22.8, l:38, w:5.5, h:3.5, type:'n'}, iniziativa: {t:22.8, l:47.3, w:5, h:3.5, type:'n'}, velocita: {t:22.8, l:56.5, w:5.5, h:3.5, type:'n'},
    pf_max: {t:28, l:53, w:9, h:2, type:'n'}, pf_att: {t:31.5, l:38.5, w:24, h:4, type:'n'}, pf_temp: {t:38.2, l:38.5, w:24, h:4, type:'n'},
    dadi_vita: {t:45.3, l:38.5, w:10, h:2.5, type:'t'},
    // STATS (val=Base, mod=Modificatore)
    for_val: {t:31, l:7.5, w:4, h:2, type:'n'}, for_mod: {t:34, l:8, w:3, h:1.5, type:'t'},
    des_val: {t:40.5, l:7.5, w:4, h:2, type:'n'}, des_mod: {t:43.5, l:8, w:3, h:1.5, type:'t'},
    cos_val: {t:50, l:7.5, w:4, h:2, type:'n'}, cos_mod: {t:53, l:8, w:3, h:1.5, type:'t'},
    int_val: {t:59.5, l:7.5, w:4, h:2, type:'n'}, int_mod: {t:62.5, l:8, w:3, h:1.5, type:'t'},
    sag_val: {t:69, l:7.5, w:4, h:2, type:'n'}, sag_mod: {t:72, l:8, w:3, h:1.5, type:'t'},
    car_val: {t:78.5, l:7.5, w:4, h:2, type:'n'}, car_mod: {t:81.5, l:8, w:3, h:1.5, type:'t'},
    // TS
    ts_for: {t:29.6, l:15.1, w:1.2, h:0.8, type:'c'}, ts_des: {t:31.2, l:15.1, w:1.2, h:0.8, type:'c'}, ts_cos: {t:32.8, l:15.1, w:1.2, h:0.8, type:'c'},
    ts_int: {t:34.4, l:15.1, w:1.2, h:0.8, type:'c'}, ts_sag: {t:36, l:15.1, w:1.2, h:0.8, type:'c'}, ts_car: {t:37.6, l:15.1, w:1.2, h:0.8, type:'c'},
    // SKILLS
    sk_acro: {t:41.3, l:15.1, w:1.2, h:0.8, type:'c'}, sk_addes: {t:42.9, l:15.1, w:1.2, h:0.8, type:'c'}, sk_arc: {t:44.5, l:15.1, w:1.2, h:0.8, type:'c'},
    sk_atl: {t:46.1, l:15.1, w:1.2, h:0.8, type:'c'}, sk_fur: {t:47.7, l:15.1, w:1.2, h:0.8, type:'c'}, sk_ind: {t:49.3, l:15.1, w:1.2, h:0.8, type:'c'},
    sk_ing: {t:50.9, l:15.1, w:1.2, h:0.8, type:'c'}, sk_intm: {t:52.5, l:15.1, w:1.2, h:0.8, type:'c'}, sk_intr: {t:54.1, l:15.1, w:1.2, h:0.8, type:'c'},
    sk_intu: {t:55.7, l:15.1, w:1.2, h:0.8, type:'c'}, sk_med: {t:57.3, l:15.1, w:1.2, h:0.8, type:'c'}, sk_nat: {t:58.9, l:15.1, w:1.2, h:0.8, type:'c'},
    sk_perc: {t:60.5, l:15.1, w:1.2, h:0.8, type:'c'}, sk_pers: {t:62.1, l:15.1, w:1.2, h:0.8, type:'c'}, sk_rap: {t:63.7, l:15.1, w:1.2, h:0.8, type:'c'},
    sk_rel: {t:65.3, l:15.1, w:1.2, h:0.8, type:'c'}, sk_sopr: {t:66.9, l:15.1, w:1.2, h:0.8, type:'c'}, sk_sto: {t:68.5, l:15.1, w:1.2, h:0.8, type:'c'},
    // TEXT AREAS
    malefatte: {t:23, l:68, w:25, h:15, type:'a'},
    tratti: {t:43, l:68, w:25, h:8, type:'a'}, ideali: {t:54, l:68, w:25, h:7, type:'a'},
    legami: {t:64, l:68, w:25, h:7, type:'a'}, difetti: {t:74, l:68, w:25, h:8, type:'a'},
    vivo: {t:86, l:68, w:25, h:7.5, type:'a'},
    armi: {t:53, l:34, w:31, h:18, type:'a'},
    equip: {t:75, l:34, w:31, h:18, type:'a'},
    // COINS
    mr: {t:76, l:34.5, w:3.5, h:2, type:'n'}, ma: {t:80, l:34.5, w:3.5, h:2, type:'n'},
    mf: {t:84, l:34.5, w:3.5, h:2, type:'n'}, mo: {t:88, l:34.5, w:3.5, h:2, type:'n'},
    // TSM
    tsm_s1: {t:45.6, l:55.7, w:1.4, h:0.9, type:'c'}, tsm_s2: {t:45.6, l:57.6, w:1.4, h:0.9, type:'c'}, tsm_s3: {t:45.6, l:59.5, w:1.4, h:0.9, type:'c'},
    tsm_f1: {t:47.3, l:55.7, w:1.4, h:0.9, type:'c'}, tsm_f2: {t:47.3, l:57.6, w:1.4, h:0.9, type:'c'}, tsm_f3: {t:47.3, l:59.5, w:1.4, h:0.9, type:'c'},
    // BATOSTE & INDEBOLIMENTO
    ind1: {t:10.7, l:88, w:2, h:1.5, type:'c'}, ind2: {t:12.7, l:89, w:2, h:1.5, type:'c'}, ind3: {t:14.7, l:90, w:2, h:1.5, type:'c'}, 
    ind4: {t:16.7, l:91, w:2, h:1.5, type:'c'}, ind5: {t:18.7, l:92, w:2, h:1.5, type:'c'}, ind6: {t:20.7, l:93, w:2, h:1.5, type:'c'},
    bat1: {t:50, l:10, w:2, h:1.5, type:'c'}, bat2: {t:52, l:10, w:2, h:1.5, type:'c'}, bat3: {t:54, l:10, w:2, h:1.5, type:'c'}, 
    bat4: {t:56, l:10, w:2, h:1.5, type:'c'}, bat5: {t:58, l:10, w:2, h:1.5, type:'c'}, bat6: {t:60, l:10, w:2, h:1.5, type:'c'}
  },
  p2: {
    mosse: {t:9, l:7, w:40, h:30, type:'a'},
    privilegi: {t:43, l:7, w:40, h:20, type:'a'},
    zaino: {t:67, l:7, w:40, h:25, type:'a'},
    alleati: {t:9, l:52, w:41, h:25, type:'a'},
    storia: {t:38, l:52, w:41, h:25, type:'a'}, // Storia del Personaggio (Custom addition in notes area)
    note: {t:67, l:52, w:41, h:25, type:'a'},
    // Magia (if needed, simplified text areas)
    trucchetti: {t:67, l:52, w:19, h:25, type:'a'},
    incantesimi: {t:67, l:74, w:19, h:25, type:'a'}
  }
};
window._brancaloniaDefault = function(id) {
  return { 
    id: id || '', schedaTipo: 'brancalonia',
    nome: '', classe: '', livello: 1, background: '', giocatore: '', razza: '', allineamento: '', avatar: '',
    ispirazione: false, competenza: 2, percezione: 10, ca: 10, iniziativa: 0, velocita: 9,
    pf_max: '', pf_att: '', pf_temp: '', dadi_vita: '',
    for_val: 10, for_mod: '+0', des_val: 10, des_mod: '+0', cos_val: 10, cos_mod: '+0',
    int_val: 10, int_mod: '+0', sag_val: 10, sag_mod: '+0', car_val: 10, car_mod: '+0',
    ts_for: false, ts_des: false, ts_cos: false, ts_int: false, ts_sag: false, ts_car: false,
    sk_acro: false, sk_addes: false, sk_arc: false, sk_atl: false, sk_fur: false, sk_ind: false,
    sk_ing: false, sk_intm: false, sk_intr: false, sk_intu: false, sk_med: false, sk_nat: false,
    sk_perc: false, sk_pers: false, sk_rap: false, sk_rel: false, sk_sopr: false, sk_sto: false,
    malefatte: '', tratti: '', ideali: '', legami: '', difetti: '', vivo: '', taglia: '',
    armi: '', equip: '', mr: '', ma: '', mf: '', mo: '',
    tsm_s0: false, tsm_s1: false, tsm_s2: false, tsm_f0: false, tsm_f1: false, tsm_f2: false,
    ind0: false, ind1: false, ind2: false, ind3: false, ind4: false, ind5: false,
    bat0: false, bat1: false, bat2: false, bat3: false, bat4: false, bat5: false,
    mosse: '', privilegi: '', zaino: '', alleati: '', storia: '', note: '', trucchetti: '', incantesimi: ''
  };
};

window.renderBrancaloniaSheet = function(scheda) {
  var _dm = window.state ? window.state.schedePGViewMode : false;
  var _calibMode = false;
  
  // Sincronizza DB e LocalStorage per le coordinate
  var savedCoordsStr = localStorage.getItem('sium_branca_coords_v2');
  var coordsObj = savedCoordsStr ? JSON.parse(savedCoordsStr) : window.BRANCA_COORDS_DEF;

  function save() {
    if(!_dm && window.fbSaveScheda) {
      if(window._schedaSaveTimer) clearTimeout(window._schedaSaveTimer);
      window._schedaSaveTimer = setTimeout(function(){ window.fbSaveScheda(); }, 600);
    }
  }

  // WRAPPER
  var wrap = document.createElement('div'); 
  wrap.style.cssText = 'display:flex;flex-direction:column;width:100%;height:100%;background:#2e2e2e;position:relative;overflow:hidden;';
  
  // NAVBAR
  var nav = document.createElement('div'); 
  nav.style.cssText = 'background:#1a1a1a;border-bottom:1px solid #444;padding:0.5rem 1rem;display:flex;align-items:center;gap:0.5rem;z-index:200;flex-shrink:0;';
  
  var bk = document.createElement('button'); bk.innerHTML = '&#8592; Indietro'; bk.style.cssText = 'background:#333;color:#fff;border:1px solid #555;padding:4px 10px;cursor:pointer;border-radius:3px;';
  bk.onclick = function() { 
    if(window.state && window.state.schedePGViewMode) { window.state.schedePGViewMode=false; window.state.schedePGOpenChar=null; window.state.schedaAttivaId=null; window.state.scheda={}; } 
    else { window.state.schedaAttivaId=null; window.state.scheda={}; } 
    if(window.renderMain) window.renderMain(); 
  };
  nav.appendChild(bk);

  var sp = document.createElement('span'); sp.style.flex = '1'; nav.appendChild(sp);

  if(!_dm) {
    var calibBtn = document.createElement('button'); calibBtn.innerHTML = '?? Calibrazione'; calibBtn.style.cssText = 'background:#8b6f3f;color:#fff;border:none;padding:4px 10px;cursor:pointer;border-radius:3px;';
    calibBtn.onclick = function() {
      _calibMode = !_calibMode;
      calibBtn.style.background = _calibMode ? '#c0392b' : '#8b6f3f';
      calibBtn.innerHTML = _calibMode ? '? Chiudi Calibrazione' : '?? Calibrazione';
      renderPages();
    };
    nav.appendChild(calibBtn);

    var expBtn = document.createElement('button'); expBtn.innerHTML = '?? Salva Coord.'; expBtn.style.cssText = 'background:#27ae60;color:#fff;border:none;padding:4px 10px;cursor:pointer;border-radius:3px;';
    expBtn.onclick = function() {
      localStorage.setItem('sium_branca_coords_v2', JSON.stringify(coordsObj));
      alert('Coordinate salvate nel browser per Brancalonia!');
    };
    nav.appendChild(expBtn);
  }
  wrap.appendChild(nav);

  // SCROLL CONTAINER
  var scrollArea = document.createElement('div');
  scrollArea.style.cssText = 'flex:1;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;align-items:center;padding:20px;gap:20px;';
  
  var scale = 1;
  scrollArea.addEventListener('wheel', function(e) {
    if(e.ctrlKey || e.metaKey) {
      e.preventDefault();
      var delta = e.deltaY > 0 ? -0.05 : 0.05;
      scale = Math.max(0.3, Math.min(scale + delta, 3.0));
      updateScale();
    }
  }, {passive:false});

  var pagesWrap = document.createElement('div');
  pagesWrap.style.cssText = 'display:flex;flex-direction:column;gap:30px;transform-origin:top center;transition:transform 0.1s ease-out;';
  function updateScale() { pagesWrap.style.transform = 'scale(' + scale + ')'; }

  function createField(pageKey, fieldKey, fieldDef) {
    var el = document.createElement(fieldDef.type === 'a' ? 'textarea' : 'input');
    if(fieldDef.type !== 'a') el.type = fieldDef.type === 'n' ? 'number' : (fieldDef.type === 'c' ? 'checkbox' : 'text');
    
    // Stile base
    el.style.position = 'absolute';
    el.style.top = fieldDef.t + '%';
    el.style.left = fieldDef.l + '%';
    el.style.width = fieldDef.w + '%';
    el.style.height = fieldDef.h + '%';
    el.style.zIndex = '10';
    
    if(fieldDef.type === 'c') {
      // Logic pallini custom
      el = document.createElement('div');
      el.style.position = 'absolute'; el.style.top = fieldDef.t+'%'; el.style.left = fieldDef.l+'%'; el.style.width = fieldDef.w+'%'; el.style.height = fieldDef.h+'%'; el.style.zIndex='10';
      el.style.borderRadius = '50%';
      el.style.cursor = _dm ? 'default' : 'pointer';
      
      var isChecked = scheda[fieldKey];
      if(_calibMode) {
        el.style.border = '2px solid red';
        el.style.background = 'rgba(255,0,0,0.3)';
      } else {
        el.style.border = 'none';
        el.style.background = isChecked ? '#111' : 'transparent';
      }

      if(!_dm && !_calibMode) {
        el.onclick = function() {
          scheda[fieldKey] = !scheda[fieldKey];
          el.style.background = scheda[fieldKey] ? '#111' : 'transparent';
          save();
        };
      }
    } else {
      // Logic input/textarea
      if(fieldDef.type === 'a') el.style.resize = 'none';
      el.value = scheda[fieldKey] || '';
      el.readOnly = _dm;
      
      if(_calibMode) {
        el.style.background = 'rgba(255,0,0,0.2)';
        el.style.border = '1px dashed red';
        el.style.color = '#fff';
      } else {
        el.style.background = 'transparent';
        el.style.border = 'none';
        el.style.outline = 'none';
        el.style.color = '#111';
        el.style.fontFamily = '"Nunito", Arial, sans-serif';
        el.style.fontSize = '14px';
        if(fieldDef.type === 'a') {
           el.style.lineHeight = '1.3';
           el.style.overflowY = 'auto'; // Mostra scroll se eccede, ma niente bordi
        } else if (fieldDef.type === 'n') {
           el.style.textAlign = 'center';
           el.style.fontWeight = 'bold';
           el.style.fontSize = '18px';
        }
      }

      el.oninput = function() {
        scheda[fieldKey] = (fieldDef.type === 'n' ? Number(el.value) : el.value);
        save();
      };
    }

    if(_calibMode) {
      // DRAG & RESIZE LOGIC IN PERCENTAGE
      var isDragging = false, isResizing = false;
      var startX, startY, startW, startH, startL, startT;
      var pW, pH; // parent width/height
      
      var resizer = document.createElement('div');
      resizer.style.cssText = 'position:absolute;right:0;bottom:0;width:8px;height:8px;background:blue;cursor:se-resize;';
      if(fieldDef.type === 'c') el.appendChild(resizer); else {
          // input can't have child, so we wrap it
          var wrapEl = document.createElement('div');
          wrapEl.style.position = 'absolute'; wrapEl.style.top = el.style.top; wrapEl.style.left = el.style.left; wrapEl.style.width = el.style.width; wrapEl.style.height = el.style.height;
          el.style.top='0'; el.style.left='0'; el.style.width='100%'; el.style.height='100%';
          wrapEl.appendChild(el); wrapEl.appendChild(resizer);
          el = wrapEl;
      }
      
      resizer.onmousedown = function(e) { e.stopPropagation(); isResizing = true; pW = el.parentNode.offsetWidth; pH = el.parentNode.offsetHeight; startX = e.clientX; startY = e.clientY; startW = fieldDef.w; startH = fieldDef.h; document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp); };
      el.onmousedown = function(e) { e.stopPropagation(); isDragging = true; pW = el.parentNode.offsetWidth; pH = el.parentNode.offsetHeight; startX = e.clientX; startY = e.clientY; startL = fieldDef.l; startT = fieldDef.t; document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp); };
      
      function onMove(e) {
        if(isResizing) {
           var dx = ((e.clientX - startX)/scale) / pW * 100;
           var dy = ((e.clientY - startY)/scale) / pH * 100;
           fieldDef.w = Math.max(0.5, startW + dx); fieldDef.h = Math.max(0.5, startH + dy);
           el.style.width = fieldDef.w + '%'; el.style.height = fieldDef.h + '%';
        } else if(isDragging) {
           var dx = ((e.clientX - startX)/scale) / pW * 100;
           var dy = ((e.clientY - startY)/scale) / pH * 100;
           fieldDef.l = startL + dx; fieldDef.t = startT + dy;
           el.style.left = fieldDef.l + '%'; el.style.top = fieldDef.t + '%';
        }
      }
      function onUp() { isDragging=false; isResizing=false; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); }
    }

    return el;
  }

  function renderPages() {
    pagesWrap.innerHTML = '';
    
    // Page 1
    var p1 = document.createElement('div');
    p1.style.cssText = 'width:1050px;aspect-ratio:1/1.414;background:url(schede/branca_p1.jpg) center/contain no-repeat;position:relative;box-shadow:0 0 15px rgba(0,0,0,0.5);';
    Object.keys(coordsObj.p1).forEach(function(k) { p1.appendChild(createField('p1', k, coordsObj.p1[k])); });
    pagesWrap.appendChild(p1);

    // Page 2
    var p2 = document.createElement('div');
    p2.style.cssText = 'width:1050px;aspect-ratio:1/1.414;background:url(schede/branca_p2.jpg) center/contain no-repeat;position:relative;box-shadow:0 0 15px rgba(0,0,0,0.5);';
    Object.keys(coordsObj.p2).forEach(function(k) { p2.appendChild(createField('p2', k, coordsObj.p2[k])); });
    pagesWrap.appendChild(p2);
  }

  renderPages();
  scrollArea.appendChild(pagesWrap);
  wrap.appendChild(scrollArea);
  
  return wrap;
};
