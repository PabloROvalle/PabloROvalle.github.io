const header = document.querySelector('.site-header');
const nav = document.querySelector('.site-nav');
const menuButton = document.querySelector('.menu-toggle');
const hero = document.querySelector('.hero');
const heroPhoto = document.querySelector('.hero-photo');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function handleScroll() {
  header.classList.toggle('scrolled', window.scrollY > 60);
  // Limit scroll-based transforms for better performance.
  if (!reducedMotion.matches && window.innerWidth > 760 && window.scrollY < hero.offsetHeight) {
    heroPhoto.style.setProperty('--parallax', `${Math.round(window.scrollY * 0.24)}px`);
  }
}
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', handleScroll);
handleScroll();

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuButton.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  menuButton.textContent = '☰';
}));

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}
document.getElementById('year').textContent = new Date().getFullYear();
