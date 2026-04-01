// ── TIME DURATION MODE ──
let shuffledTimePhrases = [];
let timePhraseIdx = 0;
let timeSpeechRate = 1;
let timeJpRevealed = false;
let timeEnRevealed = false;

function initTime() {
  shuffledTimePhrases = [...timePhrases];
  shuffleArray(shuffledTimePhrases);
  timePhraseIdx = 0;
  loadTimePhrase();
}

function loadTimePhrase() {
  const item = shuffledTimePhrases[timePhraseIdx];
  timeJpRevealed = false;
  timeEnRevealed = false;

  document.getElementById('time-jp').textContent = item.jp;
  document.getElementById('time-jp-content').classList.remove('show');
  document.getElementById('time-note').textContent = item.note || '';
  document.getElementById('time-note').classList.remove('show');
  document.getElementById('time-en').textContent = item.en;
  document.getElementById('time-en-content').classList.remove('show');

  const trickyEl = document.getElementById('time-tricky');
  trickyEl.style.display = item.tricky ? '' : 'none';

  document.getElementById('time-reveal-jp-btn').textContent = 'Show Japanese';
  document.getElementById('time-reveal-en-btn').textContent = 'Show English';
  document.getElementById('time-counter').textContent =
    (timePhraseIdx + 1) + ' / ' + shuffledTimePhrases.length;
}

function playTimePhrase() {
  const item = shuffledTimePhrases[timePhraseIdx];
  const u = new SpeechSynthesisUtterance(item.jp);
  u.lang = 'ja-JP';
  u.rate = timeSpeechRate;
  const preferred = ['O-Ren', 'Hattori', 'Kyoko', 'Google 日本語'];
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

function revealTimeJp() {
  timeJpRevealed = !timeJpRevealed;
  document.getElementById('time-jp-content').classList.toggle('show', timeJpRevealed);
  const noteEl = document.getElementById('time-note');
  noteEl.classList.toggle('show', timeJpRevealed && noteEl.textContent !== '');
  document.getElementById('time-reveal-jp-btn').textContent =
    timeJpRevealed ? 'Hide Japanese' : 'Show Japanese';
}

function revealTimeEn() {
  timeEnRevealed = !timeEnRevealed;
  document.getElementById('time-en-content').classList.toggle('show', timeEnRevealed);
  document.getElementById('time-reveal-en-btn').textContent =
    timeEnRevealed ? 'Hide English' : 'Show English';
}

function setTimeSpeed(rate, btn) {
  timeSpeechRate = rate;
  document.querySelectorAll('#time-speed-controls button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function nextTimePhrase() {
  timePhraseIdx = (timePhraseIdx + 1) % shuffledTimePhrases.length;
  loadTimePhrase();
}

function prevTimePhrase() {
  timePhraseIdx = (timePhraseIdx - 1 + shuffledTimePhrases.length) % shuffledTimePhrases.length;
  loadTimePhrase();
}
