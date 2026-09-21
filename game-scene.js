// Three foreground panels share one distant panorama. Rebase by a complete
// cycle so both foreground and the 1/3-speed background keep their position.
(() => {
  const panel = document.querySelector('#panel-games');
  panel.replaceChildren();
  panel.innerHTML = `<div class="game-view"><div class="game-distant" aria-hidden="true"></div><div class="game-scroll" tabindex="0" role="region" aria-label="게임 마을, 좌우 방향키 또는 스와이프로 이동"><div class="game-strip" aria-hidden="true"></div></div><div class="game-controls"><button type="button" aria-label="마을 왼쪽으로 이동">←</button><span>옆으로 마을 둘러보기</span><button type="button" aria-label="마을 오른쪽으로 이동">→</button></div></div>`;
  const view = panel.querySelector('.game-view');
  const scroller = panel.querySelector('.game-scroll');
  const strip = panel.querySelector('.game-strip');
  const distant = panel.querySelector('.game-distant');
  const ground = document.createElement('div');
  ground.className = 'game-ground';
  ground.setAttribute('aria-hidden', 'true');
  scroller.after(ground);
  for (let i = 0; i < 9; i++) {
    const tile = document.createElement('div');
    tile.className = 'game-tile';
    const img = document.createElement('img');
    img.src = `./assets/game-village-${i % 3 + 1}.png`;
    img.alt = ''; img.draggable = false;
    tile.append(img);
    strip.append(tile);
  }
  let width = 0;
  let frame = 0;
  const update = () => {
    frame = 0;
    if (!width || panel.hidden) return;
    const cycle = width * 3;
    let x = scroller.scrollLeft;
    if (x < cycle) x += cycle;
    else if (x >= cycle * 2) x -= cycle;
    if (x !== scroller.scrollLeft) scroller.scrollLeft = x;
    distant.style.backgroundPositionX = `${-x / 3}px`;
    ground.style.backgroundPositionX = `${-x}px`;
  };
  const layout = () => {
    if (panel.hidden) return;
    const oldWidth = width;
    const fraction = oldWidth ? (scroller.scrollLeft / oldWidth) % 3 : 0;
    width = view.clientHeight * 3;
    view.style.setProperty('--tile-width', `${width}px`);
    scroller.scrollLeft = width * (3 + fraction);
    update();
  };
  scroller.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(update);
  }, { passive: true });
  const move = direction => scroller.scrollBy({left: direction * scroller.clientWidth * .75, behavior: 'instant'});
  panel.querySelectorAll('.game-controls button').forEach((button, i) => button.addEventListener('click', () => move(i ? 1 : -1)));
  scroller.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  // Native horizontal touch/trackpad scrolling. Do not hijack vertical wheel.
  new ResizeObserver(layout).observe(view);
  window.addEventListener('hashchange', () => requestAnimationFrame(layout));
  requestAnimationFrame(layout);
})();
