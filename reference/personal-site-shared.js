/* Alembic pitch document — interactions
   Restrained: theme toggle, scroll progress, section rail,
   scroll-reveal, ConceptTip tooltips, Heidi/Alembic toggle,
   image lightbox. No framework, no build step. */

(() => {
  'use strict';

  // Signal to CSS that JS is running — enables the reveal hide-then-show.
  // Without this class, .reveal elements stay visible (graceful degradation).
  document.documentElement.classList.add('js-ready');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── theme (light/dark) ───────────────────────────────── */

  const THEME_KEY = 'alembic-theme';
  const root = document.documentElement;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
  }

  // Initial: saved if the reader chose one before, otherwise always
  // open in dark (forest-green) mode so the first impression is Alembic's.
  const saved = (() => { try { return localStorage.getItem(THEME_KEY); } catch (_) { return null; } })();
  applyTheme(saved === 'light' ? 'light' : 'dark');

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="toggle-theme"]');
    if (!btn) return;
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  /* ─── scroll progress bar ───────────────────────────────── */

  const progress = document.querySelector('.scroll-progress .fill');
  if (progress && !prefersReduced) {
    let ticking = false;
    const tick = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (scrolled / max) * 100 : 0;
      progress.style.setProperty('--p', p.toFixed(2) + '%');
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(tick); ticking = true; }
    }, { passive: true });
    tick();
  }

  /* ─── section rail (active-section dot) ─────────────────── */

  const sections = Array.from(document.querySelectorAll('section[id]'));
  const railDots = Array.from(document.querySelectorAll('.rail .dot'));

  railDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const id = dot.dataset.target;
      const s = document.getElementById(id);
      if (s) s.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    });
  });

  if (sections.length && railDots.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          railDots.forEach((d) => d.classList.toggle('active', d.dataset.target === id));
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    sections.forEach((s) => observer.observe(s));
  }

  /* ─── reveal on scroll ──────────────────────────────────── */

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach((el) => revealObserver.observe(el));
  }

  /* ─── ConceptTip (teaching-layer demo) ─────────────────── */

  const tipEl = document.createElement('div');
  tipEl.className = 'concept-tip';
  tipEl.setAttribute('role', 'tooltip');
  document.body.appendChild(tipEl);

  let activeConcept = null;
  let hideTimer = null;
  const isMobile = () => window.matchMedia('(max-width: 700px)').matches;
  // A device reports (hover: hover) only if it has a primary pointing device
  // capable of hover — i.e. a real mouse or trackpad. Touch-only devices
  // (iPhone, most iPads in touch mode) return false here.
  const canHover = () => window.matchMedia('(hover: hover)').matches;

  function showTip(concept) {
    const title = concept.dataset.term || concept.textContent;
    const defn = concept.dataset.def || '';
    tipEl.innerHTML = '<b>' + escapeHtml(title) + '</b>' + escapeHtml(defn);

    if (isMobile()) {
      // On mobile, insert the tip right after the concept and expand inline.
      if (concept.nextElementSibling !== tipEl) concept.after(tipEl);
      tipEl.classList.add('show');
    } else {
      document.body.appendChild(tipEl);
      // Position above the concept.
      const rect = concept.getBoundingClientRect();
      tipEl.classList.add('show');
      // measure after show (to get real dimensions)
      requestAnimationFrame(() => {
        const tipRect = tipEl.getBoundingClientRect();
        let left = rect.left + (rect.width / 2) - (tipRect.width / 2);
        // clamp to viewport
        const margin = 16;
        const maxLeft = window.innerWidth - tipRect.width - margin;
        left = Math.max(margin, Math.min(left, maxLeft));
        const top = rect.top + window.scrollY - tipRect.height - 14;
        tipEl.style.left = left + 'px';
        tipEl.style.top = top + 'px';
        tipEl.style.position = 'absolute';
        const arrowX = rect.left + rect.width / 2 - left - 6;
        tipEl.style.setProperty('--arrow-x', Math.max(12, Math.min(tipRect.width - 18, arrowX)) + 'px');
      });
    }
    activeConcept = concept;
  }

  function hideTip() {
    tipEl.classList.remove('show');
    activeConcept = null;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  // Hover-to-show is ONLY enabled on devices that actually hover (mouse/
  // trackpad). Touch devices skip the mouseover path entirely so a tap
  // doesn't "hover then click" and cancel itself.
  document.addEventListener('mouseover', (e) => {
    if (!canHover()) return;
    const c = e.target.closest('.concept');
    if (!c) return;
    clearTimeout(hideTimer);
    if (activeConcept !== c) showTip(c);
  });
  document.addEventListener('mouseout', (e) => {
    if (!canHover()) return;
    const c = e.target.closest('.concept');
    if (!c) return;
    hideTimer = setTimeout(hideTip, 140);
  });
  tipEl.addEventListener('mouseenter', () => { if (canHover()) clearTimeout(hideTimer); });
  tipEl.addEventListener('mouseleave', () => { if (canHover()) hideTimer = setTimeout(hideTip, 140); });

  // Click / tap behaviour — works on every device.
  // First tap on a concept opens the tip. Tap outside closes it.
  // Tapping the same concept a second time also closes it (touch-friendly dismiss).
  function handleConceptClick(c, e) {
    e.preventDefault();
    e.stopPropagation();
    if (activeConcept === c) hideTip();
    else showTip(c);
  }

  // Attach click handlers directly to each concept. iOS Safari only
  // synthesises click from a tap when the element itself has a listener
  // attached (pure document-delegation doesn't trigger tap→click on
  // non-interactive spans). Using both direct + delegated handlers makes
  // this robust across browsers.
  document.querySelectorAll('.concept').forEach((c) => {
    c.addEventListener('click', (e) => handleConceptClick(c, e));
  });

  // Delegated handler: dismisses the tip when tapping anywhere else.
  document.addEventListener('click', (e) => {
    if (e.target.closest('.concept')) return;      // handled above
    if (e.target.closest('.concept-tip')) return;  // don't dismiss when tapping the tip itself
    if (activeConcept) hideTip();
  });

  // Keyboard focus-based tooltip opening is only helpful on hover-capable
  // (mouse/trackpad) devices. On touch, tap already focuses the element,
  // and a focusout would fire the instant the user lifts their finger —
  // which would dismiss the tooltip they just summoned.
  document.addEventListener('focusin', (e) => {
    if (!canHover()) return;
    const c = e.target.closest('.concept');
    if (c) showTip(c);
  });
  document.addEventListener('focusout', (e) => {
    if (!canHover()) return;
    const c = e.target.closest('.concept');
    if (c) hideTimer = setTimeout(hideTip, 140);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeConcept) hideTip();
  });

  /* ─── compare toggle (Heidi vs Alembic) ────────────────── */

  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.compare-tab');
    if (!tab) return;
    const group = tab.closest('.compare');
    if (!group) return;
    const target = tab.dataset.tab;
    group.querySelectorAll('.compare-tab').forEach((t) => {
      t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
    });
    group.querySelectorAll('.compare-panel').forEach((p) => {
      p.classList.toggle('active', p.dataset.panel === target);
    });
  });

  /* ─── image lightbox ───────────────────────────────────── */

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'Enlarged screenshot');
  lightbox.innerHTML = '<img alt="">';
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector('img');

  document.addEventListener('click', (e) => {
    const img = e.target.closest('figure.screenshot img');
    if (img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else if (e.target.closest('.lightbox')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

})();
