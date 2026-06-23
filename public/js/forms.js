function initForms() {
  initNewsletter();
}

function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(function(form) {
    var btn = form.querySelector('button');
    if (!btn) return;

    var success = form.parentElement.querySelector('.form-success');
    var error = form.parentElement.querySelector('.form-error');

    btn.onclick = function(e) {
      e.preventDefault();
      if (success) success.style.display = 'none';
      if (error) error.style.display = 'none';

      var input = form.querySelector('input[name="email"]');
      if (!input || !input.value.trim()) {
        if (error) {
          error.textContent = 'Please enter your email address.';
          error.style.display = 'block';
        }
        return;
      }

      btn.textContent = 'Sending...';
      btn.disabled = true;

      var params = {
        from_name: 'Newsletter Subscriber',
        from_email: input.value.trim(),
        message: 'Newsletter subscription request'
      };

      if (typeof emailjs !== 'undefined') {
        emailjs.send('service_o6w5z0s', 'template_kkigzah', params)
          .then(function() {
            if (success) success.style.display = 'block';
            if (error) error.style.display = 'none';
            input.value = '';
          })
          .catch(function() {
            if (error) {
              error.textContent = 'Failed to subscribe. Please try again.';
              error.style.display = 'block';
            }
            if (success) success.style.display = 'none';
          })
          .finally(function() {
            btn.textContent = 'Subscribe';
            btn.disabled = false;
          });
      } else {
        if (error) {
          error.textContent = 'Service not available. Please try again later.';
          error.style.display = 'block';
        }
        btn.textContent = 'Subscribe';
        btn.disabled = false;
      }
    };
  });
}
