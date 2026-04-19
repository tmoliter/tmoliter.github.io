// ── ENGLISH → JAPANESE SENTENCES ──
let e2jDeck = [];
let e2jIdx = 0;
let e2jStarredOnly = false;
let e2jHideMastered = false;

function initE2JSentences() {
  e2jDeck = [...e2jSentences];
  shuffleArray(e2jDeck);
  applyE2JFilter();
}

function applyE2JFilter() {
  if (e2jStarredOnly) {
    const starred = getStarred();
    e2jDeck = e2jDeck.filter(s => starred[e2jKey(s)]);
  }
  if (e2jHideMastered) {
    const mastered = getMastered();
    e2jDeck = e2jDeck.filter(s => !mastered[e2jKey(s)]);
  }
  e2jIdx = 0;
  if (e2jDeck.length > 0) loadE2JCard();
  else {
    document.getElementById('e2j-english').textContent = 'No sentences match filters';
    document.getElementById('e2j-japanese').classList.remove('show');
    document.getElementById('e2j-hint').style.display = 'none';
    document.getElementById('e2j-counter').textContent = '0 / 0';
  }
}

function loadE2JCard() {
  const s = e2jDeck[e2jIdx];
  document.getElementById('e2j-english').textContent = s[1];
  document.getElementById('e2j-japanese-text').textContent = s[2];
  document.getElementById('e2j-japanese').classList.remove('show');
  document.getElementById('e2j-hint').style.display = '';
  document.getElementById('e2j-hint').textContent = 'Tap to reveal';
  document.getElementById('e2j-counter').textContent = (e2jIdx + 1) + ' / ' + e2jDeck.length;
  
  const starred = getStarred();
  const starBtn = document.getElementById('e2j-star');
  const isStarred = starred[e2jKey(s)];
  starBtn.textContent = isStarred ? '★' : '☆';
  starBtn.classList.toggle('starred', !!isStarred);
  
  const mastered = getMastered();
  const masteredBtn = document.getElementById('e2j-mastered');
  const isMastered = mastered[e2jKey(s)];
  masteredBtn.textContent = isMastered ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!isMastered);
}

function flipE2JCard() {
  if (e2jDeck.length === 0) return;
  document.getElementById('e2j-japanese').classList.add('show');
  document.getElementById('e2j-hint').style.display = 'none';
}

function nextE2JCard() {
  if (e2jDeck.length === 0) return;
  e2jIdx = (e2jIdx + 1) % e2jDeck.length;
  loadE2JCard();
}

function prevE2JCard() {
  if (e2jDeck.length === 0) return;
  e2jIdx = (e2jIdx - 1 + e2jDeck.length) % e2jDeck.length;
  loadE2JCard();
}

function shuffleE2J() {
  shuffleArray(e2jDeck);
  e2jIdx = 0;
  if (e2jDeck.length > 0) loadE2JCard();
}

function toggleE2JStar(e) {
  e.stopPropagation();
  if (e2jDeck.length === 0) return;
  const s = e2jDeck[e2jIdx];
  const starred = getStarred();
  const k = e2jKey(s);
  if (starred[k]) delete starred[k]; else starred[k] = 1;
  setStarred(starred);
  const starBtn = document.getElementById('e2j-star');
  starBtn.textContent = starred[k] ? '★' : '☆';
  starBtn.classList.toggle('starred', !!starred[k]);
  nextE2JCard();
}

function toggleE2JFilter() {
  e2jStarredOnly = !e2jStarredOnly;
  document.getElementById('e2j-filter-btn').textContent = e2jStarredOnly ? '★ Priority Only' : 'Show All';
  document.getElementById('e2j-filter-btn').classList.toggle('active', e2jStarredOnly);
  e2jDeck = [...e2jSentences];
  shuffleArray(e2jDeck);
  applyE2JFilter();
}

function toggleE2JMastered(e) {
  e.stopPropagation();
  if (e2jDeck.length === 0) return;
  const s = e2jDeck[e2jIdx];
  const mastered = getMastered();
  const k = e2jKey(s);
  if (mastered[k]) delete mastered[k]; else mastered[k] = 1;
  setMastered(mastered);
  const masteredBtn = document.getElementById('e2j-mastered');
  masteredBtn.textContent = mastered[k] ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!mastered[k]);
  nextE2JCard();
}

function toggleE2JHideMastered() {
  e2jHideMastered = !e2jHideMastered;
  document.getElementById('e2j-hide-mastered-btn').textContent = e2jHideMastered ? '✓ Hide Mastered' : 'Hide Mastered';
  document.getElementById('e2j-hide-mastered-btn').classList.toggle('active', e2jHideMastered);
  e2jDeck = [...e2jSentences];
  shuffleArray(e2jDeck);
  applyE2JFilter();
}

function clearE2JMarks() {
  if (!confirm('Clear all starred and mastered English → Japanese sentences?')) return;
  clearMarks(k => k.startsWith('e2j_'));
  e2jDeck = [...e2jSentences];
  shuffleArray(e2jDeck);
  applyE2JFilter();
}

function e2jKey(s) {
  return 'e2j_' + s[0];
}
