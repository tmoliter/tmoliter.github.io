// ── ANKI E2J EXPORT (English → vocab + Japanese + notes) ──
let e2jnDeck = [];
let e2jnIdx = 0;
let e2jnStarredOnly = false;
let e2jnHideMastered = false;

function initE2JNotes() {
  e2jnDeck = [...e2jNotes];
  shuffleArray(e2jnDeck);
  applyE2JNFilter();
}

function applyE2JNFilter() {
  if (e2jnStarredOnly) {
    const starred = getStarred();
    e2jnDeck = e2jnDeck.filter(s => starred[e2jnKey(s)]);
  }
  if (e2jnHideMastered) {
    const mastered = getMastered();
    e2jnDeck = e2jnDeck.filter(s => !mastered[e2jnKey(s)]);
  }
  e2jnIdx = 0;
  if (e2jnDeck.length > 0) loadE2JNCard();
  else {
    document.getElementById('e2jn-english').textContent = 'No entries match filters';
    document.getElementById('e2jn-japanese').classList.remove('show');
    document.getElementById('e2jn-hint').style.display = 'none';
    document.getElementById('e2jn-counter').textContent = '0 / 0';
  }
}

function loadE2JNCard() {
  const s = e2jnDeck[e2jnIdx];
  document.getElementById('e2jn-english').textContent = s[1];

  const vocabEl = document.getElementById('e2jn-vocab');
  vocabEl.textContent = s[2];
  vocabEl.style.display = s[2] ? '' : 'none';

  document.getElementById('e2jn-japanese-text').textContent = s[3];

  const notesEl = document.getElementById('e2jn-notes');
  notesEl.textContent = s[4];
  notesEl.style.display = s[4] ? '' : 'none';

  document.getElementById('e2jn-japanese').classList.remove('show');
  document.getElementById('e2jn-hint').style.display = '';
  document.getElementById('e2jn-hint').textContent = 'Tap to reveal';
  document.getElementById('e2jn-counter').textContent = (e2jnIdx + 1) + ' / ' + e2jnDeck.length;

  const starred = getStarred();
  const starBtn = document.getElementById('e2jn-star');
  const isStarred = starred[e2jnKey(s)];
  starBtn.textContent = isStarred ? '★' : '☆';
  starBtn.classList.toggle('starred', !!isStarred);

  const mastered = getMastered();
  const masteredBtn = document.getElementById('e2jn-mastered');
  const isMastered = mastered[e2jnKey(s)];
  masteredBtn.textContent = isMastered ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!isMastered);
}

function flipE2JNCard() {
  if (e2jnDeck.length === 0) return;
  document.getElementById('e2jn-japanese').classList.add('show');
  document.getElementById('e2jn-hint').style.display = 'none';
}

function nextE2JNCard() {
  if (e2jnDeck.length === 0) return;
  e2jnIdx = (e2jnIdx + 1) % e2jnDeck.length;
  loadE2JNCard();
}

function prevE2JNCard() {
  if (e2jnDeck.length === 0) return;
  e2jnIdx = (e2jnIdx - 1 + e2jnDeck.length) % e2jnDeck.length;
  loadE2JNCard();
}

function shuffleE2JN() {
  shuffleArray(e2jnDeck);
  e2jnIdx = 0;
  if (e2jnDeck.length > 0) loadE2JNCard();
}

function toggleE2JNStar(e) {
  e.stopPropagation();
  if (e2jnDeck.length === 0) return;
  const s = e2jnDeck[e2jnIdx];
  const starred = getStarred();
  const k = e2jnKey(s);
  if (starred[k]) delete starred[k]; else starred[k] = 1;
  setStarred(starred);
  const starBtn = document.getElementById('e2jn-star');
  starBtn.textContent = starred[k] ? '★' : '☆';
  starBtn.classList.toggle('starred', !!starred[k]);
  nextE2JNCard();
}

function toggleE2JNFilter() {
  e2jnStarredOnly = !e2jnStarredOnly;
  document.getElementById('e2jn-filter-btn').textContent = e2jnStarredOnly ? '★ Priority Only' : 'Show All';
  document.getElementById('e2jn-filter-btn').classList.toggle('active', e2jnStarredOnly);
  e2jnDeck = [...e2jNotes];
  shuffleArray(e2jnDeck);
  applyE2JNFilter();
}

function toggleE2JNMastered(e) {
  e.stopPropagation();
  if (e2jnDeck.length === 0) return;
  const s = e2jnDeck[e2jnIdx];
  const mastered = getMastered();
  const k = e2jnKey(s);
  if (mastered[k]) delete mastered[k]; else mastered[k] = 1;
  setMastered(mastered);
  const masteredBtn = document.getElementById('e2jn-mastered');
  masteredBtn.textContent = mastered[k] ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!mastered[k]);
  nextE2JNCard();
}

function toggleE2JNHideMastered() {
  e2jnHideMastered = !e2jnHideMastered;
  document.getElementById('e2jn-hide-mastered-btn').textContent = e2jnHideMastered ? '✓ Hide Mastered' : 'Hide Mastered';
  document.getElementById('e2jn-hide-mastered-btn').classList.toggle('active', e2jnHideMastered);
  e2jnDeck = [...e2jNotes];
  shuffleArray(e2jnDeck);
  applyE2JNFilter();
}

function clearE2JNMarks() {
  if (!confirm('Clear all starred and mastered Anki E2J entries?')) return;
  clearMarks(k => k.startsWith('e2jn_'));
  e2jnDeck = [...e2jNotes];
  shuffleArray(e2jnDeck);
  applyE2JNFilter();
}

function e2jnKey(s) {
  return 'e2jn_' + s[0];
}
