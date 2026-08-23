import { animate, hover, inView, press, stagger } from 'https://cdn.jsdelivr.net/npm/motion@12.35.1/+esm';

const ease = [0.16, 1, 0.3, 1];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const once = new WeakSet();

function isReduced() {
  return reducedMotion.matches;
}

function delayFromClass(element) {
  const match = element.className.match(/reveal-delay-(\d+)/);
  return match ? Number(match[1]) * 0.1 : 0;
}

function setYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

function reveal(element) {
  if (!element || once.has(element)) return;
  once.add(element);

  if (isReduced()) {
    element.style.opacity = '1';
    element.style.transform = 'none';
    return;
  }

  element.style.animation = 'none';
  element.style.transition = 'none';
  element.style.opacity = '0';
  element.style.transform = 'translateY(24px)';

  inView(element, () => {
    animate(
      element,
      { opacity: 1, y: 0 },
      { duration: 0.7, delay: delayFromClass(element), ease }
    );
  }, { amount: 0.1, margin: '0px 0px -40px 0px' });
}

function revealAll(root = document) {
  root.querySelectorAll('.reveal').forEach(reveal);
}

function createThemeWipe() {
  if (document.querySelector('.theme-wipe')) return;

  const wipe = document.createElement('div');
  wipe.className = 'theme-wipe';
  wipe.setAttribute('aria-hidden', 'true');
  wipe.innerHTML = `
    <div class="theme-wipe__fill"></div>
    <div class="theme-wipe__trail theme-wipe__trail--top"></div>
    <div class="theme-wipe__trail theme-wipe__trail--bottom"></div>
    <div class="theme-wipe__light" data-pos="top"></div>
    <div class="theme-wipe__light theme-wipe__light--bottom" data-pos="bottom"></div>
  `;
  document.body.appendChild(wipe);
}

async function runWipeAnimation(onSwitch) {
  createThemeWipe();
  if (isReduced()) {
    onSwitch();
    return;
  }

  const wipe = document.querySelector('.theme-wipe');
  const fill = wipe.querySelector('.theme-wipe__fill');
  const topLight = wipe.querySelector('[data-pos="top"]');
  const bottomLight = wipe.querySelector('[data-pos="bottom"]');
  const topTrail = wipe.querySelector('.theme-wipe__trail--top');
  const bottomTrail = wipe.querySelector('.theme-wipe__trail--bottom');
  const width = window.innerWidth;

  fill.style.background = getComputedStyle(document.body).backgroundColor;
  wipe.style.visibility = 'visible';
  [topTrail, bottomTrail].forEach((trail) => {
    trail.style.width = `${width}px`;
    trail.style.transformOrigin = 'left';
  });
  onSwitch();

  await animate([
    [fill, { clipPath: ['inset(0 0 0 0)', 'inset(0 0 0 100%)'] }, { duration: 0.7, ease }],
    [topLight, { x: [-10, width - 10], y: -10, opacity: [0, 1, 1, 0] }, { duration: 0.7, ease, at: '<' }],
    [bottomLight, { x: [-10, width - 10], y: 10, opacity: [0, 1, 1, 0] }, { duration: 0.7, ease, at: '<' }],
    [topTrail, { scaleX: [0, 1], opacity: [0, 1] }, { duration: 0.7, ease, at: '<' }],
    [bottomTrail, { scaleX: [0, 1], opacity: [0, 1] }, { duration: 0.7, ease, at: '<' }],
    [[topTrail, bottomTrail], { opacity: 0 }, { duration: 0.25, ease }]
  ]);

  wipe.style.visibility = 'hidden';
  fill.style.background = '';
  fill.style.clipPath = '';
}

function animateAtmosphere() {
  if (isReduced()) return;

  const primary = document.querySelector('.ambient-glow');
  const secondary = document.querySelector('.ambient-glow--secondary');
  if (primary) animate(primary, { x: [0, 80, 0], y: [0, 60, 0] }, { duration: 20, repeat: Infinity, ease: 'easeInOut' });
  if (secondary) animate(secondary, { x: [0, -60, 0], y: [0, -40, 0] }, { duration: 25, repeat: Infinity, ease: 'easeInOut' });

  document.querySelectorAll('.hero__heading em').forEach((element) => {
    element.style.animation = 'none';
    animate(element, { y: [0, -3, 0] }, { duration: 4, repeat: Infinity, ease: 'easeInOut' });
  });

  document.querySelectorAll('.blog-empty__signal').forEach((element) => {
    element.style.animation = 'none';
    animate(element, { opacity: [0.5, 1, 0.5] }, { duration: 3, repeat: Infinity, ease: 'easeInOut' });
  });
}

function animateHeadingGlitch(element) {
  if (isReduced()) return;
  const originalColor = getComputedStyle(element).color;
  const cyan = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const gold = getComputedStyle(document.documentElement).getPropertyValue('--cta').trim();
  animate(element, {
    x: [0, -3, 3, 0],
    color: [originalColor, cyan, gold, originalColor]
  }, { duration: 0.3, ease: 'easeOut' });
}

function animateHeadings() {
  document.querySelectorAll('.hero__heading, .section__heading, .contact__heading, .post__title, .blog-empty__heading, .contact-glitch').forEach((element) => {
    element.classList.remove('heading-glitch', 'glitching');
    element.addEventListener('mouseenter', () => animateHeadingGlitch(element));
  });
}

function animateInteractions() {
  const hoverTargets = [
    ['.preview-card, .project-card', { y: -4 }, { y: 0 }],
    ['.play-link', { x: 8 }, { x: 0 }],
    ['.btn-primary, .btn-ghost', { scale: 1.02 }, { scale: 1 }]
  ];

  hoverTargets.forEach(([selector, enter, leave]) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.style.transition = 'none';
      hover(element, () => {
        if (!isReduced()) animate(element, enter, { duration: 0.25, ease });
        return () => !isReduced() && animate(element, leave, { duration: 0.2, ease });
      });
    });
  });

  document.querySelectorAll('.btn-primary, .btn-ghost').forEach((element) => {
    press(element, () => {
      if (!isReduced()) animate(element, { scale: 0.97 }, { duration: 0.12, ease });
      return () => !isReduced() && animate(element, { scale: 1 }, { duration: 0.2, ease });
    });
  });
}

function animateSections() {
  document.querySelectorAll('.hero__label').forEach((label) => {
    const line = label.querySelector(':scope > *');
    if (line || isReduced()) return;
    label.style.setProperty('--motion-ready', 'true');
  });

  document.querySelectorAll('.project-featured').forEach((card) => {
    inView(card, () => {
      if (isReduced()) return;
      card.style.animation = 'none';
      animate(card, { opacity: [0, 1], y: [32, 0], scale: [0.98, 1] }, { duration: 0.7, ease });
      animate(card.querySelectorAll('.project-featured__highlight'), { opacity: [0, 1], x: [-20, 0] }, { duration: 0.4, delay: stagger(0.1, { startDelay: 0.35 }), ease });
    }, { amount: 0.2 });
  });

  document.querySelectorAll('.timeline--animated').forEach((timeline) => {
    inView(timeline, () => {
      if (isReduced()) return;
      const line = timeline;
      animate(line, { '--timeline-progress': ['0%', '100%'] }, { duration: 1.2, ease });
      animate(timeline.querySelectorAll('.timeline__dot'), { opacity: [0, 1], scale: [0, 1] }, { duration: 0.35, delay: stagger(0.12, { startDelay: 0.25 }), ease });
    }, { amount: 0.2 });
  });
}

function setupContact() {
  const links = [...document.querySelectorAll('.play-link')];
  if (!links.length) return;

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
  const randomCharacter = () => characters[Math.floor(Math.random() * characters.length)];
  const scramble = (element, reveal) => {
    const original = element.dataset.original || element.textContent;
    animate(0, original.length, {
      duration: 0.4,
      ease,
      onUpdate: (latest) => {
        const index = Math.round(latest);
        element.textContent = original.split('').map((character, position) => reveal && position < index ? character : randomCharacter()).join('');
      }
    });
  };

  const tooltip = document.getElementById('tooltip');
  links.forEach((link) => {
    link.removeAttribute('onclick');
    const value = link.querySelector('.scramble');
    if (value) scramble(value, false);

    hover(link, () => {
      if (value && !isReduced()) scramble(value, true);
      if (tooltip && !isReduced()) animate(tooltip, { opacity: 1 }, { duration: 0.15, ease });
      return () => {
        if (value && !isReduced()) scramble(value, false);
        if (tooltip && !isReduced()) animate(tooltip, { opacity: 0 }, { duration: 0.15, ease });
      };
    });

    link.addEventListener('pointermove', (event) => {
      if (!tooltip) return;
      tooltip.textContent = link.dataset.tooltip || '';
      tooltip.style.left = `${event.clientX + 16}px`;
      tooltip.style.top = `${event.clientY - 8}px`;
    });

    link.addEventListener('click', (event) => {
      event.preventDefault();
      const ripple = document.createElement('div');
      ripple.className = 'play-link__ripple';
      ripple.style.width = ripple.style.height = '100px';
      ripple.style.left = `${event.clientX - link.getBoundingClientRect().left - 50}px`;
      ripple.style.top = `${event.clientY - link.getBoundingClientRect().top - 50}px`;
      link.appendChild(ripple);
      animate(ripple, { scale: [0, 4], opacity: [0.8, 0] }, { duration: 0.6, ease }).then(() => ripple.remove());

      if (link.dataset.download) {
        const confetti = document.getElementById('confetti');
        for (let index = 0; index < 20; index += 1) {
          const piece = document.createElement('div');
          piece.className = 'confetti';
          piece.style.left = `${event.clientX + Math.random() * 100 - 50}px`;
          piece.style.top = `${event.clientY}px`;
          piece.style.background = `var(${['--accent', '--cta', '--text-primary', '--text-muted'][index % 4]})`;
          confetti.appendChild(piece);
          animate(piece, { opacity: [1, 0], y: [0, 120], rotate: [0, 720], scale: [1, 0.3] }, { duration: 1, delay: Math.random() * 0.2, ease }).then(() => piece.remove());
        }
      }

      window.setTimeout(() => {
        const href = link.dataset.href;
        if (link.dataset.download) {
          const download = document.createElement('a');
          download.href = href;
          download.download = '';
          download.click();
        } else if (href.startsWith('mailto:')) {
          window.location.href = href;
        } else {
          window.open(href, '_blank', 'noopener');
        }
      }, 400);
    });
  });

  const cursor = document.querySelector('.status-line__cursor');
  if (cursor && !isReduced()) {
    cursor.style.animation = 'none';
    animate(cursor, { opacity: [1, 0, 1] }, { duration: 1, repeat: Infinity, ease: 'linear' });
  }

  const status = document.getElementById('status-text');
  const messages = document.documentElement.lang === 'vi'
    ? ['trạng thái: sẵn sàng cho những cuộc trò chuyện thú vị', 'trạng thái: chắc đang debug gì đó', 'trạng thái: năng lượng từ cà phê sữa đá', 'trạng thái: xây tương lai, mỗi lần một pipeline']
    : ['status: available for interesting conversations', 'status: probably debugging something right now', 'status: fueled by ca phe sua da', 'status: building the future, one pipeline at a time'];
  if (status && !isReduced()) {
    let position = 0;
    window.setInterval(() => {
      position = (position + 1) % messages.length;
      animate(status, { opacity: [1, 0] }, { duration: 0.18, ease }).then(() => {
        status.textContent = messages[position];
        animate(status, { opacity: [0, 1] }, { duration: 0.28, ease });
      });
    }, 5000);
  }

  const count = document.getElementById('visit-count');
  if (count) {
    const visits = Number(localStorage.getItem('hyprnx-visits') || '0') + 1;
    localStorage.setItem('hyprnx-visits', visits);
    count.textContent = document.documentElement.lang === 'vi'
      ? (visits === 1 ? 'lần đầu ghé? chào mừng đến sân chơi.' : `lần thứ ${visits}. quay lại rồi à. thích đấy.`)
      : (visits === 1 ? 'first time here? welcome to the playground.' : `visit #${visits}. you came back. nice.`);
  }
}

function createPageCurtain() {
  let curtain = document.querySelector('.page-curtain');
  if (curtain) return curtain;

  curtain = document.createElement('div');
  curtain.className = 'page-curtain';
  curtain.setAttribute('aria-hidden', 'true');
  curtain.innerHTML = `
    <div class="page-curtain__backdrop"></div>
    <div class="page-curtain__panel page-curtain__panel--left"></div>
    <div class="page-curtain__panel page-curtain__panel--right"></div>
    <div class="page-curtain__copy">
      <span class="page-curtain__eyebrow">Now entering</span>
      <strong class="page-curtain__title"></strong>
    </div>
  `;
  document.body.appendChild(curtain);
  return curtain;
}

function pageLabel(destination) {
  const url = new URL(destination, window.location.href);
  const locale = url.pathname.split('/').includes('vi') ? 'vi' : 'en';
  const page = url.pathname.split('/').pop().replace('.html', '') || 'index';
  const labels = {
    en: { index: 'Home', about: 'About', projects: 'Projects', blog: 'Blog', contact: 'Contact', post: 'Transmission' },
    vi: { index: 'Trang chủ', about: 'Giới thiệu', projects: 'Dự án', blog: 'Blog', contact: 'Liên hệ', post: 'Bài viết' }
  };
  return labels[locale][page] || labels[locale].index;
}

function setCurtainLabel(curtain, label) {
  curtain.querySelector('.page-curtain__title').textContent = label;
  curtain.querySelector('.page-curtain__eyebrow').textContent = document.documentElement.lang === 'vi' ? 'Đang mở' : 'Now entering';
}

function isInternalPageLink(event, link) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (link.target || link.hasAttribute('download')) return false;

  const destination = new URL(link.href, window.location.href);
  if (destination.origin !== window.location.origin) return false;
  if (destination.hash && destination.pathname === window.location.pathname) return false;
  return destination.pathname.endsWith('.html') || destination.pathname.endsWith('/');
}

async function coverPage(destination, label) {
  if (isReduced()) {
    window.location.assign(destination);
    return;
  }

  const curtain = createPageCurtain();
  const panels = curtain.querySelectorAll('.page-curtain__panel');
  const backdrop = curtain.querySelector('.page-curtain__backdrop');
  const copy = curtain.querySelector('.page-curtain__copy');
  setCurtainLabel(curtain, label);
  curtain.style.visibility = 'visible';
  curtain.style.pointerEvents = 'auto';
  await animate([
    [backdrop, { opacity: 1 }, { duration: 0 }],
    [panels[0], { x: ['-115%', '0%'], rotate: [12, 12] }, { duration: 0.52, ease }],
    [panels[1], { x: ['115%', '0%'], rotate: [12, 12] }, { duration: 0.52, ease, at: '<' }],
    [copy, { opacity: [0, 1], y: [24, 0] }, { duration: 0.3, ease, at: '<+0.12' }]
  ]);
  sessionStorage.setItem('hyprnx-page-curtain', 'open');
  sessionStorage.setItem('hyprnx-page-title', label);
  window.location.assign(destination);
}

function setupPageTransitions() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || !isInternalPageLink(event, link)) return;
    event.preventDefault();
    coverPage(link.href, pageLabel(link.href));
  });

  if (sessionStorage.getItem('hyprnx-page-curtain') !== 'open') return;
  sessionStorage.removeItem('hyprnx-page-curtain');
  if (isReduced()) return;

  const curtain = createPageCurtain();
  const panels = curtain.querySelectorAll('.page-curtain__panel');
  const backdrop = curtain.querySelector('.page-curtain__backdrop');
  const copy = curtain.querySelector('.page-curtain__copy');
  setCurtainLabel(curtain, sessionStorage.getItem('hyprnx-page-title') || pageLabel(window.location.href));
  sessionStorage.removeItem('hyprnx-page-title');
  curtain.style.visibility = 'visible';
  curtain.style.pointerEvents = 'auto';
  animate([
    [backdrop, { opacity: [1, 0] }, { duration: 0.52, ease, at: 0.2 }],
    [copy, { opacity: [1, 0], y: [0, -16] }, { duration: 0.2, ease, at: 0.16 }],
    [panels[0], { x: ['0%', '-115%'], rotate: [12, 12] }, { duration: 0.52, ease, at: 0.2 }],
    [panels[1], { x: ['0%', '115%'], rotate: [12, 12] }, { duration: 0.52, ease, at: '<' }]
  ]).then(() => {
    curtain.style.visibility = 'hidden';
    curtain.style.pointerEvents = 'none';
  });
}

function setupMobileNavigation() {
  if (window.__hyprNavigationReady) return;
  window.__hyprNavigationReady = true;
  const mobile = window.matchMedia('(max-width: 768px)');
  document.querySelectorAll('.nav').forEach((nav) => {
    const toggle = nav.querySelector('.nav__burger');
    const links = nav.querySelector('.nav__links');
    if (!toggle || !links) return;

    toggle.removeAttribute('onclick');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mobile-navigation');
    links.id = 'mobile-navigation';

    const items = [...links.querySelectorAll('a')];
    const close = (immediate = false) => {
      if (!nav.classList.contains('nav--open')) return;
      const finish = () => {
        nav.classList.remove('nav--open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-menu-open');
        links.removeAttribute('style');
      };
      if (immediate || isReduced()) return finish();
      animate(items, { opacity: 0, y: -16 }, { duration: 0.14, delay: stagger(0.025, { from: 'last' }), ease });
      animate(links, { opacity: 0 }, { duration: 0.18, ease }).then(finish);
    };
    const open = () => {
      nav.classList.add('nav--open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-menu-open');
      Object.assign(links.style, {
        display: 'flex', position: 'fixed', inset: '0', zIndex: '2',
        flexDirection: 'column', justifyContent: 'center', gap: '0',
        padding: '7rem 2rem 2.5rem', background: 'var(--bg-surface)'
      });
      if (isReduced()) return;
      animate(links, { opacity: [0, 1] }, { duration: 0.2, ease });
      animate(items, { opacity: [0, 1], y: [-20, 0] }, { duration: 0.32, delay: stagger(0.06, { startDelay: 0.06 }), ease });
    };

    toggle.addEventListener('click', () => nav.classList.contains('nav--open') ? close() : open());
    items.forEach((link) => link.addEventListener('click', () => close(true)));
    document.addEventListener('keydown', (event) => event.key === 'Escape' && close());
    mobile.addEventListener('change', (event) => !event.matches && close(true));
  });
}

function observeDynamicReveals() {
  const observer = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      if (node.matches('.reveal')) reveal(node);
      revealAll(node);
    }));
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function boot() {
  setYear();
  createThemeWipe();
  revealAll();
  animateAtmosphere();
  animateHeadings();
  animateInteractions();
  animateSections();
  setupContact();
  setupPageTransitions();
  setupMobileNavigation();
  observeDynamicReveals();
}

window.runWipeAnimation = runWipeAnimation;
window.hyprMotion = { animate, revealAll, runWipeAnimation };

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
