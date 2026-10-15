/* Excello main.js — restrained motion only.
   Approved vocabulary: section intro 300-450ms with 6-10px travel, revealed once. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const nodes = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !nodes.length) {
    nodes.forEach(n => n.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  nodes.forEach(n => io.observe(n));
})();
