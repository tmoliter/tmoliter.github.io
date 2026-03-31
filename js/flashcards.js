// ── FLASHCARD MODE ──
let fcDeck = [];
let fcIdx = 0;
let fcStarredOnly = false;

function initFlashcards() {
  fcDeck = [...verbs];
  shuffleArray(fcDeck);
  applyFCFilter();
}

function applyFCFilter() {
  if (fcStarredOnly) {
    const starred = getStarred();
    fcDeck = fcDeck.filter(v => starred[verbKey(v)]);
  }
  fcIdx = 0;
  if (fcDeck.length > 0) loadCard();
  else {
    document.getElementById('fc-english').textContent = 'No starred verbs yet';
    document.getElementById('fc-japanese').classList.remove('show');
    document.getElementById('fc-hint').style.display = 'none';
    document.getElementById('fc-counter').textContent = '0 / 0';
  }
}

function loadCard() {
  const v = fcDeck[fcIdx];
  document.getElementById('fc-english').textContent = v[2];
  document.getElementById('fc-kanji').textContent = v[0];
  document.getElementById('fc-reading').textContent = v[1];
  document.getElementById('fc-japanese').classList.remove('show');
  document.getElementById('fc-hint').style.display = '';
  document.getElementById('fc-hint').textContent = 'Tap to reveal';
  document.getElementById('fc-counter').textContent = (fcIdx + 1) + ' / ' + fcDeck.length;
  const starred = getStarred();
  const starBtn = document.getElementById('fc-star');
  const isStarred = starred[verbKey(v)];
  starBtn.textContent = isStarred ? '★' : '☆';
  starBtn.classList.toggle('starred', !!isStarred);
}

function flipCard() {
  if (fcDeck.length === 0) return;
  document.getElementById('fc-japanese').classList.add('show');
  document.getElementById('fc-hint').style.display = 'none';
}

function nextCard() {
  if (fcDeck.length === 0) return;
  fcIdx = (fcIdx + 1) % fcDeck.length;
  loadCard();
}

function prevCard() {
  if (fcDeck.length === 0) return;
  fcIdx = (fcIdx - 1 + fcDeck.length) % fcDeck.length;
  loadCard();
}

function shuffleFC() {
  shuffleArray(fcDeck);
  fcIdx = 0;
  if (fcDeck.length > 0) loadCard();
}

function toggleFCStar(e) {
  e.stopPropagation();
  if (fcDeck.length === 0) return;
  const v = fcDeck[fcIdx];
  const s = getStarred();
  const k = verbKey(v);
  if (s[k]) delete s[k]; else s[k] = 1;
  setStarred(s);
  const starBtn = document.getElementById('fc-star');
  starBtn.textContent = s[k] ? '★' : '☆';
  starBtn.classList.toggle('starred', !!s[k]);
}

function toggleFCFilter() {
  fcStarredOnly = !fcStarredOnly;
  document.getElementById('fc-filter-btn').textContent = fcStarredOnly ? '★ Priority Only' : 'Show All';
  document.getElementById('fc-filter-btn').classList.toggle('active', fcStarredOnly);
  fcDeck = [...verbs];
  shuffleArray(fcDeck);
  applyFCFilter();
}
