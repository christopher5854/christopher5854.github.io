/* ─────────────────────────────────────────────
   CHRISTOPHER TOA — Portfolio JS
───────────────────────────────────────────── */

// ── CURSOR ──
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

document.addEventListener('mousemove', e => {
  cursor.style.left      = e.clientX + 'px';
  cursor.style.top       = e.clientY + 'px';
  setTimeout(() => {
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top  = e.clientY + 'px';
  }, 60);
});

document.querySelectorAll('a, button, .tech-item, .project-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform      = 'translate(-50%, -50%) scale(1.8)';
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.4)';
    cursorTrail.style.borderColor = 'var(--cyan)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform      = 'translate(-50%, -50%) scale(1)';
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE NAV ──
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
navToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('.mnav-link').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ── REVEAL ON SCROLL ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));

// ── HERO REVEALS ── (trigger immediately for hero)
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });
});

// ── STAT COUNTER ANIMATION ──
const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute('data-target');
      let count = 0;
      const duration = 1200;
      const step = Math.ceil(duration / target) || 30;
      const timer = setInterval(() => {
        count += 1;
        el.textContent = count;
        if (count >= target) {
          el.textContent = target;
          clearInterval(timer);
        }
      }, step);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));

// ── TERMINAL TYPEWRITER ──
function typeText(elementId, text, speed = 50) {
  return new Promise(resolve => {
    const el = document.getElementById(elementId);
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

async function runTerminal() {
  await new Promise(r => setTimeout(r, 600));
  await typeText('cmd1', 'whoami --full', 55);
  await new Promise(r => setTimeout(r, 300));
  document.getElementById('output1').style.display = 'block';
  await new Promise(r => setTimeout(r, 700));
  document.getElementById('line2').style.display = 'block';
  await typeText('cmd2', 'cat stack.json', 55);
  await new Promise(r => setTimeout(r, 300));
  document.getElementById('output2').style.display = 'block';
  await new Promise(r => setTimeout(r, 500));
  document.getElementById('line3').style.display = 'block';
}

runTerminal();

// ── SMOOTH NAV ACTIVE HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--cyan)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── TECH CARD GLITCH EFFECT ──
document.querySelectorAll('.tech-item').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.setProperty('--glitch', '1');
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--glitch', '0');
  });
});

// ── PARALLAX GRID ──
window.addEventListener('scroll', () => {
  const gridBg = document.querySelector('.grid-bg');
  if (gridBg) {
    gridBg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
  }
});