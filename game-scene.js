// Three foreground panels share one distant panorama. Rebase by a complete
// cycle so both foreground and the 1/3-speed background keep their position.
(() => {
  const panel = document.querySelector('#panel-games');
  panel.replaceChildren();
  panel.innerHTML = `<div class="game-view"><div class="game-distant" aria-hidden="true"></div><div class="game-scroll" tabindex="0" role="region" aria-label="게임 마을, 마우스 휠·하단 스크롤바·좌우 방향키 또는 터치로 이동"><div class="game-strip" aria-hidden="true"></div></div></div>`;
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
    img.src = `./assets/game-village-small-${i % 3 + 1}.png`;
    img.alt = ''; img.draggable = false;
    tile.append(img);
    strip.append(tile);
  }
  let width = 0;
  let frame = 0;
  let dragging = false;
  const update = () => {
    frame = 0;
    if (!width || panel.hidden) return;
    const cycle = width * 3;
    let x = scroller.scrollLeft;
    if (!dragging && (x < cycle || x >= cycle * 2)) x = cycle + ((x % cycle) + cycle) % cycle;
    if (x !== scroller.scrollLeft) scroller.scrollLeft = x;
    distant.style.backgroundPositionX = `${-x / 3}px`;
    ground.style.backgroundPositionX = `${-x}px`;
  };
  const layout = () => {
    if (panel.hidden) return;
    const oldWidth = width;
    const fraction = oldWidth ? (scroller.scrollLeft / oldWidth) % 3 : 0;
    width = scroller.clientHeight * 3;
    view.style.setProperty('--tile-width', `${width}px`);
    view.style.setProperty("--scene-height", scroller.clientHeight + "px");
    scroller.scrollLeft = width * (3 + fraction);
    update();
  };
  scroller.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(update);
  }, { passive: true });
  const move = direction => scroller.scrollBy({left: direction * scroller.clientWidth * .75, behavior: 'instant'});
  scroller.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  // Keep native touch/trackpad scrolling; map a desktop vertical wheel to x.
  scroller.addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey || event.defaultPrevented) return;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (!delta) return;
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientWidth : 1;
    scroller.scrollLeft += delta * unit;
  }, { passive: false });
  // Avoid moving the native scrollbar thumb to another cycle mid-drag.
  scroller.addEventListener('pointerdown', event => { dragging = event.pointerType === 'mouse'; });
  const release = () => { if (dragging) { dragging = false; update(); } };
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  window.addEventListener('blur', release);
  new ResizeObserver(layout).observe(view);
  window.addEventListener('hashchange', () => requestAnimationFrame(layout));
  requestAnimationFrame(layout);
})();
