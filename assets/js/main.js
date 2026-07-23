/* GD+ site interactions — vanilla JS, no dependencies */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- mobile nav ---- */
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelector('[data-nav-links]');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-open');
      links.classList.toggle('is-open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('is-open');
      links.classList.remove('is-open');
    }));
  }

  /* ---- scroll reveal ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 70}ms`;
      io.observe(el);
    });
  }

  /* ---- hero word rotator ---- */
  const rotator = document.querySelector('[data-rotate]');
  if (rotator) {
    const words = rotator.querySelectorAll('span');
    let idx = 0;
    words[0].classList.add('is-active');
    setInterval(() => {
      words[idx].classList.remove('is-active');
      idx = (idx + 1) % words.length;
      words[idx].classList.add('is-active');
    }, 2200);
  }

  /* ---- animated counters ---- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const dur = 1400;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target < 10 ? (target * eased).toFixed(1) : Math.round(target * eased);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io2.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(c => io2.observe(c));
  }

  /* ---- magnetic buttons ---- */
  const magnets = document.querySelectorAll('[data-magnetic]');
  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ---- tilt cards ---- */
  const tilts = document.querySelectorAll('[data-tilt]');
  tilts.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ---- custom cursor ---- */
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    window.addEventListener('mousemove', (e) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .card, [data-tilt]').forEach(el => {
      el.addEventListener('mouseenter', () => dot.classList.add('is-active'));
      el.addEventListener('mouseleave', () => dot.classList.remove('is-active'));
    });
  }

  /* ---- case study filters ---- */
  const chips = document.querySelectorAll('[data-filter]');
  const caseCards = document.querySelectorAll('[data-category]');
  if (chips.length && caseCards.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        const filter = chip.dataset.filter;
        caseCards.forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---- contact form (dummy submit + confetti) ---- */
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.querySelector('[data-form-success]');
      form.style.display = 'none';
      if (success) success.classList.add('is-visible');
      burstConfetti();
    });
  }

  function burstConfetti() {
    const colors = ['#ec5628', '#5799d2', '#ffcc02'];
    const originX = window.innerWidth / 2;
    const originY = window.innerHeight / 2.4;
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.background = colors[i % colors.length];
      piece.style.left = originX + 'px';
      piece.style.top = originY + 'px';
      document.body.appendChild(piece);
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 260;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist - 80;
      const rot = Math.random() * 720 - 360;
      piece.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${x}px, ${y + 300}px) rotate(${rot}deg)`, opacity: 0 }
      ], { duration: 1400 + Math.random() * 600, easing: 'cubic-bezier(.22,1,.36,1)' })
        .onfinish = () => piece.remove();
    }
  }
});
