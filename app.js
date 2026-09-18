const categories = {
  education: { kicker: 'TOOLS FOR LEARNING', title: '배움을 조금 더 재미있게.', description: '수업과 탐구에 도움이 되는, 직접 만든 교육 도구를 모읍니다.', empty: '다음 배움의 도구', detail: '수업에 작은 변화를 더할 도구를 준비하고 있어요.' },
  games: { kicker: 'PLAY & EXPLORE', title: '호기심을 따라, 한 판 더.', description: '직접 만든 게임과 작은 실험들. 새로운 즐거움을 찾아보세요.', empty: '새로운 모험 준비 중', detail: '이곳에 즐겁게 플레이할 게임을 하나씩 모을 거예요.' },
  hobbies: { kicker: 'MADE WITH CURIOSITY', title: '좋아하는 마음으로 만든 것들.', description: '일상에서 발견한 재미와 소소한 창작을 함께 나눕니다.', empty: '작은 취미가 자라는 중', detail: '좋아하는 것들로 채워질 다음 자리를 남겨두었어요.' }
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
const collections = document.querySelector('#collections');
const home = document.querySelector('#home');
const footer = document.querySelector('footer');

// 실제 프로젝트 링크는 배포 주소가 확정된 뒤 연결합니다.
for (const [key, category] of Object.entries(categories)) {
  const panel = document.querySelector(`#panel-${key}`);
  const cards = Array.from({ length: 6 }, (_, index) => {
    if (key === 'education' && index === 0) return `<article class="card"><div class="card-art"><span class="book-symbol" aria-hidden="true">글</span></div><div class="card-body"><p class="card-label">언어 탐구 · WINDOWS</p><h3>언어 분석기</h3><p class="card-description">대화 속 단어와 표현을 살펴보고,<br>우리말의 패턴을 발견하는 도구입니다.</p><div class="card-status"><span>다운로드 링크 준비 중</span><span aria-hidden="true">◇</span></div></div></article>`;
    return `<article class="card placeholder"><div class="card-art"><span class="slot" aria-hidden="true">${String(index + 1).padStart(2, '0')} +</span></div><div class="card-body"><p class="card-label">COMING SOON</p><h3>${category.empty}</h3><p class="card-description">${category.detail}</p><div class="card-status"><span>준비 중</span><span aria-hidden="true">· · ·</span></div></div></article>`;
  }).join('');
  panel.innerHTML = `<div class="section-heading"><div><p class="section-kicker">${category.kicker}</p><h2>${category.title}</h2><p class="section-description">${category.description}</p></div><span class="section-mark">조금씩 채워가는 마당</span></div><div class="cards">${cards}</div><p class="empty-note">아직 비어 있는 자리에는 새로운 창작물이 찾아올 예정이에요.</p>`;
}

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
  footer.hidden = !isCategory;
  if (isCategory) selectCategory(key);
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
document.querySelector('#year').textContent = new Date().getFullYear();
window.addEventListener('hashchange', () => showScene());
showScene({ focus: false });
