// ── Year + Scroll Reveal ──
document.addEventListener('DOMContentLoaded', function() {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(function(el) { observer.observe(el); });

  // Create the theme wipe overlay
  var wipe = document.createElement('div');
  wipe.className = 'theme-wipe';
  wipe.setAttribute('aria-hidden', 'true');
  wipe.innerHTML =
    '<div class="theme-wipe__fill"></div>' +
    '<div class="theme-wipe__trail theme-wipe__trail--top"></div>' +
    '<div class="theme-wipe__trail theme-wipe__trail--bottom"></div>' +
    '<div class="theme-wipe__light" data-pos="top"></div>' +
    '<div class="theme-wipe__light theme-wipe__light--bottom" data-pos="bottom"></div>';
  document.body.appendChild(wipe);
});

// ── Theme Wipe: Parallel Leading Lights with Trails ──
var _wipeId = null;

function runWipeAnimation(onSwitch) {
  var wipe = document.querySelector('.theme-wipe');
  if (!wipe) { onSwitch(); return; }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onSwitch(); return; }

  var fill = wipe.querySelector('.theme-wipe__fill');
  var lightTop = wipe.querySelector('[data-pos="top"]');
  var lightBottom = wipe.querySelector('[data-pos="bottom"]');
  var trailTop = wipe.querySelector('.theme-wipe__trail--top');
  var trailBottom = wipe.querySelector('.theme-wipe__trail--bottom');
  var w = window.innerWidth;

  // Snapshot old background as a reliable RGB value
  var bg = getComputedStyle(document.body).backgroundColor;
  fill.style.background = bg;

  // Start with fill fully visible (no mask)
  fill.style.maskImage = 'none';
  fill.style.webkitMaskImage = 'none';
  fill.style.opacity = '1';

  // Reset trails
  trailTop.style.width = '0';
  trailBottom.style.width = '0';
  trailTop.style.opacity = '0';
  trailBottom.style.opacity = '0';

  // Show wipe container
  wipe.style.visibility = 'visible';

  // Switch theme IMMEDIATELY so new colors render underneath the fill
  onSwitch();

  // Force a repaint so the new theme is rendered under the fill
  void document.body.offsetHeight;

  var dur = 700;
  var t0 = null;
  var trailFadeDur = 350;

  if (_wipeId) cancelAnimationFrame(_wipeId);

  function frame(ts) {
    if (!t0) t0 = ts;
    var p = Math.min((ts - t0) / dur, 1);

    // Ease-in-out cubic: slow start, fast middle, slow end
    var e = p < 0.5
      ? 4 * p * p * p
      : 1 - Math.pow(-2 * p + 2, 3) / 2;

    var xPx = e * w;
    var xPct = e * 100;

    // Mask: transparent on left (new theme), opaque on right (old theme fill).
    // Feather shrinks to zero as it approaches the right edge so no residue lingers.
    var featherMax = 2.5;
    var remainingPct = 100 - xPct;
    var feather = Math.min(featherMax, remainingPct / 2);

    var leftStop = Math.max(0, xPct - feather);
    var rightStop = Math.min(100, xPct + feather);

    if (xPct >= 100) {
      // Fully swept: fill completely transparent
      fill.style.maskImage = 'linear-gradient(to right, transparent 0%, transparent 100%)';
      fill.style.webkitMaskImage = 'linear-gradient(to right, transparent 0%, transparent 100%)';
    } else {
      fill.style.maskImage = 'linear-gradient(to right, transparent ' + leftStop + '%, black ' + rightStop + '%)';
      fill.style.webkitMaskImage = 'linear-gradient(to right, transparent ' + leftStop + '%, black ' + rightStop + '%)';
    }

    // Position lights: centered on the very top/bottom pixel of viewport
    lightTop.style.transform = 'translate(' + (xPx - 10) + 'px, -10px)';
    lightBottom.style.transform = 'translate(' + (xPx - 10) + 'px, 10px)';

    // Trails stretch from left to current position
    trailTop.style.width = Math.max(0, xPx) + 'px';
    trailBottom.style.width = Math.max(0, xPx) + 'px';
    trailTop.style.opacity = '1';
    trailBottom.style.opacity = '1';

    // Fade lights in at start, out at end
    var fadeIn = Math.min(1, p * 10);
    var fadeOut = Math.max(0, 1 - (p - 0.9) / 0.1);
    lightTop.style.opacity = String(Math.min(fadeIn, fadeOut));
    lightBottom.style.opacity = String(Math.min(fadeIn, fadeOut));

    if (p < 1) {
      _wipeId = requestAnimationFrame(frame);
    } else {
      // Sweep complete: fade out trails
      var fadeStart = null;
      function fadeTrails(ts2) {
        if (!fadeStart) fadeStart = ts2;
        var fp = Math.min((ts2 - fadeStart) / trailFadeDur, 1);
        trailTop.style.opacity = String(1 - fp);
        trailBottom.style.opacity = String(1 - fp);

        if (fp < 1) {
          requestAnimationFrame(fadeTrails);
        } else {
          wipe.style.visibility = 'hidden';
          fill.style.maskImage = '';
          fill.style.webkitMaskImage = '';
          fill.style.background = '';
          fill.style.opacity = '';
          lightTop.style.opacity = '0';
          lightBottom.style.opacity = '0';
          lightTop.style.transform = '';
          lightBottom.style.transform = '';
          trailTop.style.width = '0';
          trailBottom.style.width = '0';
          trailTop.style.opacity = '0';
          trailBottom.style.opacity = '0';
          _wipeId = null;
        }
      }
      requestAnimationFrame(fadeTrails);
    }
  }

  _wipeId = requestAnimationFrame(frame);
}

// ── Heading Glitch: random color glitch on all major headings ──
// Desktop: hover to trigger. Mobile: permanent slow shuffle.
document.addEventListener('DOMContentLoaded', function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var headings = document.querySelectorAll(
    '.hero__heading, .section__heading, .contact__heading, .post__title, .blog-empty__heading'
  );

  function randomOklch() {
    var l = 40 + Math.random() * 45;
    var c = 0.1 + Math.random() * 0.15;
    var h = Math.floor(Math.random() * 360);
    return 'oklch(' + l.toFixed(0) + '% ' + c.toFixed(2) + ' ' + h + ')';
  }

  function triggerGlitch(el) {
    el.style.setProperty('--glitch-color-1', randomOklch());
    el.style.setProperty('--glitch-color-2', randomOklch());
    el.classList.remove('heading-glitch', 'glitching');
    void el.offsetWidth;
    el.classList.add('heading-glitch', 'glitching');
  }

  var isMobile = window.matchMedia('(hover: none)').matches || window.innerWidth <= 768;

  headings.forEach(function(h) {
    // Set data-text for the pseudo-elements
    h.setAttribute('data-text', h.textContent);
    h.classList.add('heading-glitch');

    if (isMobile) {
      // Mobile: glitch every 3-6 seconds randomly
      function mobileLoop() {
        var delay = 600 + Math.random() * 800;
        setTimeout(function() {
          triggerGlitch(h);
          mobileLoop();
        }, delay);
      }
      // Start after a random initial delay so they don't all fire at once
      setTimeout(mobileLoop, 200 + Math.random() * 500);
    } else {
      // Desktop: glitch on hover
      h.addEventListener('mouseenter', function() {
        triggerGlitch(h);
      });
    }

    // Clean up glitching class after animation ends
    h.addEventListener('animationend', function() {
      h.classList.remove('glitching');
    });
  });
});
