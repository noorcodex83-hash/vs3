const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const dots = document.querySelectorAll('.testimonial-dot');
const slides = document.querySelectorAll('.testimonial-slide');
let activeSlide = 0;

const updateActiveNav = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href*="${id}"]`);
    if (link) {
      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
};

const showSlide = index => {
  slides.forEach((slide, idx) => slide.classList.toggle('active', idx === index));
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === index));
  activeSlide = index;
};

const nextSlide = () => {
  const nextIndex = (activeSlide + 1) % slides.length;
  showSlide(nextIndex);
};

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

dots.forEach(dot => {
  dot.addEventListener('click', () => showSlide(Number(dot.dataset.index)));
});

const header = document.querySelector('.topbar');
const onScrollHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);

const updateScrollVar = () => {
  document.documentElement.style.setProperty('--scrollY', `${window.scrollY}px`);
};

window.addEventListener('scroll', () => {
  updateActiveNav();
  onScrollHeader();
  updateScrollVar();
}, { passive: true });

const revealSelector = ['.hero-copy', '.visual-card', '.feature-card', '.property-card', '.tour-media', '.testimonial-slide', '.footer-copy', '.footer-form'];
const elems = document.querySelectorAll(revealSelector.join(', '));

elems.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

elems.forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll('.stat-value');

const formatCounter = (value, target) => {
  return Number.isInteger(target) ? `${Math.round(value)}` : `${Math.min(target, Math.max(0, value)).toFixed(1)}`;
};

const animateCounter = counter => {
  if (counter.dataset.animated) return;
  const target = parseFloat(counter.dataset.target);
  const duration = 2000;
  let startTime = null;

  const step = timestamp => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = target * progress;
    counter.textContent = formatCounter(value, target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      counter.dataset.animated = 'true';
      if (!Number.isInteger(target)) counter.textContent = target.toFixed(1);
    }
  };

  requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.35 });

counters.forEach(counter => counterObserver.observe(counter));

const playBtn = document.querySelector('.play-button');
if (playBtn) {
  playBtn.addEventListener('click', () => {
    playBtn.classList.add('clicked');
    setTimeout(() => playBtn.classList.remove('clicked'), 420);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  onScrollHeader();
  updateScrollVar();
  showSlide(0);
  setInterval(nextSlide, 7000);
  const h = document.querySelector('.hero-copy h1');
  if (h) h.classList.add('shimmer');
});
