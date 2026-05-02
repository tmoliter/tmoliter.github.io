// ── ADJECTIVE DRILL (English → Japanese) ──
let adjDeck = [];
let adjIdx = 0;
let adjStarredOnly = false;
let adjHideMastered = false;

function initAdjectives() {
  adjDeck = [...adjectiveSentences];
  shuffleArray(adjDeck);
  applyAdjFilter();
}

function applyAdjFilter() {
  if (adjStarredOnly) {
    const starred = getStarred();
    adjDeck = adjDeck.filter(s => starred[adjKey(s)]);
  }
  if (adjHideMastered) {
    const mastered = getMastered();
    adjDeck = adjDeck.filter(s => !mastered[adjKey(s)]);
  }
  adjIdx = 0;
  if (adjDeck.length > 0) loadAdjCard();
  else {
    document.getElementById('adj-english').textContent = 'No sentences match filters';
    document.getElementById('adj-japanese').classList.remove('show');
    document.getElementById('adj-hint').style.display = 'none';
    document.getElementById('adj-counter').textContent = '0 / 0';
  }
}

function loadAdjCard() {
  const s = adjDeck[adjIdx];
  document.getElementById('adj-english').textContent = s[1];
  document.getElementById('adj-japanese-text').textContent = s[2];
  document.getElementById('adj-japanese').classList.remove('show');
  document.getElementById('adj-hint').style.display = '';
  document.getElementById('adj-hint').textContent = 'Tap to reveal';
  document.getElementById('adj-counter').textContent = (adjIdx + 1) + ' / ' + adjDeck.length;

  const starred = getStarred();
  const starBtn = document.getElementById('adj-star');
  const isStarred = starred[adjKey(s)];
  starBtn.textContent = isStarred ? '★' : '☆';
  starBtn.classList.toggle('starred', !!isStarred);

  const mastered = getMastered();
  const masteredBtn = document.getElementById('adj-mastered');
  const isMastered = mastered[adjKey(s)];
  masteredBtn.textContent = isMastered ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!isMastered);
}

function flipAdjCard() {
  if (adjDeck.length === 0) return;
  document.getElementById('adj-japanese').classList.add('show');
  document.getElementById('adj-hint').style.display = 'none';
}

function nextAdjCard() {
  if (adjDeck.length === 0) return;
  adjIdx = (adjIdx + 1) % adjDeck.length;
  loadAdjCard();
}

function prevAdjCard() {
  if (adjDeck.length === 0) return;
  adjIdx = (adjIdx - 1 + adjDeck.length) % adjDeck.length;
  loadAdjCard();
}

function shuffleAdj() {
  shuffleArray(adjDeck);
  adjIdx = 0;
  if (adjDeck.length > 0) loadAdjCard();
}

function toggleAdjStar(e) {
  e.stopPropagation();
  if (adjDeck.length === 0) return;
  const s = adjDeck[adjIdx];
  const starred = getStarred();
  const k = adjKey(s);
  if (starred[k]) delete starred[k]; else starred[k] = 1;
  setStarred(starred);
  const starBtn = document.getElementById('adj-star');
  starBtn.textContent = starred[k] ? '★' : '☆';
  starBtn.classList.toggle('starred', !!starred[k]);
  nextAdjCard();
}

function toggleAdjFilter() {
  adjStarredOnly = !adjStarredOnly;
  document.getElementById('adj-filter-btn').textContent = adjStarredOnly ? '★ Priority Only' : 'Show All';
  document.getElementById('adj-filter-btn').classList.toggle('active', adjStarredOnly);
  adjDeck = [...adjectiveSentences];
  shuffleArray(adjDeck);
  applyAdjFilter();
}

function toggleAdjMastered(e) {
  e.stopPropagation();
  if (adjDeck.length === 0) return;
  const s = adjDeck[adjIdx];
  const mastered = getMastered();
  const k = adjKey(s);
  if (mastered[k]) delete mastered[k]; else mastered[k] = 1;
  setMastered(mastered);
  const masteredBtn = document.getElementById('adj-mastered');
  masteredBtn.textContent = mastered[k] ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!mastered[k]);
  nextAdjCard();
}

function toggleAdjHideMastered() {
  adjHideMastered = !adjHideMastered;
  document.getElementById('adj-hide-mastered-btn').textContent = adjHideMastered ? '✓ Hide Mastered' : 'Hide Mastered';
  document.getElementById('adj-hide-mastered-btn').classList.toggle('active', adjHideMastered);
  adjDeck = [...adjectiveSentences];
  shuffleArray(adjDeck);
  applyAdjFilter();
}

function clearAdjMarks() {
  if (!confirm('Clear all starred and mastered Adjective Drill sentences?')) return;
  clearMarks(k => k.startsWith('adj_'));
  adjDeck = [...adjectiveSentences];
  shuffleArray(adjDeck);
  applyAdjFilter();
}

function adjKey(s) {
  return 'adj_' + s[0];
}
