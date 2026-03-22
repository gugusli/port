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

/* ── EFECTO: GLITCH EN "ARAGÓN" ──────────────────────────
   800ms después de cargar, una sola vez, nunca se repite. */
window.addEventListener('load', () => {
  setTimeout(() => {
    const em = document.querySelector('.hero-title em');
    if (em) {
      em.classList.add('glitch-ready');
      em.addEventListener('animationend', () => em.classList.remove('glitch-ready'), { once: true });
    }
  }, 800);
});

/* ── EFECTO: TYPEWRITER CON INTERFERENCIA ────────────────
   La descripción de Siren Protocol se escribe como
   una transmisión. Caracteres basura aparecen y se
   autocorrigen antes de que llegue el carácter real. */
const SIREN_TEXT = 'Hace treinta años, algo pasó. El área resultante sigue creciendo.\nSEREN lleva veintiún años aprendiendo a leer patrones que nadie más puede leer.\nSEREN nunca miente. Solo selecciona qué verdades son útiles compartir en cada momento.\nEl jugador entra. Lo que encuentra depende de lo que trae.';
const GLITCH_CHARS = '▓▒░█▄▀■□▪▫';
const DESC_EL = document.getElementById('siren-desc');

function typeTransmission(el, text) {
  let i = 0, displayed = '';
  function typeNext() {
    if (i >= text.length) {
      el.innerHTML = text.replace(/\n/g, '<br>');
      el.classList.add('transmission-done');
      return;
    }
    const char = text[i];
    const shouldGlitch = Math.random() < 0.12 && char !== '\n' && char !== ' ';
    if (shouldGlitch) {
      const gc = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      el.innerHTML = (displayed + `<span style="color:#c0392b;opacity:.8">${gc}</span>`).replace(/\n/g, '<br>');
      setTimeout(() => {
        displayed += char === '\n' ? '\n' : char;
        i++;
        el.innerHTML = displayed.replace(/\n/g, '<br>');
        setTimeout(typeNext, 22 + Math.random() * 18);
      }, 65);
    } else {
      displayed += char === '\n' ? '\n' : char;
      i++;
      el.innerHTML = displayed.replace(/\n/g, '<br>');
      const delay = char === '.' ? 120 : char === '\n' ? 80 : 22 + Math.random() * 18;
      setTimeout(typeNext, delay);
    }
  }
  typeNext();
}

const projObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && DESC_EL && !DESC_EL.classList.contains('transmission-done')) {
      typeTransmission(DESC_EL, SIREN_TEXT);
      projObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
const projSection = document.getElementById('proyectos');
if (projSection) projObs.observe(projSection);

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
