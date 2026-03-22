    /* ── Reveal on scroll ── */
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); revObs.unobserve(e.target); } });
    }, { threshold: 0.10 });
    document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

    /* ── Workshop filter ── */
    document.querySelectorAll('.fb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.fb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.ws-card').forEach(card => {
          card.style.display = (f === 'all' || card.dataset.sector === f) ? '' : 'none';
        });
      });
    });

    /* ── Staggered entrances ── */
    const animEls = document.querySelectorAll('.ws-card, .pg-item, .process-card, .story-card, .stat-block, .benefit-card, .course-card, .upcoming-item');
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

    /* ── Skills ticker ── */
    const skills = [
      { name: 'Imarticus Learning', icon: 'fa-star' },
      { name: 'Financial Modelling', icon: 'fa-chart-line' },
      { name: 'Data Analytics',     icon: 'fa-database' },
      { name: 'Capital Markets',    icon: 'fa-landmark' },
      { name: 'Python Programming', icon: 'fa-laptop-code' },
      { name: 'Power BI',           icon: 'fa-chart-bar' },
      { name: 'Communication',      icon: 'fa-comments' },
      { name: 'Digital Marketing',  icon: 'fa-bullhorn' },
      { name: 'HR Management',      icon: 'fa-people-group' },
      { name: 'Entrepreneurship',   icon: 'fa-rocket' },
      { name: 'Excel Mastery',      icon: 'fa-table' },
      { name: 'Mock Interviews',    icon: 'fa-user-tie' },
      { name: 'Resume Writing',     icon: 'fa-file-lines' },
      { name: 'Stock Trading',      icon: 'fa-arrow-trend-up' },
      { name: 'Business Analytics', icon: 'fa-magnifying-glass-chart' },
    ];
    const track = document.getElementById('mqTrack');
    [...skills, ...skills].forEach(s => {
      const chip = document.createElement('div');
      chip.className = 'rchip';
      chip.innerHTML = `<i class="fa-solid ${s.icon}"></i>${s.name}`;
      track.appendChild(chip);
    });