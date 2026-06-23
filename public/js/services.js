function initServices() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');

    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      accordionItems.forEach((other) => {
        const otherBody = other.querySelector('.accordion-body');
        other.classList.remove('open');
        if (otherBody) otherBody.style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';

        if (typeof gsap !== 'undefined') {
          const children = body.querySelectorAll('li, p');
          gsap.fromTo(children,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'power2.out' }
          );
        }
      }
    });
  });
}
