function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const percentEl = loader.querySelector('.loader-percentage');
  const subEl = loader.querySelector('.loader-sub');
  let current = 0;
  const target = 100;
  const duration = 2500;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const eased = 1 - Math.pow(1 - progress, 3);
    current = Math.floor(eased * target);

    if (percentEl) {
      percentEl.textContent = String(current).padStart(2, '0');
    }

    if (progress >= 0.3 && subEl) {
      subEl.classList.add('visible');
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      if (percentEl) percentEl.textContent = '00';
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.cursor = 'none';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 800);
      }, 400);
    }
  }

  requestAnimationFrame(tick);
}
