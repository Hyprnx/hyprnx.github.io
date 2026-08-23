window.hyprToggleNav = function hyprToggleNav(toggle) {
  var current = document.getElementById('hypr-mobile-drawer');
  if (current) {
    current.remove();
    var activeNav = document.querySelector('.nav');
    if (activeNav) activeNav.style.visibility = '';
    document.body.style.overflow = '';
    return;
  }

  var nav = toggle.closest('.nav');
  var sourceLinks = nav && nav.querySelectorAll('.nav__link');
  if (!sourceLinks || !sourceLinks.length) return;
  nav.style.visibility = 'hidden';

  var drawer = document.createElement('aside');
  drawer.id = 'hypr-mobile-drawer';
  drawer.setAttribute('aria-label', 'Site navigation');
  Object.assign(drawer.style, {
    position: 'fixed', top: '0', right: '0', left: '0', zIndex: '2147483647', display: 'flex',
    flexDirection: 'column', background: 'rgb(13 15 17)', color: 'rgb(232 236 239)',
    padding: '1rem 1.5rem 1.25rem', overflow: 'hidden'
  });

  var header = document.createElement('div');
  Object.assign(header.style, {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    paddingBottom: '0.75rem', borderBottom: '1px solid rgb(46 54 64)'
  });
  var title = document.createElement('strong');
  title.textContent = nav.querySelector('.nav__logo').textContent;
  title.style.cssText = 'font:700 1.125rem var(--mono);color:rgb(78 200 212)';
  var close = document.createElement('button');
  close.type = 'button';
  close.setAttribute('aria-label', 'Close navigation');
  close.textContent = '×';
  close.style.cssText = 'width:2.5rem;height:2.5rem;color:inherit;font-size:1.5rem;line-height:1;padding:0;background:none;border:0';
  header.append(title, close);

  var list = document.createElement('nav');
  Object.assign(list.style, { display: 'flex', flexDirection: 'column', gap: '0' });
  Array.prototype.forEach.call(sourceLinks, function(source) {
    var link = document.createElement('a');
    link.href = source.href;
    link.textContent = source.textContent;
    Object.assign(link.style, {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.75rem 0', borderBottom: '1px solid rgb(46 54 64)', color: 'inherit',
      fontSize: '0.875rem', fontWeight: '500', letterSpacing: 'normal'
    });
    var arrow = document.createElement('span');
    arrow.textContent = '↗';
    arrow.style.cssText = 'color:rgb(78 200 212);font:0.875rem var(--mono)';
    link.appendChild(arrow);
    list.appendChild(link);
    link.addEventListener('click', function(event) {
      if (link.dataset.hyprCurtainReady === 'true') return;
      event.preventDefault();
      event.stopPropagation();
      drawer.style.display = 'none';
      document.body.style.overflow = '';
      window.setTimeout(function() {
        link.dataset.hyprCurtainReady = 'true';
        link.click();
      }, 120);
    });
  });

  drawer.append(header, list);
  document.body.appendChild(drawer);
  document.body.style.overflow = 'hidden';
  drawer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
  Array.prototype.forEach.call(list.children, function(link, index) {
    link.animate(
      [{ opacity: 0, transform: 'translateY(-20px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 300, delay: 60 + index * 60, fill: 'both', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    );
  });

  var dismiss = function() {
    drawer.remove();
    nav.style.visibility = '';
    document.body.style.overflow = '';
  };
  close.addEventListener('click', dismiss);
  document.addEventListener('keydown', function onKey(event) {
    if (event.key !== 'Escape') return;
    dismiss();
    document.removeEventListener('keydown', onKey);
  });
};
window.__hyprNavigationReady = true;

// Motion runtime loader with a local mobile-navigation fallback for offline or blocked CDN sessions.
(function loadMotionRuntime() {
  var script = document.createElement('script');
  script.type = 'module';
  script.src = new URL('motion.js', document.currentScript.src).href;
  document.head.appendChild(script);

  window.setTimeout(function() {
    if (window.hyprMotion || window.__hyprNavigationReady) return;
    window.__hyprNavigationReady = true;

    document.querySelectorAll('.nav').forEach(function(nav) {
      var toggle = nav.querySelector('.nav__burger');
      var links = nav.querySelector('.nav__links');
      if (!toggle || !links) return;
      toggle.removeAttribute('onclick');

      var close = function() {
        nav.classList.remove('nav--open');
        document.body.style.overflow = '';
        links.removeAttribute('style');
        Array.prototype.forEach.call(links.querySelectorAll('a'), function(link) {
          link.removeAttribute('style');
        });
      };
      var open = function() {
        nav.classList.add('nav--open');
        document.body.style.overflow = 'hidden';
        Object.assign(links.style, {
          display: 'flex', position: 'fixed', inset: '0', zIndex: '999',
          flexDirection: 'column', justifyContent: 'center', gap: '0',
          padding: '7rem 2rem 2.5rem', background: 'rgb(13 15 17)'
        });
        Array.prototype.forEach.call(links.querySelectorAll('a'), function(link) {
          Object.assign(link.style, {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1.1rem 0', borderBottom: '1px solid rgb(46 54 64)',
            color: 'rgb(232 236 239)', fontSize: 'clamp(1.75rem, 9vw, 3.25rem)',
            fontWeight: '500', letterSpacing: '-0.04em'
          });
        });
      };

      toggle.addEventListener('click', function() {
        nav.classList.contains('nav--open') ? close() : open();
      });
      links.addEventListener('click', function(event) {
        if (event.target.closest('a')) close();
      });
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') close();
      });
    });
  }, 750);
}());
