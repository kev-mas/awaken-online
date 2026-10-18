document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('menu-btn');
  var panel = document.getElementById('menu-panel');
  var backdrop = document.getElementById('menu-backdrop');
  var closeBtn = document.getElementById('menuClose');

  function setOpenState(isOpen) {
    if (!btn || !panel || !backdrop) return;

    if (isOpen) {
      panel.classList.add('open');
      backdrop.classList.add('open');
      panel.inert = false;
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close navigation menu');
      panel.setAttribute('aria-hidden', 'false');
      if (closeBtn) closeBtn.focus();
      return;
    }

    panel.classList.remove('open');
    backdrop.classList.remove('open');
    panel.inert = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
    panel.setAttribute('aria-hidden', 'true');
    btn.focus();
  }

  function close() {
    setOpenState(false);
  }

  function toggle() {
    if (!panel || !backdrop || !btn) return;
    setOpenState(!panel.classList.contains('open'));
  }

  if (btn) {
    btn.addEventListener('click', toggle);
    btn.setAttribute('aria-controls', 'menu-panel');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
  }

  if (panel) {
    panel.inert = true;
    panel.setAttribute('aria-hidden', 'true');
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);

  var currentPageLink = document.querySelector('#menu-panel .menu-link.current');
  if (currentPageLink) currentPageLink.setAttribute('aria-current', 'page');

  document.addEventListener('keydown', function(e) {
    if (!panel || !panel.classList.contains('open')) return;

    if (e.key === 'Escape') {
      close();
      return;
    }

    if (e.key !== 'Tab') return;

    var focusableItems = panel.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableItems.length) return;

    var firstItem = focusableItems[0];
    var lastItem = focusableItems[focusableItems.length - 1];
    if (e.shiftKey && document.activeElement === firstItem) {
      e.preventDefault();
      lastItem.focus();
    } else if (!e.shiftKey && document.activeElement === lastItem) {
      e.preventDefault();
      firstItem.focus();
    }
  });
});
