// ── YEN PRICE LISTENING ──
const PRICE_YEN_PER_USD = 150;
let priceCurrentNum = 0;
let priceStreak = 0;
let priceSpeechRate = 1;
let priceInitialized = false;

function initPrices() {
  if (!priceInitialized) {
    updatePriceStreakDisplay();
    priceInitialized = true;
  }
  newPrice();
}

function newPrice() {
  const digits = Math.floor(Math.random() * 5) + 1;
  const min = digits === 1 ? 1 : Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  priceCurrentNum = Math.floor(Math.random() * (max - min + 1)) + min;
  document.getElementById('price-num-content').classList.remove('show');
  document.getElementById('price-usd-content').classList.remove('show');
  document.getElementById('price-num').textContent = priceCurrentNum.toLocaleString('en-US') + '円';
  const usd = priceCurrentNum / PRICE_YEN_PER_USD;
  document.getElementById('price-usd').textContent = '≈ $' + usd.toFixed(2);
  document.getElementById('price-rate-note').textContent =
    'rate used: ¥' + PRICE_YEN_PER_USD + ' / $1';
}

function playPrice() {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(priceCurrentNum + '円');
  u.lang = 'ja-JP';
  u.rate = priceSpeechRate;
  const preferred = ['O-Ren', 'Hattori', 'Kyoko', 'Google 日本語'];
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

function setPriceSpeed(rate, btn) {
  priceSpeechRate = rate;
  document.querySelectorAll('#prices .speed-controls button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function revealPriceNum() {
  document.getElementById('price-num-content').classList.add('show');
}

function revealPriceUsd() {
  document.getElementById('price-usd-content').classList.add('show');
}

function gradePrice(correct) {
  priceStreak += correct ? 1 : -1;
  updatePriceStreakDisplay();
  newPrice();
}

function updatePriceStreakDisplay() {
  const el = document.getElementById('price-streak');
  el.textContent = priceStreak;
  el.classList.toggle('streak-pos', priceStreak > 0);
  el.classList.toggle('streak-neg', priceStreak < 0);
}
