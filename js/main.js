// ===== Curseur personnalisé =====
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
 
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
 
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();
 
// ===== Notes flottantes =====
const noteSymbols = ['♩','♪','♫','♬','🎵','🎶','🎼','🎸','🎹','🎺','🥁'];
const container = document.getElementById('floatingNotes');
 
for (let i = 0; i < 18; i++) {
  const note = document.createElement('div');
  note.className = 'note';
  note.textContent = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
  note.style.left = Math.random() * 100 + 'vw';
  note.style.bottom = '-2rem';
  const dur = 6 + Math.random() * 10;
  const delay = Math.random() * 8;
  note.style.animation = `floatNote ${dur}s ${delay}s linear infinite`;
  note.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
  container.appendChild(note);
}
 
// ===== Equalizer =====
const eq = document.getElementById('heroEq');
 
for (let i = 0; i < 48; i++) {
  const bar = document.createElement('div');
  bar.className = 'eq-bar';
  bar.style.height = (20 + Math.random() * 80) + '%';
  bar.style.animationDuration = (0.4 + Math.random() * 0.8) + 's';
  bar.style.animationDelay = (Math.random() * 0.5) + 's';
  eq.appendChild(bar);
}
 
// ===== Scroll reveal cards =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('is-visible'), i * 150);
      cardObserver.unobserve(e.target);
    }
  });
}, observerOptions);
 
document.querySelectorAll('.card').forEach(c => cardObserver.observe(c));
 
// ===== Compteurs animés =====
function animateCounter(el, duration = 1500) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const startTime = performance.now();
 
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);
    el.textContent = value.toLocaleString('fr-FR') + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString('fr-FR') + suffix;
  }
  requestAnimationFrame(update);
}
 
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
 
document.querySelectorAll('.stat__number').forEach(el => statsObserver.observe(el));
 
// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});