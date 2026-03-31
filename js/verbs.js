// ── VERB LIST MODE ──
let shuffledVerbs = [...verbs];
let showOnlyStarred = false;

function toggleStar(idx, e) {
  e.stopPropagation();
  const v = shuffledVerbs[idx];
  const s = getStarred();
  const k = verbKey(v);
  if (s[k]) delete s[k]; else s[k] = 1;
  setStarred(s);
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
  const display = showOnlyStarred ? shuffledVerbs.filter(v => starred[verbKey(v)]) : shuffledVerbs;
  document.getElementById('verb-counter').textContent = display.length + ' verbs';
  list.innerHTML = display.map((v, i) => {
    const origIdx = shuffledVerbs.indexOf(v);
    const isStarred = starred[verbKey(v)];
    return `
    <div class="card" onclick="this.querySelector('.japanese').classList.toggle('show')">
      <button class="star-btn${isStarred ? ' starred' : ''}" onclick="toggleStar(${origIdx}, event)">${isStarred ? '★' : '☆'}</button>
      <div class="english">${v[2]}</div>
      <div class="japanese">
        <div class="kanji">${v[0]}</div>
        <div class="reading">${v[1]}</div>
      </div>
    </div>`;
  }).join('');
}
