// Mobile nav toggle + body scroll lock + ESC
const navToggle = document.querySelector('.nav-toggle');
const siteNav   = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  const closeNav = () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded','false');
    document.body.classList.remove('nav-open');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  });

  siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
}


// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();


// Fade-in on scroll (ranije trigeriranje + manje posla)
const fadeElems = document.querySelectorAll('.fade-in');

const io = new IntersectionObserver((entries, obs) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  }
}, {
  root: null,
  rootMargin: '0px 0px -20% 0px', // trigeriraj prije nego uđe skroz
  threshold: 0
});

fadeElems.forEach(el => io.observe(el));

// Header bg bez skupog blur-a
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});
