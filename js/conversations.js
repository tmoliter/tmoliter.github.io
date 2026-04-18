// ── CONVERSATION PRACTICE (JP question → EN answer → JP answer) ──
let convDeck = [];
let convIdx = 0;
let convStarredOnly = false;
let convHideMastered = false;
let convAnsweredOnly = false;

function initConversations() {
  convDeck = [...conversations];
  shuffleArray(convDeck);
  applyConvFilter();
}

function applyConvFilter() {
  if (convStarredOnly) {
    const starred = getStarred();
    convDeck = convDeck.filter(s => starred[convKey(s)]);
  }
  if (convHideMastered) {
    const mastered = getMastered();
    convDeck = convDeck.filter(s => !mastered[convKey(s)]);
  }
  if (convAnsweredOnly) {
    const userAnswers = getUserAnswers();
    convDeck = convDeck.filter(s => userAnswers[convKey(s)]);
  }
  convIdx = 0;
  if (convDeck.length > 0) loadConvCard();
  else {
    document.getElementById('conv-question').textContent = 'No questions match filters';
    document.getElementById('conv-question-content').classList.add('show');
    document.getElementById('conv-en-content').classList.remove('show');
    document.getElementById('conv-jp-content').classList.remove('show');
    document.getElementById('conv-counter').textContent = '0 / 0';
  }
}

function loadConvCard() {
  const s = convDeck[convIdx];
  document.getElementById('conv-question').textContent = s[1];
  document.getElementById('conv-answer-en').textContent = s[2];
  document.getElementById('conv-answer-jp').textContent = s[3];
  document.getElementById('conv-question-content').classList.remove('show');
  document.getElementById('conv-en-content').classList.remove('show');
  document.getElementById('conv-user-content').classList.remove('show');
  document.getElementById('conv-jp-content').classList.remove('show');
  document.getElementById('conv-counter').textContent = (convIdx + 1) + ' / ' + convDeck.length;

  const userAnswers = getUserAnswers();
  document.getElementById('conv-user-answer').value = userAnswers[convKey(s)] || '';

  const starred = getStarred();
  const starBtn = document.getElementById('conv-star');
  const isStarred = starred[convKey(s)];
  starBtn.textContent = isStarred ? '★' : '☆';
  starBtn.classList.toggle('starred', !!isStarred);

  const mastered = getMastered();
  const masteredBtn = document.getElementById('conv-mastered');
  const isMastered = mastered[convKey(s)];
  masteredBtn.textContent = isMastered ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!isMastered);
}

function revealConvQuestion() {
  if (convDeck.length === 0) return;
  document.getElementById('conv-question-content').classList.add('show');
}

function revealConvEn() {
  if (convDeck.length === 0) return;
  document.getElementById('conv-en-content').classList.add('show');
}

function revealConvJp() {
  if (convDeck.length === 0) return;
  document.getElementById('conv-jp-content').classList.add('show');
}

function revealConvUser() {
  if (convDeck.length === 0) return;
  document.getElementById('conv-user-content').classList.add('show');
}

function saveConvUserAnswer() {
  if (convDeck.length === 0) return;
  const s = convDeck[convIdx];
  const k = convKey(s);
  const val = document.getElementById('conv-user-answer').value;
  const userAnswers = getUserAnswers();
  if (val.trim() === '') delete userAnswers[k]; else userAnswers[k] = val;
  setUserAnswers(userAnswers);
}

function playConvQuestion() {
  if (convDeck.length === 0) return;
  const s = convDeck[convIdx];
  const u = new SpeechSynthesisUtterance(s[1]);
  u.lang = 'ja-JP';
  u.rate = 0.9;
  const preferred = ['O-Ren','Hattori','Kyoko','Google 日本語'];
  const voices = speechSynthesis.getVoices();
  let jpVoice = null;
  for (const name of preferred) {
    jpVoice = voices.find(v => v.name.includes(name));
    if (jpVoice) break;
  }
  if (!jpVoice) jpVoice = voices.find(v => v.lang.startsWith('ja'));
  if (jpVoice) u.voice = jpVoice;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function nextConvCard() {
  if (convDeck.length === 0) return;
  convIdx = (convIdx + 1) % convDeck.length;
  loadConvCard();
}

function prevConvCard() {
  if (convDeck.length === 0) return;
  convIdx = (convIdx - 1 + convDeck.length) % convDeck.length;
  loadConvCard();
}

function shuffleConv() {
  shuffleArray(convDeck);
  convIdx = 0;
  if (convDeck.length > 0) loadConvCard();
}

function toggleConvStar(e) {
  e.stopPropagation();
  if (convDeck.length === 0) return;
  const s = convDeck[convIdx];
  const starred = getStarred();
  const k = convKey(s);
  if (starred[k]) delete starred[k]; else starred[k] = 1;
  setStarred(starred);
  const starBtn = document.getElementById('conv-star');
  starBtn.textContent = starred[k] ? '★' : '☆';
  starBtn.classList.toggle('starred', !!starred[k]);
  nextConvCard();
}

function toggleConvFilter() {
  convStarredOnly = !convStarredOnly;
  document.getElementById('conv-filter-btn').textContent = convStarredOnly ? '★ Priority Only' : 'Show All';
  document.getElementById('conv-filter-btn').classList.toggle('active', convStarredOnly);
  convDeck = [...conversations];
  shuffleArray(convDeck);
  applyConvFilter();
}

function toggleConvMastered(e) {
  e.stopPropagation();
  if (convDeck.length === 0) return;
  const s = convDeck[convIdx];
  const mastered = getMastered();
  const k = convKey(s);
  if (mastered[k]) delete mastered[k]; else mastered[k] = 1;
  setMastered(mastered);
  const masteredBtn = document.getElementById('conv-mastered');
  masteredBtn.textContent = mastered[k] ? '✓' : '○';
  masteredBtn.classList.toggle('mastered', !!mastered[k]);
  nextConvCard();
}

function toggleConvHideMastered() {
  convHideMastered = !convHideMastered;
  document.getElementById('conv-hide-mastered-btn').textContent = convHideMastered ? '✓ Hide Mastered' : 'Hide Mastered';
  document.getElementById('conv-hide-mastered-btn').classList.toggle('active', convHideMastered);
  convDeck = [...conversations];
  shuffleArray(convDeck);
  applyConvFilter();
}

function toggleConvAnsweredOnly() {
  convAnsweredOnly = !convAnsweredOnly;
  document.getElementById('conv-answered-btn').textContent = convAnsweredOnly ? '✎ Answered Only' : 'Answered Only';
  document.getElementById('conv-answered-btn').classList.toggle('active', convAnsweredOnly);
  convDeck = [...conversations];
  shuffleArray(convDeck);
  applyConvFilter();
}

function convKey(s) {
  return 'conv_' + s[0];
}
