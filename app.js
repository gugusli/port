/* ── SEMANA ──────────────────────────────────────────────────
   Cambiar solo este número para actualizar todo el portfolio. */
const SEMANA = 8;
document.querySelectorAll('[data-semana]').forEach(el => {
  el.textContent = String(SEMANA).padStart(2, '0');
});

/* ── EMAIL OBFUSCADO ─────────────────────────────────────── */
const _u = 'diegoagustinaragon', _d = 'gmail.com';
const _email = `${_u}@${_d}`;
document.querySelectorAll('.email-link').forEach(el => {
  el.href = `mailto:${_email}`;
});
const label = document.querySelector('.email-label');
if (label) label.textContent = _email;

/* ── HAMBURGER ───────────────────────────────────────────── */
const burger = document.querySelector('.nav-burger');
const mobilePanel = document.querySelector('.nav-mobile-panel');

burger?.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  if (open) {
    mobilePanel.style.display = 'flex';
    requestAnimationFrame(() => mobilePanel.classList.add('open'));
  } else {
    mobilePanel.classList.remove('open');
    mobilePanel.addEventListener('transitionend', () => {
      if (!mobilePanel.classList.contains('open')) mobilePanel.style.display = 'none';
    }, { once: true });
  }
});

mobilePanel?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobilePanel.classList.remove('open');
    setTimeout(() => { mobilePanel.style.display = 'none'; }, 220);
  });
});

/* ── NAV ACTIVE LINK ─────────────────────────────────────── */
const allNavLinks = document.querySelectorAll('.nav-links a, .nav-mobile-panel a');
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      allNavLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.35, rootMargin: '-10% 0px -10% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ── SCROLL REVEALS ──────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('section:not(#inicio)').forEach(s => revealObserver.observe(s));

/* ── SKILL BARS ──────────────────────────────────────────── */
const skillsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sk-fill').forEach(f => {
        const w = f.style.width; f.style.width = '0';
        setTimeout(() => f.style.width = w, 100);
      });
      skillsObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('#skills').forEach(s => skillsObs.observe(s));