// ── NAVIGATION ──
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'verbs') renderVerbs();
  if (id === 'flashcards') initFlashcards();
  if (id === 'listening') initListening();
  if (id === 'time') initTime();
  if (id === 'e2j') initE2JSentences();
  if (id === 'texp') initTimeExpressions();
}

// ── UTILITIES ──
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ── STARRED (localStorage) ──
function getStarred() {
  try { return JSON.parse(localStorage.getItem('n4_starred') || '{}'); } catch { return {}; }
}
function setStarred(obj) { localStorage.setItem('n4_starred', JSON.stringify(obj)); }
function verbKey(v) { return v[0] + '|' + v[1]; }

// ── MASTERED (localStorage) ──
function getMastered() {
  try { return JSON.parse(localStorage.getItem('n4_mastered') || '{}'); } catch { return {}; }
}
function setMastered(obj) { localStorage.setItem('n4_mastered', JSON.stringify(obj)); }
