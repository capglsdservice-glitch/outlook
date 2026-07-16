// mobile nav
const burger = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
}));

// sticky nav background
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// menu tab filter
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCards = document.querySelectorAll('.menu-card');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    menuCards.forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.classList.toggle('show', show);
    });
  });
});

// live open/closed status (8:00 - 22:30 local time)
(function setStatus(){
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  const chip = dot.closest('.chip');
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = mins >= 8*60 && mins < 22*60+30;
  if (open) {
    text.textContent = 'Open now · Closes 10:30 PM';
  } else {
    chip.classList.add('closed');
    text.textContent = 'Closed · Opens 8:00 AM';
  }
})();

// footer year
document.getElementById('year').textContent = new Date().getFullYear();

// string lights generator
(function stringLights(){
  const holder = document.getElementById('stringLights');
  const count = 24;
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'bulb';
    const t = i / (count - 1);
    const x = t * 100;
    const y = 6 + Math.sin(t * Math.PI * 2.2) * 5 + (t * 4);
    b.style.left = x + '%';
    b.style.top = y + '%';
    b.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
    holder.appendChild(b);
  }
})();

// marquee duplicate for seamless loop
(function marqueeDup(){
  const track = document.getElementById('marqueeTrack');
  track.innerHTML += track.innerHTML;
})();

// reservation form (demo only, no backend)
(function reserveForm(){
  const form = document.getElementById('reserveForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.reserve-submit');
    const original = btn.textContent;
    btn.textContent = 'Request Sent ✓';
    btn.style.opacity = '0.75';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.opacity = '1';
      form.reset();
    }, 2600);
  });
})();
