    /* ── Reveal on scroll ── */
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('active'); revObs.unobserve(entry.target); }
      });
    }, { threshold: 0.10 });
    document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

    /* ── Drive sector filter ── */
    document.querySelectorAll('.df-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.df-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.drive-card').forEach(card => {
          const show = f === 'all' || card.dataset.sector === f;
          card.style.display = show ? '' : 'none';
        });
      });
    });

    /* ── Staggered card entrances ── */
    const staggerEls = document.querySelectorAll('.drive-card, .pg-item, .process-card, .upcoming-item, .stat-block');
    const scObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.children);
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = Math.min(idx * 0.08, 0.4) + 's';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          scObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    staggerEls.forEach(el => {
      el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease, border-color 0.3s, box-shadow 0.3s';
      scObs.observe(el);
    });

    /* ── Animated stat counters ── */
    const statNums = document.querySelectorAll('.stat-num');
    const cntObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const match = el.textContent.match(/(\d+)/);
          if (!match) return;
          const target = parseInt(match[1]);
          const suffix = el.innerHTML.replace(/\d+/, '');
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

    /* ── Recruiters ticker ── */
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
    const doubled = [...companies, ...companies];
    doubled.forEach(c => {
      const chip = document.createElement('div');
      chip.className = 'rchip';
      chip.innerHTML = `<i class="fa-solid ${c.icon}"></i>${c.name}`;
      track.appendChild(chip);
    });