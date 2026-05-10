// ── ROAD SIGNS (Cards + List sub-modes) ──
let rsDeck = [];
let rsIdx = 0;
let rsListArr = [];
let rsStarredOnly = false;
let rsHideMastered = false;
let rsCatFilter = 'all'; // 'all' | 'sign' | 'marking'
let rsMode = 'cards';

function initRoadSigns() {
  rsDeck = filterByCat([...roadSignsData]);
  shuffleArray(rsDeck);
  rsListArr = filterByCat([...roadSignsData]);
  applyRSFilter();
  rsSetMode(rsMode);
}

function rsSetMode(mode) {
  rsMode = mode;
  document.querySelectorAll('#roadsigns [data-rsmode]').forEach(el => {
    if (el.classList.contains('drill-tab')) {
      el.classList.toggle('active', el.dataset.rsmode === mode);
    } else {
      el.style.display = (el.dataset.rsmode === mode) ? '' : 'none';
    }
  });
  if (mode === 'list') renderRSList();
}

function filterByCat(arr) {
  if (rsCatFilter === 'all') return arr;
  return arr.filter(s => s.cat === rsCatFilter);
}

function applyRSFilter() {
  if (rsStarredOnly) {
    const starred = getStarred();
    rsDeck = rsDeck.filter(s => starred[rsKey(s)]);
  }
  if (rsHideMastered) {
    const mastered = getMastered();
    rsDeck = rsDeck.filter(s => !mastered[rsKey(s)]);
  }
  rsIdx = 0;
  if (rsDeck.length > 0) loadRSCard();
  else {
    document.getElementById('rs-img').removeAttribute('src');
    document.getElementById('rs-img').alt = '';
    document.getElementById('rs-code').textContent = '';
    document.getElementById('rs-counter').textContent = '0 / 0';
    document.getElementById('rs-jp').textContent = 'No cards match filters';
    document.getElementById('rs-en').textContent = '';
    hideRSReveals();
  }
}

function loadRSCard() {
  const s = rsDeck[rsIdx];
  const img = document.getElementById('rs-img');
  img.src = 'images/road_signs/' + encodeURIComponent(s.img);
  img.alt = s.en;
  document.getElementById('rs-code').textContent = s.code ? '#' + s.code : (s.cat === 'marking' ? 'road marking' : '');
  document.getElementById('rs-jp').textContent = s.jp;
  document.getElementById('rs-en').textContent = s.en;
  document.getElementById('rs-counter').textContent = (rsIdx + 1) + ' / ' + rsDeck.length;
  hideRSReveals();

  const starred = getStarred();
  const starBtn = document.getElementById('rs-star');
  const isStarred = starred[rsKey(s)];
  starBtn.textContent = isStarred ? '★' : '☆';
  starBtn.classList.toggle('starred', !!isStarred);

  const mastered = getMastered();
  const masteredBtn = document.getElementById('rs-mastered');
  const isMastered = mastered[rsKey(s)];
  masteredBtn.textContent = isMastered ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!isMastered);
}

function hideRSReveals() {
  document.getElementById('rs-jp-content').classList.remove('show');
  document.getElementById('rs-en-content').classList.remove('show');
}

function revealRSJp() {
  document.getElementById('rs-jp-content').classList.toggle('show');
}

function revealRSEn() {
  document.getElementById('rs-en-content').classList.toggle('show');
}

function nextRSCard() {
  if (rsDeck.length === 0) return;
  rsIdx = (rsIdx + 1) % rsDeck.length;
  loadRSCard();
}

function prevRSCard() {
  if (rsDeck.length === 0) return;
  rsIdx = (rsIdx - 1 + rsDeck.length) % rsDeck.length;
  loadRSCard();
}

function shuffleRS() {
  shuffleArray(rsDeck);
  rsIdx = 0;
  if (rsDeck.length > 0) loadRSCard();
}

function shuffleRSList() {
  shuffleArray(rsListArr);
  renderRSList();
}

function toggleRSStar(e) {
  e.stopPropagation();
  if (rsDeck.length === 0) return;
  const s = rsDeck[rsIdx];
  const starred = getStarred();
  const k = rsKey(s);
  if (starred[k]) delete starred[k]; else starred[k] = 1;
  setStarred(starred);
  const starBtn = document.getElementById('rs-star');
  starBtn.textContent = starred[k] ? '★' : '☆';
  starBtn.classList.toggle('starred', !!starred[k]);
  nextRSCard();
}

function rsListToggleStar(id, e) {
  e.stopPropagation();
  const starred = getStarred();
  const k = 'rs_' + id;
  if (starred[k]) delete starred[k]; else starred[k] = 1;
  setStarred(starred);
  renderRSList();
}

function rsListToggleMastered(id, e) {
  e.stopPropagation();
  const mastered = getMastered();
  const k = 'rs_' + id;
  if (mastered[k]) delete mastered[k]; else mastered[k] = 1;
  setMastered(mastered);
  renderRSList();
}

function updateRSFilterButtonsUI() {
  document.querySelectorAll('.rs-filter-btn').forEach(b => {
    b.textContent = rsStarredOnly ? '★ Priority Only' : 'Show All';
    b.classList.toggle('active', rsStarredOnly);
  });
  document.querySelectorAll('.rs-hide-mastered-btn').forEach(b => {
    b.textContent = rsHideMastered ? '✓ Hide Mastered' : 'Hide Mastered';
    b.classList.toggle('active', rsHideMastered);
  });
}

function toggleRSFilter() {
  rsStarredOnly = !rsStarredOnly;
  updateRSFilterButtonsUI();
  rsDeck = filterByCat([...roadSignsData]);
  shuffleArray(rsDeck);
  applyRSFilter();
  if (rsMode === 'list') renderRSList();
}

function toggleRSMastered(e) {
  e.stopPropagation();
  if (rsDeck.length === 0) return;
  const s = rsDeck[rsIdx];
  const mastered = getMastered();
  const k = rsKey(s);
  if (mastered[k]) delete mastered[k]; else mastered[k] = 1;
  setMastered(mastered);
  const masteredBtn = document.getElementById('rs-mastered');
  masteredBtn.textContent = mastered[k] ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!mastered[k]);
  nextRSCard();
}

function toggleRSHideMastered() {
  rsHideMastered = !rsHideMastered;
  updateRSFilterButtonsUI();
  rsDeck = filterByCat([...roadSignsData]);
  shuffleArray(rsDeck);
  applyRSFilter();
  if (rsMode === 'list') renderRSList();
}

function setRSCat(cat) {
  rsCatFilter = cat;
  document.querySelectorAll('.rs-cat-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
  rsDeck = filterByCat([...roadSignsData]);
  shuffleArray(rsDeck);
  applyRSFilter();
  rsListArr = filterByCat([...roadSignsData]);
  if (rsMode === 'list') renderRSList();
}

function clearRSMarks() {
  if (!confirm('Clear all starred and mastered Road Sign cards?')) return;
  clearMarks(k => k.startsWith('rs_'));
  rsDeck = filterByCat([...roadSignsData]);
  shuffleArray(rsDeck);
  applyRSFilter();
  if (rsMode === 'list') renderRSList();
}

function rsKey(s) {
  return 'rs_' + s.id;
}

function renderRSList() {
  const list = document.getElementById('rs-list');
  const starred = getStarred();
  const mastered = getMastered();
  let display = rsStarredOnly ? rsListArr.filter(s => starred[rsKey(s)]) : rsListArr;
  if (rsHideMastered) display = display.filter(s => !mastered[rsKey(s)]);
  document.getElementById('rs-list-counter').textContent = display.length + ' signs';
  list.innerHTML = display.map(s => {
    const isStarred = !!starred[rsKey(s)];
    const isMastered = !!mastered[rsKey(s)];
    const codeText = s.code ? '#' + s.code : (s.cat === 'marking' ? 'road marking' : '');
    const imgUrl = 'images/road_signs/' + encodeURIComponent(s.img);
    const jp = s.jp ? `<div class="rs-list-jp">${escapeHTML(s.jp)}</div>` : '';
    const en = s.en ? `<div class="rs-list-en">${escapeHTML(s.en)}</div>` : '';
    return `
    <div class="rs-list-card" onclick="this.querySelector('.rs-list-en')?.classList.toggle('show')">
      <button class="star-btn${isStarred ? ' starred' : ''}" onclick="rsListToggleStar(${s.id}, event)">${isStarred ? '★' : '☆'}</button>
      <button class="mastered-btn${isMastered ? ' mastered' : ''}" onclick="rsListToggleMastered(${s.id}, event)">${isMastered ? '✓' : '○'}</button>
      <div class="rs-list-img-wrap"><img class="rs-list-img" src="${imgUrl}" alt="${escapeHTML(s.en)}"></div>
      <div class="rs-list-code">${escapeHTML(codeText)}</div>
      ${jp}
      ${en}
    </div>`;
  }).join('');
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
