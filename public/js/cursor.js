function initCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0.8rem;
    height: 0.8rem;
    background: #fff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transform: translate(-50%, -50%);
    transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                background 0.3s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    cursor.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  const hoverTargets = document.querySelectorAll('a, button, .menu-toggle, .accordion-header, .filter-btn, .project-card-grid');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '2rem';
      cursor.style.height = '2rem';
      cursor.style.background = 'rgba(255,255,255,0.15)';
      cursor.style.border = '0.1rem solid rgba(255,255,255,0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '0.8rem';
      cursor.style.height = '0.8rem';
      cursor.style.background = '#fff';
      cursor.style.border = 'none';
    });
  });
}
