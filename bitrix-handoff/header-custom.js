(() => {
  'use strict';

  const bar = document.querySelector('#mobile-top-contacts');
  if (!bar) return;

  const update = () => {
    const hidden = window.innerWidth < 992 && window.scrollY > 8;
    bar.classList.toggle('is-hidden', hidden);
    bar.setAttribute('aria-hidden', hidden ? 'true' : 'false');
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
