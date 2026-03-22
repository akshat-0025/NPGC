    /* ── Captcha refresh ── */
    function refreshCaptcha(e) {
      if (e) e.stopPropagation();
      const img  = document.getElementById('captchaImg');
      const icon = document.querySelector('#refreshCaptcha i');
      const newSrc = 'https://npgcfees.in/stuadmis/captcha.php?rand=' + Date.now();
      icon.style.transition = 'transform 0.5s ease';
      icon.style.transform  = 'rotate(360deg)';
      setTimeout(() => { icon.style.transition = 'none'; icon.style.transform = 'rotate(0deg)'; }, 520);
      img.style.opacity = '0.35';
      const tmp = new Image();
      tmp.onload  = () => { img.src = newSrc; img.style.opacity = '1'; };
      tmp.onerror = () => { img.src = newSrc + '&t=' + Date.now(); img.style.opacity = '1'; };
      tmp.src = newSrc;
    }
    document.getElementById('refreshCaptcha').addEventListener('click', refreshCaptcha);
    document.getElementById('captchaBox').addEventListener('click', refreshCaptcha);

    /* ── Login submit ── */
    const btn    = document.getElementById('loginBtn');
    const errBox = document.getElementById('formErr');
    const errMsg = document.getElementById('errMsg');

    btn.addEventListener('click', function () {
      const roll   = document.getElementById('rollNo').value.trim();
      const mobile = document.getElementById('mobile').value.trim();
      const cap    = document.getElementById('captchaInput').value.trim();
      errBox.classList.remove('show');
      if (!roll || !mobile || !cap) {
        errMsg.textContent = 'All fields are required. Please fill in every field.';
        errBox.classList.add('show'); return;
      }
      if (!/^\d{10}$/.test(mobile)) {
        errMsg.textContent = 'Please enter a valid 10-digit mobile number.';
        errBox.classList.add('show'); return;
      }
      btn.classList.add('loading');
      btn.querySelector('.fa-arrow-right-to-bracket').style.display = 'none';
      setTimeout(() => {
        const form = document.createElement('form');
        form.method = 'POST'; form.action = 'https://npgcfees.in/stuadmis/mlogin.php';
        [['roll',roll],['mobile',mobile],['captcha',cap]].forEach(([n,v]) => {
          const inp = document.createElement('input');
          inp.type='hidden'; inp.name=n; inp.value=v; form.appendChild(inp);
        });
        document.body.appendChild(form); form.submit();
      }, 900);
    });

    ['rollNo','mobile','captchaInput'].forEach(id => {
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

    /* ── Staggered cards ── */
    const allCards = document.querySelectorAll('.step-card, .cat-card');
    const scObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(allCards).indexOf(entry.target);
          entry.target.style.transitionDelay = (idx % 4) * 0.1 + 's';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          scObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    allCards.forEach(c => {
      c.style.opacity = '0'; c.style.transform = 'translateY(24px)';
      c.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
      scObs.observe(c);
    });