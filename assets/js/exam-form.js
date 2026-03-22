
    /* ── Password show/hide ── */
    const pwdInput      = document.getElementById('password');
    const pwdToggleIcon = document.getElementById('pwdToggleIcon');
    document.getElementById('pwdToggle').addEventListener('click', () => {
      const show = pwdInput.type === 'password';
      pwdInput.type = show ? 'text' : 'password';
      pwdToggleIcon.className = show ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    });

    /* ── Login submit ── */
    const btn    = document.getElementById('loginBtn');
    const errBox = document.getElementById('formErr');
    const errMsg = document.getElementById('errMsg');

    btn.addEventListener('click', function () {
      const roll = document.getElementById('rollNo').value.trim();
      const pwd  = document.getElementById('password').value.trim();
      errBox.classList.remove('show');
      if (!roll || !pwd) {
        errMsg.textContent = 'Both Roll Number and Password are required.';
        errBox.classList.add('show'); return;
      }
      btn.classList.add('loading');
      btn.querySelector('.fa-arrow-right-to-bracket').style.display = 'none';
      setTimeout(() => {
        const form = document.createElement('form');
        form.method = 'POST'; form.action = 'https://exam.npgc.in/';
        [['rollno', roll], ['password', pwd]].forEach(([n, v]) => {
          const inp = document.createElement('input');
          inp.type='hidden'; inp.name=n; inp.value=v; form.appendChild(inp);
        });
        document.body.appendChild(form); form.submit();
      }, 800);
    });

    ['rollNo','password'].forEach(id => {
      document.getElementById(id).addEventListener('keydown', e => {
        if (e.key === 'Enter') btn.click();
      });
    });

    /* ── Reveal on scroll ── */
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('active'); revObs.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

    /* ── Staggered instruction cards ── */
    const instrCards = document.querySelectorAll('.instr-card');
    const scObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(instrCards).indexOf(entry.target);
          entry.target.style.transitionDelay = (idx % 3) * 0.08 + 's';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          scObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    instrCards.forEach(c => {
      c.style.opacity = '0'; c.style.transform = 'translateY(22px)';
      c.style.transition = 'opacity 0.45s ease, transform 0.45s ease, border-color 0.3s, box-shadow 0.3s';
      scObs.observe(c);
    });