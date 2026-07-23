/* ============================================================
   Meherab Hossain — Portfolio scripts
   No dependencies. Everything degrades gracefully.
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const saved = localStorage.getItem('mh-theme');
  if (saved) root.setAttribute('data-theme', saved);

  $('#themeToggle')?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('mh-theme', next);
  });

  /* ---------- Year ---------- */
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- Nav: sticky, burger, scrollspy, progress ---------- */
  const nav     = $('#nav');
  const links   = $('#navLinks');
  const burger  = $('#burger');
  const bar     = $('#progress');
  const toTop   = $('#toTop');

  burger?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('x', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    burger?.classList.remove('x');
    burger?.setAttribute('aria-expanded', 'false');
  }));

  const sections = $$('main section[id]');
  const navMap = new Map();
  $$('#navLinks a[href^="#"]').forEach(a => navMap.set(a.getAttribute('href').slice(1), a));

  let ticking = false;
  function onScroll() {
    const yPos = window.scrollY;
    nav?.classList.toggle('stuck', yPos > 20);
    toTop?.classList.toggle('show', yPos > 700);

    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (yPos / h) * 100 : 0) + '%';

    let current = '';
    const probe = yPos + window.innerHeight * 0.32;
    sections.forEach(s => { if (s.offsetTop <= probe) current = s.id; });
    navMap.forEach((a, id) => a.classList.toggle('active', id === current));

    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  toTop?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  );

  /* ---------- Typing line ---------- */
  const typedEl = $('#typed');
  if (typedEl) {
    const phrases = JSON.parse(typedEl.dataset.phrases || '[]');
    if (reduced) {
      typedEl.textContent = phrases[0] || '';
    } else {
      let p = 0, c = 0, deleting = false;
      (function tick() {
        const word = phrases[p];
        c += deleting ? -1 : 1;
        typedEl.textContent = word.slice(0, c);
        let wait = deleting ? 38 : 68;
        if (!deleting && c === word.length) { wait = 1900; deleting = true; }
        else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; wait = 320; }
        setTimeout(tick, wait);
      })();
    }
  }

  /* ---------- Reveal on scroll ---------- */
  const revealables = $$('.rv');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('in'));
  }

  /* ---------- Count-up stats ---------- */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = target + suffix; return; }
    const dur = 1400, t0 = performance.now();
    (function frame(now) {
      const k = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (k < 1) requestAnimationFrame(frame);
    })(t0);
  }
  const counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  } else counters.forEach(countUp);

  /* ---------- Skill bars ---------- */
  const fills = $$('.fill[data-level]');
  if ('IntersectionObserver' in window) {
    const bio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.level + '%';
          bio.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    fills.forEach(el => bio.observe(el));
  } else fills.forEach(el => el.style.width = el.dataset.level + '%');

  /* ---------- Publication filter ---------- */
  const filterBtns = $$('.filter');
  const pubs = $$('.pub');
  const countEl = $('#pubCount');

  function applyFilter(key) {
    let shown = 0;
    pubs.forEach(p => {
      const match = key === 'all' || p.dataset.type === key;
      p.hidden = !match;
      if (match) shown++;
    });
    if (countEl) countEl.textContent = shown;
  }

  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.setAttribute('aria-selected', 'false'));
    btn.setAttribute('aria-selected', 'true');
    applyFilter(btn.dataset.filter);
  }));
  applyFilter('all');

  /* ---------- Photo fallback ---------- */
  const photo = $('#profilePhoto');
  const placeholder = $('#photoPlaceholder');
  if (photo && placeholder) {
    const showPlaceholder = () => { photo.style.display = 'none'; placeholder.style.display = 'grid'; };
    const hidePlaceholder = () => { placeholder.style.display = 'none'; photo.style.display = 'block'; };
    if (photo.complete) { photo.naturalWidth > 0 ? hidePlaceholder() : showPlaceholder(); }
    photo.addEventListener('load', hidePlaceholder);
    photo.addEventListener('error', showPlaceholder);
  }

})();
