// NAIRO Lab — site navigation.
// Desktop: Team / Research open as dropdowns (hover, or click / Enter for touch and keyboard).
// Mobile (<= 860px): the whole menu collapses behind the "Menu" button and sub-lists are always shown.
(function () {
  var nav = document.getElementById('site-nav');
  var toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;
  var groups = Array.prototype.slice.call(nav.querySelectorAll('.has-sub'));
  var mobile = window.matchMedia('(max-width: 860px)');

  function setGroup(g, open) {
    g.classList.toggle('open', open);
    g.querySelector('.sub-toggle').setAttribute('aria-expanded', String(open));
  }
  function closeGroups(except) {
    groups.forEach(function (g) { if (g !== except) setGroup(g, false); });
  }
  function setPanel(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  groups.forEach(function (g) {
    var btn = g.querySelector('.sub-toggle');
    btn.addEventListener('click', function () {
      if (mobile.matches) return;
      var open = !g.classList.contains('open');
      closeGroups(g);
      setGroup(g, open);
    });
    g.addEventListener('focusout', function (e) {
      if (!mobile.matches && !g.contains(e.relatedTarget)) setGroup(g, false);
    });
  });

  toggle.addEventListener('click', function () { setPanel(!nav.classList.contains('open')); });

  document.addEventListener('click', function (e) {
    if (mobile.matches) {
      if (!e.target.closest('.topbar')) setPanel(false);
    } else if (!e.target.closest('.has-sub')) {
      closeGroups();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (mobile.matches) {
      if (nav.classList.contains('open')) { setPanel(false); toggle.focus(); }
      return;
    }
    groups.forEach(function (g) {
      if (g.classList.contains('open')) { setGroup(g, false); g.querySelector('.sub-toggle').focus(); }
    });
  });

  // keep aria state honest when the layout switches between desktop and mobile
  function sync() {
    groups.forEach(function (g) {
      setGroup(g, mobile.matches);
      g.querySelector('.sub-toggle').tabIndex = mobile.matches ? -1 : 0;
    });
    setPanel(false);
  }
  if (mobile.addEventListener) mobile.addEventListener('change', sync);
  else mobile.addListener(sync);
  sync();
})();

// Folded sections (<details class="fold">): images inside carry data-src and load only when the fold is
// opened, all at once. Hovering or focusing the toggle starts the download a moment early.
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('details.fold'), function (d) {
    var loaded = false;
    function load() {
      if (loaded) return;
      loaded = true;
      Array.prototype.forEach.call(d.querySelectorAll('img[data-src]'), function (img) {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
    }
    var s = d.querySelector('summary');
    d.addEventListener('toggle', function () { if (d.open) load(); });
    s.addEventListener('pointerenter', load);
    s.addEventListener('focus', load);
    // a link to something inside the fold (e.g. publications.html#conferences) opens it
    var t = location.hash && document.getElementById(location.hash.slice(1));
    if (t && d.contains(t)) { d.open = true; load(); t.scrollIntoView(); }
  });
})();
