function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuOverlay = document.querySelector('.menu-overlay');

  if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuOverlay.classList.contains('open');
      menuOverlay.classList.toggle('open');
      menuToggle.classList.toggle('active');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    menuOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuOverlay.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  document.querySelectorAll('.top-bar-email, .contact-email-copy').forEach(el => {
    el.addEventListener('click', async (e) => {
      if (el.tagName === 'A') e.preventDefault();
      const email = 'saha.rik2006@gmail.com';

      const showTooltip = () => {
        const tooltip = el.querySelector('.email-tooltip') || (() => {
          const t = document.createElement('span');
          t.className = 'email-tooltip';
          el.appendChild(t);
          return t;
        })();
        tooltip.textContent = 'Copied to clipboard!';
        tooltip.classList.add('visible');
        setTimeout(() => tooltip.classList.remove('visible'), 2000);
      };

      try {
        await navigator.clipboard.writeText(email);
        showTooltip();
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showTooltip();
      }
    });
  });

  const sideNavLinks = document.querySelectorAll('.side-nav a');
  if (sideNavLinks.length > 0) {
    const sections = document.querySelectorAll('.section');
    if (sections.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Array.from(sections).indexOf(entry.target);
            sideNavLinks.forEach((link, i) => {
              link.classList.toggle('active', i === idx);
            });
          }
        });
      }, { threshold: 0.3 });

      sections.forEach(s => observer.observe(s));
    }
  }
}
