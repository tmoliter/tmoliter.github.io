// ── TIME EXPRESSION SENTENCES (English → Japanese) ──
let texpDeck = [];
let texpIdx = 0;
let texpStarredOnly = false;
let texpHideMastered = false;

function initTimeExpressions() {
  texpDeck = [...timeExpressionSentences];
  shuffleArray(texpDeck);
  applyTexpFilter();
}

function applyTexpFilter() {
  if (texpStarredOnly) {
    const starred = getStarred();
    texpDeck = texpDeck.filter(s => starred[texpKey(s)]);
  }
  if (texpHideMastered) {
    const mastered = getMastered();
    texpDeck = texpDeck.filter(s => !mastered[texpKey(s)]);
  }
  texpIdx = 0;
  if (texpDeck.length > 0) loadTexpCard();
  else {
    document.getElementById('texp-english').textContent = 'No sentences match filters';
    document.getElementById('texp-japanese').classList.remove('show');
    document.getElementById('texp-hint').style.display = 'none';
    document.getElementById('texp-counter').textContent = '0 / 0';
  }
}

function loadTexpCard() {
  const s = texpDeck[texpIdx];
  document.getElementById('texp-english').textContent = s[1];
  document.getElementById('texp-japanese-text').textContent = s[2];
  document.getElementById('texp-japanese').classList.remove('show');
  document.getElementById('texp-hint').style.display = '';
  document.getElementById('texp-hint').textContent = 'Tap to reveal';
  document.getElementById('texp-counter').textContent = (texpIdx + 1) + ' / ' + texpDeck.length;

  const regEl = document.getElementById('texp-register');
  const reg = s[3] || 'polite';
  regEl.textContent = reg === 'casual' ? '🗣 Casual' : '🎓 Polite';
  regEl.className = 'texp-register ' + reg;

  const starred = getStarred();
  const starBtn = document.getElementById('texp-star');
  const isStarred = starred[texpKey(s)];
  starBtn.textContent = isStarred ? '★' : '☆';
  starBtn.classList.toggle('starred', !!isStarred);

  const mastered = getMastered();
  const masteredBtn = document.getElementById('texp-mastered');
  const isMastered = mastered[texpKey(s)];
  masteredBtn.textContent = isMastered ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!isMastered);
}

function flipTexpCard() {
  if (texpDeck.length === 0) return;
  document.getElementById('texp-japanese').classList.add('show');
  document.getElementById('texp-hint').style.display = 'none';
}

function nextTexpCard() {
  if (texpDeck.length === 0) return;
  texpIdx = (texpIdx + 1) % texpDeck.length;
  loadTexpCard();
}

function prevTexpCard() {
  if (texpDeck.length === 0) return;
  texpIdx = (texpIdx - 1 + texpDeck.length) % texpDeck.length;
  loadTexpCard();
}

function shuffleTexp() {
  shuffleArray(texpDeck);
  texpIdx = 0;
  if (texpDeck.length > 0) loadTexpCard();
}

function toggleTexpStar(e) {
  e.stopPropagation();
  if (texpDeck.length === 0) return;
  const s = texpDeck[texpIdx];
  const starred = getStarred();
  const k = texpKey(s);
  if (starred[k]) delete starred[k]; else starred[k] = 1;
  setStarred(starred);
  const starBtn = document.getElementById('texp-star');
  starBtn.textContent = starred[k] ? '★' : '☆';
  starBtn.classList.toggle('starred', !!starred[k]);
  nextTexpCard();
}

function toggleTexpFilter() {
  texpStarredOnly = !texpStarredOnly;
  document.getElementById('texp-filter-btn').textContent = texpStarredOnly ? '★ Priority Only' : 'Show All';
  document.getElementById('texp-filter-btn').classList.toggle('active', texpStarredOnly);
  texpDeck = [...timeExpressionSentences];
  shuffleArray(texpDeck);
  applyTexpFilter();
}

function toggleTexpMastered(e) {
  e.stopPropagation();
  if (texpDeck.length === 0) return;
  const s = texpDeck[texpIdx];
  const mastered = getMastered();
  const k = texpKey(s);
  if (mastered[k]) delete mastered[k]; else mastered[k] = 1;
  setMastered(mastered);
  const masteredBtn = document.getElementById('texp-mastered');
  masteredBtn.textContent = mastered[k] ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!mastered[k]);
  nextTexpCard();
}

function toggleTexpHideMastered() {
  texpHideMastered = !texpHideMastered;
  document.getElementById('texp-hide-mastered-btn').textContent = texpHideMastered ? '✓ Hide Mastered' : 'Hide Mastered';
  document.getElementById('texp-hide-mastered-btn').classList.toggle('active', texpHideMastered);
  texpDeck = [...timeExpressionSentences];
  shuffleArray(texpDeck);
  applyTexpFilter();
}

function texpKey(s) {
  return 'texp_' + s[0];
}
