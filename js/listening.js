// ── LISTENING PRACTICE ──
let shuffledSentences = [];
let currentSentenceIdx = 0;
let speechRate = 0.85;

function initListening() {
  shuffledSentences = [...sentences];
  shuffleArray(shuffledSentences);
  currentSentenceIdx = 0;
  loadSentence();
}

function loadSentence() {
  const s = shuffledSentences[currentSentenceIdx];
  document.getElementById('sentence-jp').textContent = s.jp;
  document.getElementById('sentence-en').textContent = s.en;
  document.getElementById('reveal-area').classList.remove('revealed');
  document.getElementById('listen-counter').textContent =
    (currentSentenceIdx + 1) + ' / ' + shuffledSentences.length;
}

function playSentence() {
  const s = shuffledSentences[currentSentenceIdx];
  const u = new SpeechSynthesisUtterance(s.jp);
  u.lang = 'ja-JP';
  u.rate = speechRate;
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

function setSpeed(rate) {
  speechRate = rate;
  document.querySelectorAll('.speed-controls button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

function revealSentence() {
  document.getElementById('reveal-area').classList.add('revealed');
}

function nextSentence() {
  currentSentenceIdx = (currentSentenceIdx + 1) % shuffledSentences.length;
  loadSentence();
}

// Pre-load voices (needed on some browsers)
speechSynthesis.onvoiceschanged = () => {};
