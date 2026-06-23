function initSlider() {
  const track = document.getElementById('sliderTrack');
  const dots = document.querySelectorAll('.slider__dot');
  if (!track || !dots.length) return;

  let current = 0;
  let autoSlide;
  const total = dots.length;

  function goTo(index) {
    if (index < 0 || index >= total) return;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      const line = dot.querySelector('.slider__dot-line');
      if (line) {
        line.style.animation = 'none';
        void line.offsetWidth;
        if (i === current) {
          line.style.animation = 'dot-fill 4s linear forwards';
        }
      }
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goTo(index);
      resetAutoSlide();
    });
  });

  function next() {
    goTo((current + 1) % total);
  }

  function startAutoSlide() {
    autoSlide = setInterval(next, 4000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  goTo(0);
  startAutoSlide();
}
