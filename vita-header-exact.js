(() => {
  'use strict';

  const mobileMenu = document.querySelector('#mobilemenu');
  const burger = document.querySelector('#mobileheader .burger');
  const mobileTopContacts = document.querySelector('#mobile-top-contacts');
  const fixedHeader = document.querySelector('#headerfixed');
  const desktopHeader = document.querySelector('header.header-v4');

  // The production lazy-loader replaces this transparent placeholder with
  // the saved logo. Do the same locally without changing the original HTML.
  document.querySelectorAll('#mobileheader img[data-src], #headerfixed img[data-src]').forEach((image) => {
    if (image.dataset.src?.includes('muh4ltr42686ninvh2zc1pig9i1cfuwt.webp')) {
      image.src = './assets/muh4ltr42686ninvh2zc1pig9i1cfuwt.webp';
      image.classList.remove('lazy');
    }
  });

  // On the production page this list is populated from the desktop menu by
  // the template bundle. Keep the original mobile composition for this
  // desktop-only revision by taking it from the embedded production template.
  const mobileList = mobileMenu?.querySelector('.menu.top > ul.top');
  const mobileSourceRows = document.querySelector('#vita-original-mobile-menu')?.content.querySelectorAll('td.menu-item') ?? [];
  if (mobileList && !mobileList.children.length) {
    mobileSourceRows.forEach((cell) => {
      const sourceWrap = cell.querySelector(':scope > .wrap');
      const sourceLink = sourceWrap?.querySelector(':scope > a');
      if (!sourceLink) return;

      const item = document.createElement('li');
      const link = sourceLink.cloneNode(true);
      const dropdown = sourceWrap.querySelector(':scope > ul.dropdown-menu');
      if (dropdown) link.classList.add('parent');
      item.append(link);
      if (dropdown) item.append(dropdown.cloneNode(true));
      mobileList.append(item);
    });
  }

  // The sticky desktop header uses the revised desktop menu as well. This is
  // done after the mobile copy above so the mobile menu remains unchanged.
  const desktopMenu = desktopHeader?.querySelector('.menu-row .table-menu');
  const fixedMenu = fixedHeader?.querySelector('.table-menu');
  if (desktopMenu && fixedMenu) fixedMenu.innerHTML = desktopMenu.innerHTML;

  let overlay;

  const closeMobileMenu = () => {
    mobileMenu?.classList.remove('show');
    burger?.classList.remove('c');
    overlay?.remove();
    overlay = undefined;
    document.documentElement.style.overflow = '';
  };

  const openMobileMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.add('show');
    burger?.classList.add('c');
    overlay = document.createElement('div');
    overlay.id = 'mobilemenu-overlay';
    overlay.addEventListener('click', closeMobileMenu);
    mobileMenu.after(overlay);
    document.documentElement.style.overflow = 'hidden';
  };

  burger?.addEventListener('click', () => {
    mobileMenu?.classList.contains('show') ? closeMobileMenu() : openMobileMenu();
  });

  mobileMenu?.addEventListener('click', (event) => {
    const parent = event.target.closest('a.parent');
    if (parent) {
      event.preventDefault();
      parent.closest('li')?.classList.toggle('expanded');
      return;
    }
    if (event.target.closest('a')) closeMobileMenu();
  });

  const updateFixedHeader = () => {
    if (!fixedHeader || !desktopHeader) return;
    const shouldShow = innerWidth >= 992 && scrollY > desktopHeader.offsetHeight + 120;
    fixedHeader.style.display = shouldShow ? 'block' : '';
  };

  window.addEventListener('scroll', updateFixedHeader, { passive: true });
  window.addEventListener('resize', updateFixedHeader);

  const updateMobileTopContacts = () => {
    if (!mobileTopContacts) return;
    const shouldHide = innerWidth < 992 && scrollY > 8;
    mobileTopContacts.classList.toggle('is-hidden', shouldHide);
    mobileTopContacts.setAttribute('aria-hidden', shouldHide ? 'true' : 'false');
  };

  window.addEventListener('scroll', updateMobileTopContacts, { passive: true });
  window.addEventListener('resize', updateMobileTopContacts);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
  });
  updateFixedHeader();
  updateMobileTopContacts();
})();
