// ── TIME EXPRESSION DRILL PLAN ──
// Phase 1: Instant recognition (isolated items)
// Phase 2: Category tagging
// Phase 3: Micro-embedding (short sentences)
// Phase 4: Time-first listening pressure (TTS-driven)
// Phase 5: Density bursts (themed rapid-fire stacks)

let drillCurrentPhase = 1;
let drillSpeechRate = 1;

const drillPhaseDescriptions = {
  1: 'Instant recognition — flash a single time phrase, reflex its meaning. Reps over depth. Optional Shadow mode auto-plays the audio so you echo it back.',
  2: 'Category tagging — for each item, decide what kind of thing it is. Trains your brain to skip parsing and go straight to type.',
  3: 'Micro-embedding — short sentences where the time expression is still the whole focus. Bridges isolation to real speech.',
  4: 'Time-first listening — TTS plays a sentence with the time expression up front. Tag the type before decoding, then reconstruct.',
  5: 'Density bursts — themed stacks of related forms, rapid-fire. Maximum reps per minute.',
};

const drillCategoryLabels = {
  point: 'Point',
  duration: 'Duration',
  relative: 'Relative',
  ambiguous: 'Ambiguous',
};

function initTimeDrills() {
  drillSetPhase(drillCurrentPhase || 1);
}

function drillSetPhase(n) {
  drillCurrentPhase = n;
  document.querySelectorAll('.drill-tab').forEach(t => {
    t.classList.toggle('active', parseInt(t.dataset.phase, 10) === n);
  });
  document.querySelectorAll('.drill-panel').forEach(p => {
    p.style.display = (parseInt(p.dataset.phase, 10) === n) ? '' : 'none';
  });
  document.getElementById('drill-phase-desc').textContent = drillPhaseDescriptions[n];
  if (n === 1) initDrillP1();
  if (n === 2) initDrillP2();
  if (n === 3) initDrillP3();
  if (n === 4) initDrillP4();
  if (n === 5) initDrillP5();
}

let drillCurrentAudio = null;

function drillStopAudio() {
  if (drillCurrentAudio) {
    drillCurrentAudio.pause();
    drillCurrentAudio.src = '';
    drillCurrentAudio = null;
  }
  speechSynthesis.cancel();
}

function drillSpeak(text) {
  drillStopAudio();
  const file = (typeof timeAudioManifest !== 'undefined') ? timeAudioManifest[text] : null;
  if (file) {
    const a = new Audio('audio/time/' + file);
    a.playbackRate = drillSpeechRate;
    a.preservesPitch = true;
    drillCurrentAudio = a;
    a.play().catch(() => drillSpeakFallback(text));
    return;
  }
  drillSpeakFallback(text);
}

function drillSpeakFallback(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ja-JP';
  u.rate = drillSpeechRate;
  const preferred = ['O-Ren', 'Hattori', 'Kyoko', 'Google 日本語'];
  const voices = speechSynthesis.getVoices();
  let jp = null;
  for (const name of preferred) {
    jp = voices.find(v => v.name.includes(name));
    if (jp) break;
  }
  if (!jp) jp = voices.find(v => v.lang.startsWith('ja'));
  if (jp) u.voice = jp;
  speechSynthesis.speak(u);
}

function drillSetSpeed(rate, btn) {
  drillSpeechRate = rate;
  btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ──────────────────────────────────────────────────────────
// PHASE 1: Instant recognition
// ──────────────────────────────────────────────────────────
let p1Deck = [];
let p1Idx = 0;
let p1Revealed = false;
let p1CatFilter = 'all';
let p1TrickyOnly = false;

function initDrillP1() {
  buildP1Deck();
  loadP1();
}

function buildP1Deck() {
  let pool = [...timeDrillItems];
  if (p1CatFilter !== 'all') pool = pool.filter(i => i.category === p1CatFilter);
  if (p1TrickyOnly) pool = pool.filter(i => i.tricky);
  shuffleArray(pool);
  p1Deck = pool;
  p1Idx = 0;
}

function loadP1() {
  if (!p1Deck.length) {
    document.getElementById('p1-jp').textContent = '— no items match filters —';
    document.getElementById('p1-tricky').style.display = 'none';
    document.getElementById('p1-counter').textContent = '0 / 0';
    document.getElementById('p1-reveal-content').classList.remove('show');
    return;
  }
  const item = p1Deck[p1Idx];
  p1Revealed = false;
  document.getElementById('p1-jp').textContent = item.jp;
  document.getElementById('p1-tricky').style.display = item.tricky ? '' : 'none';
  document.getElementById('p1-reveal-content').classList.remove('show');
  document.getElementById('p1-reveal-btn').textContent = 'Show meaning';
  document.getElementById('p1-counter').textContent = (p1Idx + 1) + ' / ' + p1Deck.length;
  drillSpeak(item.jp);
}

function p1PlayAudio() { if (p1Deck.length) drillSpeak(p1Deck[p1Idx].jp); }

function p1Reveal() {
  if (!p1Deck.length) return;
  p1Revealed = !p1Revealed;
  const item = p1Deck[p1Idx];
  document.getElementById('p1-reading').textContent = item.reading;
  document.getElementById('p1-en').textContent = item.en;
  document.getElementById('p1-cat').textContent =
    drillCategoryLabels[item.category] + (item.approx ? ' (+ approx)' : '');
  const noteEl = document.getElementById('p1-note');
  noteEl.textContent = item.note || '';
  noteEl.style.display = item.note ? '' : 'none';
  document.getElementById('p1-reveal-content').classList.toggle('show', p1Revealed);
  document.getElementById('p1-reveal-btn').textContent = p1Revealed ? 'Hide meaning' : 'Show meaning';
}

function p1Next() {
  if (!p1Deck.length) return;
  p1Idx = (p1Idx + 1) % p1Deck.length;
  loadP1();
}
function p1Prev() {
  if (!p1Deck.length) return;
  p1Idx = (p1Idx - 1 + p1Deck.length) % p1Deck.length;
  loadP1();
}
function p1Shuffle() {
  if (!p1Deck.length) return;
  shuffleArray(p1Deck);
  p1Idx = 0;
  loadP1();
}
function p1ToggleTricky() {
  p1TrickyOnly = !p1TrickyOnly;
  const btn = document.getElementById('p1-tricky-btn');
  btn.classList.toggle('active', p1TrickyOnly);
  btn.textContent = p1TrickyOnly ? '⚠ Tricky Only' : 'Tricky Only';
  buildP1Deck();
  loadP1();
}
function p1ChangeCat(v) {
  p1CatFilter = v;
  buildP1Deck();
  loadP1();
}

// ──────────────────────────────────────────────────────────
// PHASE 2: Category tagging
// ──────────────────────────────────────────────────────────
let p2Deck = [];
let p2Idx = 0;
let p2Answered = null;
let p2Score = { correct: 0, total: 0 };

function initDrillP2() {
  p2Deck = [...timeDrillItems];
  shuffleArray(p2Deck);
  p2Idx = 0;
  p2Score = { correct: 0, total: 0 };
  document.getElementById('p2-score').textContent = '0 / 0';
  loadP2();
}

function loadP2() {
  if (!p2Deck.length) return;
  const item = p2Deck[p2Idx];
  p2Answered = null;
  document.getElementById('p2-tricky').style.display = item.tricky ? '' : 'none';
  document.getElementById('p2-feedback').classList.remove('show');
  document.querySelectorAll('.p2-cat-btn').forEach(b => {
    b.classList.remove('correct', 'wrong');
    b.disabled = false;
  });
  document.getElementById('p2-counter').textContent = (p2Idx + 1) + ' / ' + p2Deck.length;
  drillSpeak(item.jp);
}

function p2Tag(cat, btn) {
  if (p2Answered !== null) return;
  const item = p2Deck[p2Idx];
  p2Answered = cat;
  p2Score.total++;
  if (item.category === cat) {
    p2Score.correct++;
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.p2-cat-btn').forEach(b => {
      if (b.dataset.cat === item.category) b.classList.add('correct');
    });
  }
  document.querySelectorAll('.p2-cat-btn').forEach(b => b.disabled = true);
  document.getElementById('p2-fb-jp').textContent = item.jp;
  document.getElementById('p2-fb-reading').textContent = item.reading;
  document.getElementById('p2-fb-en').textContent = item.en;
  document.getElementById('p2-fb-cat').textContent =
    drillCategoryLabels[item.category] + (item.approx ? ' (+ approx)' : '');
  const noteEl = document.getElementById('p2-fb-note');
  noteEl.textContent = item.note || '';
  noteEl.style.display = item.note ? '' : 'none';
  document.getElementById('p2-feedback').classList.add('show');
  document.getElementById('p2-score').textContent = p2Score.correct + ' / ' + p2Score.total;
}

function p2Next() {
  p2Idx = (p2Idx + 1) % p2Deck.length;
  loadP2();
}
function p2PlayAudio() { if (p2Deck.length) drillSpeak(p2Deck[p2Idx].jp); }
function p2Shuffle() { shuffleArray(p2Deck); p2Idx = 0; loadP2(); }
function p2ResetScore() {
  p2Score = { correct: 0, total: 0 };
  document.getElementById('p2-score').textContent = '0 / 0';
}

// ──────────────────────────────────────────────────────────
// PHASE 3: Micro-embedding sentences
// ──────────────────────────────────────────────────────────
let p3Deck = [];
let p3Idx = 0;
let p3Revealed = false;

function initDrillP3() {
  p3Deck = [...timeDrillMicroSentences];
  shuffleArray(p3Deck);
  p3Idx = 0;
  loadP3();
}

function loadP3() {
  if (!p3Deck.length) return;
  const item = p3Deck[p3Idx];
  p3Revealed = false;
  document.getElementById('p3-jp').textContent = item.jp;
  document.getElementById('p3-en').textContent = item.en;
  document.getElementById('p3-cat').textContent =
    'Time type: ' + drillCategoryLabels[item.category];
  document.getElementById('p3-reveal-content').classList.remove('show');
  document.getElementById('p3-reveal-btn').textContent = 'Show sentence & meaning';
  document.getElementById('p3-counter').textContent = (p3Idx + 1) + ' / ' + p3Deck.length;
  drillSpeak(item.jp);
}

function p3Reveal() {
  p3Revealed = !p3Revealed;
  document.getElementById('p3-reveal-content').classList.toggle('show', p3Revealed);
  document.getElementById('p3-reveal-btn').textContent =
    p3Revealed ? 'Hide sentence & meaning' : 'Show sentence & meaning';
}
function p3PlayAudio() { if (p3Deck.length) drillSpeak(p3Deck[p3Idx].jp); }
function p3Next() { p3Idx = (p3Idx + 1) % p3Deck.length; loadP3(); }
function p3Prev() { p3Idx = (p3Idx - 1 + p3Deck.length) % p3Deck.length; loadP3(); }
function p3Shuffle() { shuffleArray(p3Deck); p3Idx = 0; loadP3(); }

// ──────────────────────────────────────────────────────────
// PHASE 4: Time-first listening pressure
// ──────────────────────────────────────────────────────────
let p4Deck = [];
let p4Idx = 0;
let p4Answered = null;
let p4Revealed = false;

function initDrillP4() {
  p4Deck = [...timeDrillFrontLoaded];
  shuffleArray(p4Deck);
  p4Idx = 0;
  loadP4(true);
}

function loadP4(autoplay) {
  if (!p4Deck.length) return;
  const item = p4Deck[p4Idx];
  p4Answered = null;
  p4Revealed = false;
  document.getElementById('p4-jp').textContent = item.jp;
  document.getElementById('p4-en').textContent = item.en;
  document.getElementById('p4-time-exp').textContent = item.timeExp;
  document.getElementById('p4-cat').textContent = drillCategoryLabels[item.category];
  document.getElementById('p4-feedback').classList.remove('show');
  document.getElementById('p4-reveal-content').classList.remove('show');
  document.getElementById('p4-reveal-btn').textContent = 'Show sentence';
  document.querySelectorAll('.p4-cat-btn').forEach(b => {
    b.classList.remove('correct', 'wrong');
    b.disabled = false;
  });
  document.getElementById('p4-counter').textContent = (p4Idx + 1) + ' / ' + p4Deck.length;
  if (autoplay) drillSpeak(item.jp);
}

function p4PlayAudio() { if (p4Deck.length) drillSpeak(p4Deck[p4Idx].jp); }

function p4Tag(cat, btn) {
  if (p4Answered !== null) return;
  const item = p4Deck[p4Idx];
  p4Answered = cat;
  if (item.category === cat) {
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.p4-cat-btn').forEach(b => {
      if (b.dataset.cat === item.category) b.classList.add('correct');
    });
  }
  document.querySelectorAll('.p4-cat-btn').forEach(b => b.disabled = true);
  document.getElementById('p4-feedback').classList.add('show');
}

function p4Reveal() {
  p4Revealed = !p4Revealed;
  document.getElementById('p4-reveal-content').classList.toggle('show', p4Revealed);
  document.getElementById('p4-reveal-btn').textContent =
    p4Revealed ? 'Hide sentence' : 'Show sentence';
}

function p4Next() { p4Idx = (p4Idx + 1) % p4Deck.length; loadP4(true); }
function p4Shuffle() { shuffleArray(p4Deck); p4Idx = 0; loadP4(true); }

// ──────────────────────────────────────────────────────────
// PHASE 5: Density bursts
// ──────────────────────────────────────────────────────────
let p5BurstIdx = 0;
let p5ItemIdx = 0;
let p5Revealed = false;
let p5PlayAllToken = 0;

function initDrillP5() {
  populateP5BurstSelect();
  p5BurstIdx = 0;
  p5ItemIdx = 0;
  loadP5();
}

function populateP5BurstSelect() {
  const sel = document.getElementById('p5-burst-select');
  sel.innerHTML = '';
  timeDrillBursts.forEach((b, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = b.theme;
    sel.appendChild(opt);
  });
  sel.value = p5BurstIdx;
}

function p5SelectBurst(v) {
  p5PlayAllToken++;
  p5BurstIdx = parseInt(v, 10);
  p5ItemIdx = 0;
  loadP5();
}

function loadP5(autoplay = true) {
  const burst = timeDrillBursts[p5BurstIdx];
  const item = burst.items[p5ItemIdx];
  p5Revealed = false;
  document.getElementById('p5-theme').textContent = burst.theme;
  document.getElementById('p5-jp').textContent = item.jp;
  document.getElementById('p5-en').textContent = item.en;
  document.getElementById('p5-reveal-content').classList.remove('show');
  document.getElementById('p5-reveal-btn').textContent = 'Show Japanese & meaning';
  document.getElementById('p5-counter').textContent =
    (p5ItemIdx + 1) + ' / ' + burst.items.length;
  if (autoplay) drillSpeak(item.jp);
}

function p5Reveal() {
  p5Revealed = !p5Revealed;
  document.getElementById('p5-reveal-content').classList.toggle('show', p5Revealed);
  document.getElementById('p5-reveal-btn').textContent =
    p5Revealed ? 'Hide Japanese & meaning' : 'Show Japanese & meaning';
}
function p5PlayAudio() {
  const item = timeDrillBursts[p5BurstIdx].items[p5ItemIdx];
  drillSpeak(item.jp);
}
function p5Next() {
  p5PlayAllToken++;
  const burst = timeDrillBursts[p5BurstIdx];
  p5ItemIdx = (p5ItemIdx + 1) % burst.items.length;
  loadP5();
}
function p5Prev() {
  p5PlayAllToken++;
  const burst = timeDrillBursts[p5BurstIdx];
  p5ItemIdx = (p5ItemIdx - 1 + burst.items.length) % burst.items.length;
  loadP5();
}
function p5PlayAll() {
  const myToken = ++p5PlayAllToken;
  const burst = timeDrillBursts[p5BurstIdx];
  let i = 0;
  function step() {
    if (myToken !== p5PlayAllToken) return;
    if (i >= burst.items.length) return;
    p5ItemIdx = i;
    loadP5(false);
    drillSpeak(burst.items[i].jp);
    i++;
    setTimeout(step, 1800);
  }
  step();
}
function p5StopPlayAll() { p5PlayAllToken++; drillStopAudio(); }
