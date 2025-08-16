// NAV kontrola
(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  const overlay = document.querySelector('.nav-overlay');
  const header = document.querySelector('.site-header');

  if(!navToggle || !nav || !overlay) return;

  const openNav = () => {
    navToggle.setAttribute('aria-expanded', 'true');
    nav.hidden = false;
    overlay.hidden = false;
    nav.classList.add('is-open');
    document.body.classList.add('nav-open');
  };

  const closeNav = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    // pričekaj animaciju pa sakrij elemente iz DOM toka
    setTimeout(() => { nav.hidden = true; overlay.hidden = true; }, 280);
  };

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });

  // Auto-zatvaranje nakon klika na link
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  // Robusno: postavi visinu headera u CSS var (ako se promijeni)
  const setHeaderH = () => {
    const h = header ? header.getBoundingClientRect().height : 64;
    document.documentElement.style.setProperty('--header-h', `${Math.round(h)}px`);
  };
  setHeaderH();
  window.addEventListener('resize', setHeaderH);

  // Header sjena pri scrollu
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
  });
})();

// Year in footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Fade-in on scroll
const fadeElems = document.querySelectorAll('.fade-in');
if (fadeElems.length){
  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    }
  }, { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0 });
  fadeElems.forEach(el => io.observe(el));
}
