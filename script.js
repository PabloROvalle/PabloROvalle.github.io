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

// Local, periodically updated bibliography. No API keys are ever sent to visitors.
async function loadPublications() {
  const list = document.getElementById('publication-list');
  const note = document.getElementById('publication-note');
  if (!list) return;
  try {
    const response = await fetch(`publications.json?v=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const publications = Array.isArray(data.works) ? data.works : [];
    list.replaceChildren();
    if (!publications.length) {
      const message = document.createElement('p');
      message.className = 'pub-status';
      message.textContent = 'The publication list is not synchronized yet. You can view my complete ORCID record using the link below.';
      list.append(message);
      return;
    }
    for (const work of publications) {
      const row = document.createElement('article');
      row.className = 'publication';
      const year = document.createElement('span');
      year.className = 'pub-year';
      year.textContent = work.year || '—';
      const body = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = work.title || 'Untitled work';
      const venue = document.createElement('p');
      venue.className = 'pub-venue';
      venue.textContent = work.venue || 'Research publication';
      body.append(title);
      if (Array.isArray(work.authors) && work.authors.length) {
        const authors = document.createElement('p');
        authors.className = 'pub-authors';
        work.authors.forEach((person, index) => {
          if (index) authors.append(document.createTextNode(', '));
          const name = document.createElement(person.is_self ? 'strong' : 'span');
          name.textContent = person.name || '';
          if (person.is_self) name.className = 'pub-self';
          authors.append(name);
        });
        body.append(authors);
      }
      body.append(venue);
      const link = document.createElement('a');
      link.className = 'pub-link';
      link.href = /^https:\/\//.test(work.url || '') ? work.url : 'https://orcid.org/0000-0003-2594-2128';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `Read ${title.textContent}`);
      link.textContent = '↗';
      row.append(year, body, link);
      list.append(row);
    }
    if (data.updated_at) {
      const time = document.createElement('time');
      time.dateTime = data.updated_at;
      time.textContent = ` Last synchronized: ${new Date(data.updated_at).toLocaleDateString('en-GB')}.`;
      note.append(time);
    }
  } catch (error) {
    list.replaceChildren();
    const message = document.createElement('p');
    message.className = 'pub-status';
    message.textContent = 'Publications could not be loaded. Please see my ORCID profile below.';
    list.append(message);
  }
}
loadPublications();
