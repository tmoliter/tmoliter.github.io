// ── READING PRACTICE (signs, menus, instructions) ──
let readingDeck = [];
let readingIdx = 0;
let readingStarredOnly = false;
let readingHideMastered = false;

function initReading() {
  readingDeck = [...readingPractice];
  shuffleArray(readingDeck);
  applyReadingFilter();
}

function applyReadingFilter() {
  if (readingStarredOnly) {
    const starred = getStarred();
    readingDeck = readingDeck.filter(r => starred[readingKey(r)]);
  }
  if (readingHideMastered) {
    const mastered = getMastered();
    readingDeck = readingDeck.filter(r => !mastered[readingKey(r)]);
  }
  readingIdx = 0;
  if (readingDeck.length > 0) loadReadingCard();
  else {
    document.getElementById('reading-jp').textContent = '— no items match filters —';
    document.getElementById('reading-cat').textContent = '';
    document.getElementById('reading-reveal').classList.remove('show');
    document.getElementById('reading-hint').style.display = 'none';
    document.getElementById('reading-counter').textContent = '0 / 0';
  }
}

function loadReadingCard() {
  const r = readingDeck[readingIdx];
  document.getElementById('reading-jp').textContent = r.jp;
  document.getElementById('reading-cat').textContent = readingCategories[r.cat] || r.cat;

  const readEl = document.getElementById('reading-reading');
  readEl.textContent = r.reading || '';
  readEl.style.display = r.reading ? '' : 'none';

  document.getElementById('reading-en').textContent = r.en;

  const noteEl = document.getElementById('reading-note');
  noteEl.textContent = r.note || '';
  noteEl.style.display = r.note ? '' : 'none';

  document.getElementById('reading-reveal').classList.remove('show');
  document.getElementById('reading-hint').style.display = '';
  document.getElementById('reading-hint').textContent = 'Tap to reveal';
  document.getElementById('reading-counter').textContent = (readingIdx + 1) + ' / ' + readingDeck.length;

  const starred = getStarred();
  const starBtn = document.getElementById('reading-star');
  const isStarred = starred[readingKey(r)];
  starBtn.textContent = isStarred ? '★' : '☆';
  starBtn.classList.toggle('starred', !!isStarred);

  const mastered = getMastered();
  const masteredBtn = document.getElementById('reading-mastered');
  const isMastered = mastered[readingKey(r)];
  masteredBtn.textContent = isMastered ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!isMastered);
}

function flipReading() {
  if (!readingDeck.length) return;
  document.getElementById('reading-reveal').classList.add('show');
  document.getElementById('reading-hint').style.display = 'none';
}

function nextReading() {
  if (!readingDeck.length) return;
  readingIdx = (readingIdx + 1) % readingDeck.length;
  loadReadingCard();
}

function prevReading() {
  if (!readingDeck.length) return;
  readingIdx = (readingIdx - 1 + readingDeck.length) % readingDeck.length;
  loadReadingCard();
}

function shuffleReading() {
  shuffleArray(readingDeck);
  readingIdx = 0;
  if (readingDeck.length) loadReadingCard();
}

function toggleReadingStar(e) {
  e.stopPropagation();
  if (!readingDeck.length) return;
  const r = readingDeck[readingIdx];
  const starred = getStarred();
  const k = readingKey(r);
  if (starred[k]) delete starred[k]; else starred[k] = 1;
  setStarred(starred);
  const starBtn = document.getElementById('reading-star');
  starBtn.textContent = starred[k] ? '★' : '☆';
  starBtn.classList.toggle('starred', !!starred[k]);
  nextReading();
}

function toggleReadingMastered(e) {
  e.stopPropagation();
  if (!readingDeck.length) return;
  const r = readingDeck[readingIdx];
  const mastered = getMastered();
  const k = readingKey(r);
  if (mastered[k]) delete mastered[k]; else mastered[k] = 1;
  setMastered(mastered);
  const masteredBtn = document.getElementById('reading-mastered');
  masteredBtn.textContent = mastered[k] ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!mastered[k]);
  nextReading();
}

function toggleReadingFilter() {
  readingStarredOnly = !readingStarredOnly;
  document.getElementById('reading-filter-btn').textContent = readingStarredOnly ? '★ Priority Only' : 'Show All';
  document.getElementById('reading-filter-btn').classList.toggle('active', readingStarredOnly);
  readingDeck = [...readingPractice];
  shuffleArray(readingDeck);
  applyReadingFilter();
}

function toggleReadingHideMastered() {
  readingHideMastered = !readingHideMastered;
  document.getElementById('reading-hide-mastered-btn').textContent = readingHideMastered ? '✓ Hide Mastered' : 'Hide Mastered';
  document.getElementById('reading-hide-mastered-btn').classList.toggle('active', readingHideMastered);
  readingDeck = [...readingPractice];
  shuffleArray(readingDeck);
  applyReadingFilter();
}

function clearReadingMarks() {
  if (!confirm('Clear all starred and mastered reading items?')) return;
  clearMarks(k => k.startsWith('read_'));
  readingDeck = [...readingPractice];
  shuffleArray(readingDeck);
  applyReadingFilter();
}

function readingKey(r) { return 'read_' + r.id; }
