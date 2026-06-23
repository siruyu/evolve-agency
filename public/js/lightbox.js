(function() {
  var items = document.querySelectorAll('.img-placeholder[data-media]');
  if (!items.length) return;

  var lightbox = document.getElementById('lightbox');
  var content = document.getElementById('lightboxContent');
  var bg = document.getElementById('lightboxBg');
  var closeBtn = document.getElementById('lightboxClose');
  var prevBtn = document.getElementById('lightboxPrev');
  var nextBtn = document.getElementById('lightboxNext');

  var mediaData = [];
  items.forEach(function(el) {
    mediaData.push(JSON.parse(el.getAttribute('data-media')));
  });

  var currentIndex = 0;
  var currentMedia = null;
  var isOpen = false;

  function open(index) {
    currentIndex = index;
    renderMedia();
    lightbox.classList.add('active');
    isOpen = true;
    gsap.fromTo(lightbox, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' });
    gsap.fromTo(content, { scale: 0.92, y: 20 }, { scale: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  }

  function close() {
    isOpen = false;
    gsap.to(lightbox, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: function() {
        lightbox.classList.remove('active');
        destroyMedia();
      }
    });
  }

  function renderMedia() {
    destroyMedia();
    var data = mediaData[currentIndex];
    if (data.type === 'video') {
      var video = document.createElement('video');
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.controls = true;
      var source = document.createElement('source');
      source.src = data.src;
      source.type = 'video/mp4';
      video.appendChild(source);
      content.appendChild(video);
      currentMedia = video;
    } else {
      var img = document.createElement('img');
      img.src = data.src;
      img.alt = '';
      content.appendChild(img);
      currentMedia = img;
    }
  }

  function destroyMedia() {
    if (currentMedia) {
      if (currentMedia.tagName === 'VIDEO') {
        currentMedia.pause();
        currentMedia.removeAttribute('src');
        currentMedia.load();
      }
      currentMedia.remove();
      currentMedia = null;
    }
    content.innerHTML = '';
  }

  function prev() {
    currentIndex = (currentIndex - 1 + mediaData.length) % mediaData.length;
    renderMedia();
    gsap.fromTo(content, { scale: 0.95, x: -30 }, { scale: 1, x: 0, duration: 0.35, ease: 'power2.out' });
  }

  function next() {
    currentIndex = (currentIndex + 1) % mediaData.length;
    renderMedia();
    gsap.fromTo(content, { scale: 0.95, x: 30 }, { scale: 1, x: 0, duration: 0.35, ease: 'power2.out' });
  }

  items.forEach(function(el, i) {
    el.addEventListener('click', function() {
      open(i);
    });
  });

  bg.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  document.addEventListener('keydown', function(e) {
    if (!isOpen) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
