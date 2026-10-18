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
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close navigation menu');
      panel.setAttribute('aria-hidden', 'false');
      return;
    }

    panel.classList.remove('open');
    backdrop.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
    panel.setAttribute('aria-hidden', 'true');
  }

  function open() {
    setOpenState(true);
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
    panel.setAttribute('aria-hidden', 'true');
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);

  var currentPageLink = document.querySelector('#menu-panel .menu-link.current');
  if (currentPageLink) currentPageLink.setAttribute('aria-current', 'page');

  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;
    if (panel && panel.classList.contains('open')) close();
  });
});
