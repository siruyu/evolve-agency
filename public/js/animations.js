function initAnimations() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  LenisCreate();

  heroReveal();

  revealOnScroll();

  animateCounters();
}

function LenisCreate() {
  if (typeof Lenis === 'undefined') return;
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  window.lenis = lenis;
}

function heroReveal() {
  const heroLines = document.querySelectorAll('.hero-title .line span');
  if (!heroLines.length) return;

  gsap.to(heroLines, {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.08,
    ease: 'power3.out',
    delay: 0.3,
  });

  const heroTag = document.querySelector('.hero-sub');
  if (heroTag) {
    gsap.fromTo(heroTag,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1, ease: 'power2.out' }
    );
  }

  const heroBottom = document.querySelector('.hero-bottom');
  if (heroBottom) {
    gsap.fromTo(heroBottom,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1.4, ease: 'power2.out' }
    );
  }
}

function revealOnScroll() {
  var els;

  els = document.querySelectorAll('.reveal, .service-item, .manifesto-grid');
  if (els.length) {
    els.forEach(function(el) {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  els = document.querySelectorAll('.stagger-children, .hero__slide-services, .service-item-tags');
  if (els.length) {
    els.forEach(function(parent) {
      var children = parent.children;
      if (children.length) {
        gsap.fromTo(children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: parent,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }

  els = document.querySelectorAll('.scale-reveal');
  if (els.length) {
    els.forEach(function(el) {
      gsap.fromTo(el,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }
}

function animateCounters() {
  document.querySelectorAll('.case-stat-value').forEach((el) => {
    const text = el.textContent;
    const numMatch = text.match(/[+\-]?\d+/);
    const suffix = text.replace(/[+\-]?\d+/, '');
    if (!numMatch) return;
    const target = parseInt(numMatch[0]);

    gsap.fromTo(el,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: function() {
          const val = Math.round(this.targets()[0].textContent);
          el.textContent = '+' + val + suffix;
        },
      }
    );
  });

  document.querySelectorAll('.kpi-value').forEach((el) => {
    const text = el.textContent;
    const numMatch = text.match(/[+\-]?[\d.]+/);
    if (!numMatch) return;
    const target = parseFloat(numMatch[0]);
    const isPercent = text.includes('%');
    const hasPlus = text.includes('+');
    const hasMinus = text.includes('–');

    gsap.fromTo(el,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 0.1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: function() {
          const val = Number(this.targets()[0].textContent).toFixed(1);
          let display = '';
          if (hasPlus) display += '+';
          if (hasMinus) display += '–';
          display += val;
          if (isPercent) display += '%';
          if (!hasPlus && !hasMinus && !isPercent) display = val;
          el.textContent = display;
        },
      }
    );
  });
}
