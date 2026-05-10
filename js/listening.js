// ── LISTENING PRACTICE ──
let shuffledSentences = [];
let currentSentenceIdx = 0;
let speechRate = 0.85;
let listenAudio = null;

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

function stopListenAudio() {
  if (listenAudio) { listenAudio.pause(); listenAudio.src = ''; listenAudio = null; }
  speechSynthesis.cancel();
}

function playSentence() {
  const s = shuffledSentences[currentSentenceIdx];
  stopListenAudio();
  const file = (typeof sentencesAudioManifest !== 'undefined') ? sentencesAudioManifest[s.jp] : null;
  if (file) {
    const a = new Audio('audio/sentences/' + file);
    a.playbackRate = speechRate;
    a.preservesPitch = true;
    listenAudio = a;
    a.play().catch(() => playSentenceFallback(s.jp));
    return;
  }
  playSentenceFallback(s.jp);
}

function playSentenceFallback(jp) {
  const u = new SpeechSynthesisUtterance(jp);
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

function prevSentence() {
  currentSentenceIdx = (currentSentenceIdx - 1 + shuffledSentences.length) % shuffledSentences.length;
  loadSentence();
}

// Pre-load voices (needed on some browsers)
speechSynthesis.onvoiceschanged = () => {};
