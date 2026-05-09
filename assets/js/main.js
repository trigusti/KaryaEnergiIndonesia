/* PT Karya Energi Indonesia — Main JS */

// ─── Hamburger menu ───
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

// ─── Active nav link ───
const currentPath = window.location.pathname;
document.querySelectorAll('.navbar-nav a, .mobile-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (!href) return;
  const linkPath = new URL(href, window.location.origin).pathname;
  if (linkPath === currentPath || (currentPath.startsWith(linkPath) && linkPath !== '/')) {
    link.classList.add('active');
  }
  if (currentPath === '/' && linkPath === '/') {
    link.classList.add('active');
  }
});

// ─── Scroll reveal ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => {
  const delay = el.dataset.delay || 0;
  el.style.transition = 'opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)';
  el.style.transitionDelay = delay + 'ms';
  revealObserver.observe(el);
});

document.addEventListener('animationend', () => {}, { passive: true });

// Revealed state — add subtle lift on reveal
const style = document.createElement('style');
style.textContent = '[data-reveal] { opacity: 0.999; } .revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ─── Counter animation ───
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isFloat = el.dataset.float === 'true';
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const current = target * ease;
    el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
