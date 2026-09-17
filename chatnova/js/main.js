/* ================================================================
   SAAS / AI LANDING PAGE — MAIN SCRIPT
   -----------------------------------------------------------------
   Features:
     1. Dark / light theme toggle (persisted in localStorage)
     2. Mobile menu open/close
     3. Sticky header shadow on scroll
     4. Scroll reveal animations (IntersectionObserver)
     5. Monthly / yearly billing toggle
   Customize the theme default and breakpoints below.
   ================================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     1. THEME TOGGLE (dark / light)
  ---------------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Read saved preference, else fall back to system preference.
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');

  html.setAttribute('data-theme', initialTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ----------------------------------------------------------------
     2. MOBILE MENU
  ---------------------------------------------------------------- */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('active', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link inside it is clicked.
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ----------------------------------------------------------------
     3. HEADER SHADOW ON SCROLL
  ---------------------------------------------------------------- */
  const header = document.getElementById('site-header');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS
  ---------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything immediately.
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ----------------------------------------------------------------
     5. BILLING TOGGLE (Monthly / Yearly)
  ---------------------------------------------------------------- */
  const billingToggle = document.getElementById('billing-toggle');
  const prices = document.querySelectorAll('[data-monthly][data-yearly]');

  function renderPrices(yearly) {
    prices.forEach((el) => {
      const value = yearly ? el.dataset.yearly : el.dataset.monthly;
      el.textContent = value === 'custom' ? 'Custom' : '$' + value;
    });
  }

  billingToggle.addEventListener('change', (e) => {
    renderPrices(e.target.checked);
  });

  /* ----------------------------------------------------------------
     Optional: smooth scroll offset for anchor links (all handled by CSS)
  ---------------------------------------------------------------- */
})();