 /* ── Reveal ── */
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); revObs.unobserve(e.target); } });
    }, { threshold: 0.10 });
    document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

    /* ── Filter ── */
    document.querySelectorAll('.fb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.fb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.fair-card').forEach(card => {
          card.style.display = (f === 'all' || card.dataset.type === f) ? '' : 'none';
        });
      });
    });

    /* ── Staggered entrances ── */
    const animEls = document.querySelectorAll('.fair-card, .pg-item, .process-card, .story-card, .stat-block, .stall-card');
    const scObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(entry.target.parentElement.children).indexOf(entry.target);
          entry.target.style.transitionDelay = Math.min(idx * 0.07, 0.4) + 's';
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

    /* ── Live countdown ── */
    const fairDate = new Date('2025-09-25T09:00:00');
    function updateCountdown() {
      const now = new Date();
      const diff = fairDate - now;
      if (diff <= 0) {
        ['cd-days','cd-hrs','cd-min','cd-sec'].forEach(id => { const el = document.getElementById(id); if(el) el.textContent = '00'; });
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hrs  = Math.floor((diff % 86400000) / 3600000);
      const min  = Math.floor((diff % 3600000)  / 60000);
      const sec  = Math.floor((diff % 60000)    / 1000);
      const pad  = n => String(n).padStart(2,'0');
      const d = document.getElementById('cd-days'); if(d) d.textContent = pad(days);
      const h = document.getElementById('cd-hrs');  if(h) h.textContent = pad(hrs);
      const m = document.getElementById('cd-min');  if(m) m.textContent = pad(min);
      const s = document.getElementById('cd-sec');  if(s) s.textContent = pad(sec);
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ── Ticker ── */
    const companies = [
      { name: 'Deloitte India',   icon: 'fa-building'     },
      { name: 'ICICI Bank',       icon: 'fa-landmark'     },
      { name: 'Infosys BPM',      icon: 'fa-laptop-code'  },
      { name: 'Reliance Retail',  icon: 'fa-shop'         },
      { name: 'Ernst & Young',    icon: 'fa-chart-line'   },
      { name: 'Razorpay',         icon: 'fa-mobile-screen'},
      { name: 'HDFC Bank',        icon: 'fa-credit-card'  },
      { name: 'Wipro',            icon: 'fa-server'       },
      { name: 'Amazon',           icon: 'fa-box'          },
      { name: 'TCS',              icon: 'fa-code'         },
      { name: 'KGMU',             icon: 'fa-hospital'     },
      { name: 'Axis Bank',        icon: 'fa-landmark'     },
      { name: 'HCL Tech',         icon: 'fa-microchip'    },
      { name: 'Accenture',        icon: 'fa-globe'        },
      { name: 'Byju\'s',          icon: 'fa-book-open'    },
    ];
    const track = document.getElementById('mqTrack');
    [...companies, ...companies].forEach(c => {
      const chip = document.createElement('div');
      chip.className = 'rchip';
      chip.innerHTML = `<i class="fa-solid ${c.icon}"></i>${c.name}`;
      track.appendChild(chip);
    });