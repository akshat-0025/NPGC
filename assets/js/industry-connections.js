 /* ── Reveal on scroll ── */
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); revObs.unobserve(e.target); } });
    }, { threshold: 0.10 });
    document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

    /* ── MOU filter ── */
    document.querySelectorAll('.fb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.fb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.mou-card').forEach(card => {
          card.style.display = (f === 'all' || card.dataset.sector === f) ? '' : 'none';
        });
      });
    });

    /* ── Staggered entrances ── */
    const animEls = document.querySelectorAll(
      '.mou-card, .pg-item, .process-card, .sector-card, .stat-block, .benefit-card, .fm-scope-card'
    );
    const scObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(entry.target.parentElement.children).indexOf(entry.target);
          entry.target.style.transitionDelay = Math.min(idx * 0.08, 0.4) + 's';
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

    /* ── Animated counters ── */
    document.querySelectorAll('.stat-num').forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const match = el.textContent.match(/(\d+)/);
            if (!match) return;
            const target = parseInt(match[1]);
            const suffix = el.innerHTML.replace(match[1], '');
            let cur = 0; const step = Math.ceil(target / 50);
            const t = setInterval(() => {
              cur = Math.min(cur + step, target);
              el.innerHTML = cur + suffix;
              if (cur >= target) clearInterval(t);
            }, 28);
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      obs.observe(el);
    });

    /* ── Partners ticker ── */
    const partners = [
      { name: 'Imarticus Learning', icon: 'fa-star' },
      { name: 'Deloitte India',     icon: 'fa-building' },
      { name: 'ICICI Bank',         icon: 'fa-landmark' },
      { name: 'Infosys BPM',        icon: 'fa-laptop-code' },
      { name: 'Ernst & Young',      icon: 'fa-chart-line' },
      { name: 'Internshala',        icon: 'fa-graduation-cap' },
      { name: 'Razorpay',           icon: 'fa-mobile-screen' },
      { name: 'Reliance Retail',    icon: 'fa-shop' },
      { name: 'KGMU',               icon: 'fa-hospital' },
      { name: 'TCS',                icon: 'fa-code' },
      { name: 'HDFC Bank',          icon: 'fa-credit-card' },
      { name: 'Wipro',              icon: 'fa-server' },
      { name: 'Axis Bank',          icon: 'fa-landmark' },
      { name: 'Byju\'s',            icon: 'fa-book-open' },
      { name: 'Accenture',          icon: 'fa-globe' },
    ];
    const track = document.getElementById('mqTrack');
    [...partners, ...partners].forEach(p => {
      const chip = document.createElement('div');
      chip.className = 'rchip';
      chip.innerHTML = `<i class="fa-solid ${p.icon}"></i>${p.name}`;
      track.appendChild(chip);
    });