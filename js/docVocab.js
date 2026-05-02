// ── DOC VOCAB (English → Kanji + Reading) ──
let docDeck = [];
let docIdx = 0;
let docStarredOnly = false;
let docHideMastered = false;

function initDocVocab() {
  docDeck = [...docVocabSentences];
  shuffleArray(docDeck);
  applyDocFilter();
}

function applyDocFilter() {
  if (docStarredOnly) {
    const starred = getStarred();
    docDeck = docDeck.filter(s => starred[docKey(s)]);
  }
  if (docHideMastered) {
    const mastered = getMastered();
    docDeck = docDeck.filter(s => !mastered[docKey(s)]);
  }
  docIdx = 0;
  if (docDeck.length > 0) loadDocCard();
  else {
    document.getElementById('doc-english').textContent = 'No cards match filters';
    document.getElementById('doc-japanese').classList.remove('show');
    document.getElementById('doc-hint').style.display = 'none';
    document.getElementById('doc-counter').textContent = '0 / 0';
  }
}

function loadDocCard() {
  const s = docDeck[docIdx];
  document.getElementById('doc-english').textContent = s[1];
  document.getElementById('doc-kanji').textContent = s[2];
  const readingEl = document.getElementById('doc-reading');
  readingEl.textContent = s[3] || '';
  readingEl.style.display = s[3] ? '' : 'none';
  document.getElementById('doc-japanese').classList.remove('show');
  document.getElementById('doc-hint').style.display = '';
  document.getElementById('doc-hint').textContent = 'Tap to reveal';
  document.getElementById('doc-counter').textContent = (docIdx + 1) + ' / ' + docDeck.length;

  const starred = getStarred();
  const starBtn = document.getElementById('doc-star');
  const isStarred = starred[docKey(s)];
  starBtn.textContent = isStarred ? '★' : '☆';
  starBtn.classList.toggle('starred', !!isStarred);

  const mastered = getMastered();
  const masteredBtn = document.getElementById('doc-mastered');
  const isMastered = mastered[docKey(s)];
  masteredBtn.textContent = isMastered ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!isMastered);
}

function flipDocCard() {
  if (docDeck.length === 0) return;
  document.getElementById('doc-japanese').classList.add('show');
  document.getElementById('doc-hint').style.display = 'none';
}

function nextDocCard() {
  if (docDeck.length === 0) return;
  docIdx = (docIdx + 1) % docDeck.length;
  loadDocCard();
}

function prevDocCard() {
  if (docDeck.length === 0) return;
  docIdx = (docIdx - 1 + docDeck.length) % docDeck.length;
  loadDocCard();
}

function shuffleDoc() {
  shuffleArray(docDeck);
  docIdx = 0;
  if (docDeck.length > 0) loadDocCard();
}

function toggleDocStar(e) {
  e.stopPropagation();
  if (docDeck.length === 0) return;
  const s = docDeck[docIdx];
  const starred = getStarred();
  const k = docKey(s);
  if (starred[k]) delete starred[k]; else starred[k] = 1;
  setStarred(starred);
  const starBtn = document.getElementById('doc-star');
  starBtn.textContent = starred[k] ? '★' : '☆';
  starBtn.classList.toggle('starred', !!starred[k]);
  nextDocCard();
}

function toggleDocFilter() {
  docStarredOnly = !docStarredOnly;
  document.getElementById('doc-filter-btn').textContent = docStarredOnly ? '★ Priority Only' : 'Show All';
  document.getElementById('doc-filter-btn').classList.toggle('active', docStarredOnly);
  docDeck = [...docVocabSentences];
  shuffleArray(docDeck);
  applyDocFilter();
}

function toggleDocMastered(e) {
  e.stopPropagation();
  if (docDeck.length === 0) return;
  const s = docDeck[docIdx];
  const mastered = getMastered();
  const k = docKey(s);
  if (mastered[k]) delete mastered[k]; else mastered[k] = 1;
  setMastered(mastered);
  const masteredBtn = document.getElementById('doc-mastered');
  masteredBtn.textContent = mastered[k] ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!mastered[k]);
  nextDocCard();
}

function toggleDocHideMastered() {
  docHideMastered = !docHideMastered;
  document.getElementById('doc-hide-mastered-btn').textContent = docHideMastered ? '✓ Hide Mastered' : 'Hide Mastered';
  document.getElementById('doc-hide-mastered-btn').classList.toggle('active', docHideMastered);
  docDeck = [...docVocabSentences];
  shuffleArray(docDeck);
  applyDocFilter();
}

function clearDocMarks() {
  if (!confirm('Clear all starred and mastered Doc Vocab cards?')) return;
  clearMarks(k => k.startsWith('doc_'));
  docDeck = [...docVocabSentences];
  shuffleArray(docDeck);
  applyDocFilter();
}

function docKey(s) {
  return 'doc_' + s[0];
}
