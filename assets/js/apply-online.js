    /* ── Reveal on scroll ── */
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('active'); revObs.unobserve(entry.target); }
      });
    }, { threshold: 0.10 });
    document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

    /* ── Staggered test + schedule rows ── */
    const animEls = document.querySelectorAll('.test-card, .notice-item');
    const scObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(animEls).indexOf(entry.target);
          entry.target.style.transitionDelay = (idx % 2) * 0.1 + 's';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          scObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    animEls.forEach(el => {
      el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease, border-color 0.3s, box-shadow 0.3s';
      scObs.observe(el);
    });