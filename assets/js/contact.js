    /* ── Bootstrap validation + success notice ── */
    (() => {
      'use strict';
      const forms = document.querySelectorAll('.needs-validation');
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          event.preventDefault();
          event.stopPropagation();
          if (form.checkValidity()) {
            document.getElementById('successNotice').classList.add('show');
            form.reset();
            form.classList.remove('was-validated');
            setTimeout(() => document.getElementById('successNotice').classList.remove('show'), 5000);
          } else {
            form.classList.add('was-validated');
          }
        }, false);
      });
    })();

    /* ── Reveal on scroll ── */
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('active'); revObs.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));