document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNavigation();
  initAnimations();
  initServices();
  initSlider();
  initProjects();
  initForms();
});

window.addEventListener('load', () => {
  if (window.lenis) {
    window.lenis.start();
  }
});
