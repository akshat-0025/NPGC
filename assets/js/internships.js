/* ── Reveal on scroll ── */
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); revObs.unobserve(e.target); } });
    }, { threshold: 0.10 });
    document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

    /* ── Sector filter ── */
    document.querySelectorAll('.fb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.fb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.intern-card').forEach(card => {
          card.style.display = (f === 'all' || card.dataset.sector === f) ? '' : 'none';
        });
      });
    });

    /* ── Staggered card entrances ── */
    const cards = document.querySelectorAll('.intern-card, .pg-item, .process-card, .story-card, .stat-block, .benefit-card');
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
    cards.forEach(c => {
      c.style.opacity = '0'; c.style.transform = 'translateY(20px)';
      c.style.transition = 'opacity 0.45s ease, transform 0.45s ease, border-color 0.3s, box-shadow 0.3s';
      scObs.observe(c);
    });

    /* ── Animated counters ── */
    const statNums = document.querySelectorAll('.stat-num');
    const cntObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const match = el.textContent.match(/(\d+)/);
          if (!match) return;
          const target = parseInt(match[1]);
          const suffix = el.innerHTML.replace(match[1], '');
          let cur = 0;
          const step = Math.ceil(target / 50);
          const t = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.innerHTML = cur + suffix;
            if (cur >= target) clearInterval(t);
          }, 28);
          cntObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => cntObs.observe(el));

    /* ── Companies ticker ── */
    const companies = [
      { name: 'Infosys',        icon: 'fa-laptop-code' },
      { name: 'Deloitte',       icon: 'fa-building' },
      { name: 'ICICI Bank',     icon: 'fa-landmark' },
      { name: 'Reliance Industries',icon: 'fa-shop' },
      { name: 'EY',  icon: 'fa-chart-line' },
      { name: 'PwC',       icon: 'fa-mobile-screen' },
      { name: 'TCS',            icon: 'fa-code' },
      { name: 'HDFC Bank',      icon: 'fa-landmark' },
      { name: 'Wipro',          icon: 'fa-server' },
      { name: 'KPMG',         icon: 'fa-box' },
      { name: 'Axis Bank',      icon: 'fa-credit-card' },
      { name: 'HCL Technologies',       icon: 'fa-microchip' },
      { name: 'Tech Mahindra',           icon: 'fa-car' },
      { name: 'Cognizant',      icon: 'fa-globe' },
      { name: 'Aditya Birla Group',        icon: 'fa-book-open' },
      { name: 'Jio',        icon: 'fa-book-open' },
      { name: 'Airtel',        icon: 'fa-book-open' },
      { name: 'Paytm',        icon: 'fa-book-open' },
      { name: 'Zomato',        icon: 'fa-book-open' },
    ];
    
    const track = document.getElementById('mqTrack');
    [...companies, ...companies].forEach(c => {
      const chip = document.createElement('div');
      chip.className = 'rchip';
      chip.innerHTML = `<i class="fa-solid ${c.icon}"></i>${c.name}`;
      track.appendChild(chip);
    });