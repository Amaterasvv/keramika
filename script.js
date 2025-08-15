// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when clicking a link (mobile UX)
  siteNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();


// Fade-in on scroll
const fadeElems = document.querySelectorAll('.fade-in');

// Kad element uđe u viewport, dodaj klasu 'visible'
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target); // prestani pratiti nakon animacije
    }
  });
}, { threshold: 0.1 });

fadeElems.forEach(elem => observer.observe(elem));
