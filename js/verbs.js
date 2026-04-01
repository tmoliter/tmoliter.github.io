// ── VERB LIST MODE ──
let shuffledVerbs = [...verbs];
let showOnlyStarred = false;
let hideMastered = false;

function toggleStar(idx, e) {
  e.stopPropagation();
  const v = shuffledVerbs[idx];
  const s = getStarred();
  const k = verbKey(v);
  if (s[k]) delete s[k]; else s[k] = 1;
  setStarred(s);
  renderVerbs();
}

function toggleMastered(idx, e) {
  e.stopPropagation();
  const v = shuffledVerbs[idx];
  const m = getMastered();
  const k = verbKey(v);
  if (m[k]) delete m[k]; else m[k] = 1;
  setMastered(m);
  renderVerbs();
}

function toggleHideMastered() {
  hideMastered = !hideMastered;
  document.getElementById('hide-mastered-btn').textContent = hideMastered ? '✓ Hide Mastered' : 'Hide Mastered';
  document.getElementById('hide-mastered-btn').classList.toggle('active', hideMastered);
  renderVerbs();
}

function toggleFilter() {
  showOnlyStarred = !showOnlyStarred;
  document.getElementById('filter-btn').textContent = showOnlyStarred ? '★ Priority Only' : 'Show All';
  document.getElementById('filter-btn').classList.toggle('active', showOnlyStarred);
  renderVerbs();
}

function shuffleVerbs() {
  shuffleArray(shuffledVerbs);
  renderVerbs();
}

function renderVerbs() {
  const list = document.getElementById('verb-list');
  const starred = getStarred();
  const mastered = getMastered();
  let display = showOnlyStarred ? shuffledVerbs.filter(v => starred[verbKey(v)]) : shuffledVerbs;
  if (hideMastered) display = display.filter(v => !mastered[verbKey(v)]);
  document.getElementById('verb-counter').textContent = display.length + ' verbs';
  list.innerHTML = display.map((v, i) => {
    const origIdx = shuffledVerbs.indexOf(v);
    const isStarred = starred[verbKey(v)];
    const isMastered = mastered[verbKey(v)];
    return `
    <div class="card" onclick="this.querySelector('.english').classList.toggle('show')">
      <button class="star-btn${isStarred ? ' starred' : ''}" onclick="toggleStar(${origIdx}, event)">${isStarred ? '★' : '☆'}</button>
      <button class="mastered-btn${isMastered ? ' mastered' : ''}" onclick="toggleMastered(${origIdx}, event)">${isMastered ? '✓' : '○'}</button>
      <div class="japanese">
        <div class="kanji">${v[0]}</div>
        <div class="reading">${v[1]}</div>
      </div>
      <div class="english">${v[2]}</div>
    </div>`;
  }).join('');
}
