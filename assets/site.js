(() => {
  'use strict';
  const storageKey = 'forexlab.website.language';
  const button = document.querySelector('[data-language-toggle]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.getElementById('primary-navigation');
  const titles = {en: document.body.dataset.titleEn, ar: document.body.dataset.titleAr};
  let language = 'en';
  const requested = new URL(location.href).searchParams.get('lang');
  let saved = 'en';
  try { saved = localStorage.getItem(storageKey); } catch { /* Preference storage is optional. */ }
  language = requested === 'ar' || requested === 'en' ? requested : saved === 'ar' ? 'ar' : 'en';

  function applyLanguage(next, persist = false) {
    language = next;
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.title = titles[next];
    document.querySelectorAll('[data-en][data-ar]').forEach(node => {
      node.textContent = node.dataset[next];
    });
    document.querySelectorAll('[data-aria-en][data-aria-ar]').forEach(node => {
      node.setAttribute('aria-label', next === 'ar' ? node.dataset.ariaAr : node.dataset.ariaEn);
    });
    const description = document.querySelector('meta[name="description"]');
    description.content = next === 'ar' ? description.dataset.ar : description.dataset.en;
    button.textContent = next === 'en' ? 'العربية' : 'English';
    button.lang = next === 'en' ? 'ar' : 'en';
    button.setAttribute('aria-label', next === 'en' ? 'Switch to Arabic' : 'Switch to English');
    document.querySelectorAll('a[data-local]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      url.searchParams.set('lang', next);
      link.setAttribute('href', `${url.pathname.split('/').pop() || 'index.html'}${url.search}${url.hash}`);
    });
    if (persist) {
      try { localStorage.setItem(storageKey, next); } catch { /* Optional preference only. */ }
      const url = new URL(location.href);
      url.searchParams.set('lang', next);
      history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    }
  }
  button.addEventListener('click', () => applyLanguage(language === 'en' ? 'ar' : 'en', true));
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu(); menuButton.focus();
    }
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  applyLanguage(language);
})();
