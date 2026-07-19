document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  var cards = Array.from(document.querySelectorAll('.grid .card'));
  var visibleCount = document.getElementById('visible-count');

  function updateCount() {
    if (!visibleCount) return;
    var total = cards.length;
    var shown = cards.filter(function(card) { return card.style.display !== 'none'; }).length;
    visibleCount.textContent = shown + ' of ' + total + ' entries';
  }

  function filterCards() {
    var query = searchInput.value.trim().toLowerCase();
    cards.forEach(function(card) {
      var text = card.textContent.toLowerCase();
      card.style.display = query === '' || text.includes(query) ? '' : 'none';
    });
    updateCount();
  }

  searchInput.addEventListener('input', filterCards);
  updateCount();
});
