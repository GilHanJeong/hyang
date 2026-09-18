const categories = { education: '교육', games: '게임', hobbies: '취미' };
const tabs = [...document.querySelectorAll('[role="tab"]')];
const collections = document.querySelector('#collections');
const home = document.querySelector('#home');

// 빈 슬롯은 아직 링크나 버튼이 아닙니다. 화면에 문구를 출력하지 않습니다.
for (const key of Object.keys(categories)) {
  const panel = document.querySelector(`#panel-${key}`);
  const grid = document.createElement('div');
  grid.className = 'scene-slots';
  grid.setAttribute('aria-label', '콘텐츠 배치 영역');
  for (let index = 0; index < 6; index++) {
    const slot = document.createElement('div');
    slot.className = 'scene-slot';
    slot.setAttribute('aria-hidden', 'true');
    grid.append(slot);
  }
  panel.append(grid);
}
// 인접 배경을 세로 반전해 같은 픽셀 경계가 만나도록 연결합니다.
// 화면 크기와 콘텐츠 길이에 맞춰 필요한 만큼만 배경 타일을 생성합니다.
const scenery = document.querySelector('.school-background');
function fillScenery() {
  if (collections.hidden || collections.dataset.theme !== 'education') return;
  const count = Math.ceil(collections.offsetHeight / collections.clientWidth) + 1;
  if (scenery.children.length === count) return;
  scenery.replaceChildren(...Array.from({ length: count }, () => {
    const tile = document.createElement('div');
    tile.className = 'school-tile';
    return tile;
  }));
}
new ResizeObserver(fillScenery).observe(collections);

function selectCategory(key) {
  if (!Object.hasOwn(categories, key)) return;
  collections.dataset.theme = key;
  for (const tab of tabs) {
    const active = tab.dataset.category === key;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.querySelector(`#${tab.getAttribute('aria-controls')}`).hidden = !active;
  }
}
// 각 분야는 별도 씬입니다. URL 해시로 새로고침과 브라우저 뒤로가기도 지원합니다.
function showScene({ focus = true } = {}) {
  const key = location.hash.slice(1);
  const isCategory = Object.hasOwn(categories, key);
  home.hidden = isCategory;
  collections.hidden = !isCategory;
  if (isCategory) selectCategory(key);
  fillScenery();
  document.title = isCategory ? `${document.querySelector(`#tab-${key} > span`).textContent} | 한길쌤’s 창작마당` : '한길쌤’s 창작마당';
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (focus) {
    const target = isCategory ? document.querySelector(`#tab-${key}`) : document.querySelector('.home-menu a');
    target.focus({ preventScroll: true });
  }
}
function navigateCategory(key) {
  if (location.hash === `#${key}`) showScene();
  else location.hash = key;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => navigateCategory(tab.dataset.category));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = tabs.length - 1;
    if (target === undefined) return;
    event.preventDefault();
    navigateCategory(tabs[target].dataset.category);
  });
});
window.addEventListener('hashchange', () => showScene());
showScene({ focus: false });
