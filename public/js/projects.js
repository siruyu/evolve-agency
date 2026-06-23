function initProjects() {
  initProjectFilters();
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-grid');
  const blogCards = document.querySelectorAll('.blog-card');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.textContent.trim().toLowerCase();

      const allItems = [...projectCards, ...blogCards];
      allItems.forEach((card) => {
        if (filter === 'all' || filter === 'reset') {
          card.style.display = '';
        } else {
          const tags = card.querySelectorAll('.blog-card-meta span, .services-tags span');
          let match = false;
          tags.forEach((tag) => {
            if (tag.textContent.trim().toLowerCase().includes(filter)) {
              match = true;
            }
          });
          card.style.display = match ? '' : 'none';
        }
      });
    });
  });
}
