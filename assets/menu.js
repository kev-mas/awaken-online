document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('menu-btn');
  var panel = document.getElementById('menu-panel');
  var backdrop = document.getElementById('menu-backdrop');
  var closeBtn = document.getElementById('menuClose');

  function open() {
    panel.classList.add('open');
    backdrop.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function close() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  if (btn) {
    btn.addEventListener('click', open);
    btn.setAttribute('aria-controls', 'menu-panel');
    btn.setAttribute('aria-expanded', 'false');
  }
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);

  var currentPageLink = document.querySelector('#menu-panel .menu-link.current');
  if (currentPageLink) currentPageLink.setAttribute('aria-current', 'page');

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') close();
  });
});
