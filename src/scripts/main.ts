import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const motion = root.classList.contains('motion');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document) => Array.from(ctx.querySelectorAll<T>(sel) as NodeListOf<T>);

/* ------------------------------------------------------------------ */
/* Smooth scroll                                                       */
/* ------------------------------------------------------------------ */
let lenis: Lenis | null = null;
if (motion) {
  lenis = new Lenis({ lerp: 0.115, anchors: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
(window as any).__lenis = lenis;

export function scrollToTarget(target: string | HTMLElement | number) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (el === null) return;
  if (lenis) lenis.scrollTo(el as any, { offset: 0, duration: 1.4 });
  else if (typeof el === 'number') window.scrollTo({ top: el });
  else el.scrollIntoView();
}

// In-page links (#id) use the smooth scroller and move focus for keyboard users.
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href')!;
  if (id === '#') return;
  const target = document.querySelector<HTMLElement>(id);
  if (!target) return;
  e.preventDefault();
  scrollToTarget(id === '#main' ? 0 : target);
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});

/* ------------------------------------------------------------------ */
/* Header: hide on scroll down, adapt colour to the section beneath    */
/* ------------------------------------------------------------------ */
const header = document.querySelector<HTMLElement>('[data-header]');
const toTop = document.querySelector<HTMLElement>('[data-to-top]');
const progress = document.querySelector<HTMLElement>('[data-progress]');
if (header) {
  let lastY = window.scrollY;
  let down = 0;
  const bar = header.querySelector<HTMLElement>('.site-header__bar');
  const onScroll = () => {
    const y = window.scrollY;
    const menuOpen = root.classList.contains('menu-open');
    header.classList.toggle('is-scrolled', y > 40);
    // Comes back the moment the page moves up; only tucks away after a real scroll down
    if (y < lastY || y < 300) { down = 0; header.classList.remove('is-hidden'); }
    else if (!menuOpen) { down += y - lastY; if (down > 90) header.classList.add('is-hidden'); }
    // The highlight on the glass travels with the scroll
    if (bar && !bar.matches(':hover')) bar.style.setProperty('--sheen', `${8 + 84 * Math.min(1, y / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))}%`);
    toTop?.classList.toggle('is-visible', y > window.innerHeight);
    if (progress) progress.style.transform = `scaleX(${Math.min(1, y / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))})`;
    lastY = y;
  };
  if (lenis) lenis.on('scroll', onScroll);
  else window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
  bar?.addEventListener('pointermove', (e) => { const r = bar.getBoundingClientRect(); bar.style.setProperty('--sheen', `${((e.clientX - r.left) / r.width) * 100}%`); });

  $$('[data-theme-section]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: () => `top ${header.offsetHeight / 2}px`,
      end: () => `bottom ${header.offsetHeight / 2}px`,
      onToggle: (self) => { if (self.isActive) header.dataset.on = section.dataset.themeSection; },
    });
  });
}

/* ------------------------------------------------------------------ */
/* Menu                                                                */
/* ------------------------------------------------------------------ */
const burger = document.querySelector<HTMLButtonElement>('[data-burger]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
if (burger && menu) {
  const focusables = () => [burger, ...$$<HTMLElement>('a', menu)];
  const setOpen = (open: boolean) => {
    root.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) { lenis?.stop(); document.body.style.overflow = 'hidden'; }
    else { lenis?.start(); document.body.style.overflow = ''; }
    (menu as any).inert = !open;
  };
  (menu as any).inert = true;
  burger.addEventListener('click', () => setOpen(!root.classList.contains('menu-open')));
  menu.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (!root.classList.contains('menu-open')) return;
    if (e.key === 'Escape') { setOpen(false); burger.focus(); }
    if (e.key === 'Tab') {
      const f = focusables();
      const i = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (m) => { if (m.matches) setOpen(false); });
}

toTop?.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); scrollToTarget(0); document.getElementById('main')?.focus({ preventScroll: true }); });

/* ------------------------------------------------------------------ */
/* Header nav: one pill glides between links                           */
/* ------------------------------------------------------------------ */
const nav = document.querySelector<HTMLElement>('[data-nav]');
if (nav) {
  const pill = nav.querySelector<HTMLElement>('.nav-pill')!;
  const current = nav.querySelector<HTMLElement>('a[aria-current="page"]');
  const dur = motion ? 0.55 : 0;
  let shown = false;
  const moveTo = (a: HTMLElement | null) => {
    if (!a) { gsap.to(pill, { opacity: 0, duration: dur * 0.6 }); shown = false; return; }
    const to = { x: a.offsetLeft, width: a.offsetWidth, opacity: 1 };
    if (shown) gsap.to(pill, { ...to, duration: dur, ease: 'expo.out', overwrite: true });
    else gsap.set(pill, to);
    shown = true;
  };
  moveTo(current);
  $$('a', nav).forEach((a) => {
    a.addEventListener('pointerenter', () => moveTo(a));
    a.addEventListener('focus', () => moveTo(a));
  });
  nav.addEventListener('pointerleave', () => moveTo(current));
  nav.addEventListener('focusout', (e) => { if (!nav.contains(e.relatedTarget as Node)) moveTo(current); });
  window.addEventListener('resize', () => { shown = false; moveTo(current); });
}

/* ------------------------------------------------------------------ */
/* Soft page-to-page transition                                        */
/* ------------------------------------------------------------------ */
if (motion) {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
    if (!a || a.target || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    root.classList.add('is-leaving');
    setTimeout(() => { location.href = url.href; }, 160);
  });
  window.addEventListener('pageshow', (e) => { if (e.persisted) root.classList.remove('is-leaving'); });
}

/* ------------------------------------------------------------------ */
/* Reveal system                                                       */
/* ------------------------------------------------------------------ */
const WORD_FROM = { opacity: 0, yPercent: 60, filter: 'blur(12px)' };
const WORD_TO = { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out', stagger: 0.045 };

// Headlines arrive word by word, coming into focus as they rise.
function splitWords(el: HTMLElement) {
  const split = SplitText.create(el, { type: 'words', wordsClass: 'split-word', aria: 'none' });
  gsap.set(el, { visibility: 'visible' });
  gsap.set(split.words, WORD_FROM);
  return split.words as HTMLElement[];
}

function initReveals() {
  $$('[data-split]:not([data-split="intro"])').forEach((el) => {
    const words = splitWords(el);
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => gsap.to(words, { ...WORD_TO, clearProps: 'filter' }),
    });
  });

  // Large display lines: letters rise out of a mask
  $$('[data-chars]').forEach((el) => {
    const split = SplitText.create(el, { type: 'chars', mask: 'chars', charsClass: 'split-char', aria: 'none' });
    gsap.set(el, { visibility: 'visible' });
    gsap.set(split.chars, { yPercent: 115 });
    ScrollTrigger.create({
      trigger: el, start: 'top 92%', once: true,
      onEnter: () => gsap.to(split.chars, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.035 }),
    });
  });

  // Blocks rise and sharpen, batched for natural staggering
  gsap.set('[data-reveal]:not([data-reveal="fade"])', { filter: 'blur(10px)' });
  const show = (els: Element[], duration = 1.1) => gsap.to(els, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration, ease: 'expo.out', stagger: 0.09, overwrite: true, clearProps: 'filter' });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) => show(els),
    // Elements skipped over by a fast jump (anchor links, back-to-top) still end up visible
    onLeave: (els) => show(els, 0.6),
    onEnterBack: (els) => show(els, 0.8),
  });

  // Frames grow into place as they scroll into view
  $$('[data-clip]').forEach((el) => {
    gsap.fromTo(el, { scale: 0.9, opacity: 0 }, {
      scale: 1, opacity: 1, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 98%', end: 'top 55%', scrub: 0.6 },
    });
  });

  // Word-by-word statement that "reads itself" while scrolling
  $$('[data-words]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words', aria: 'none' });
    const scene = el.closest<HTMLElement>('[data-pin]');
    if (scene) {
      // The statement holds in the middle of the screen while it lights up
      const orb = scene.querySelector('.orb');
      const tl = gsap.timeline({ scrollTrigger: { trigger: scene, start: 'center center', end: '+=110%', pin: true, scrub: 0.5, anticipatePin: 1 } });
      tl.fromTo(split.words, { opacity: 0.16 }, { opacity: 1, ease: 'none', stagger: 0.1 }, 0);
      const d = tl.duration();
      if (orb) tl.fromTo(orb, { scale: 0.45, opacity: 0 }, { scale: 1.3, opacity: 1, ease: 'none', duration: d }, 0);
      tl.to({}, { duration: d * 0.18 });
      return;
    }
    gsap.fromTo(split.words, { opacity: 0.18 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 55%', scrub: true },
    });
  });

  // Parallax images inside a cropped frame
  $$('[data-parallax]').forEach((img) => {
    gsap.fromTo(img, { yPercent: -7 }, {
      yPercent: 7, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Gentle drift for decorative elements
  $$('[data-drift]').forEach((el) => {
    const amount = Number(el.dataset.drift || 15);
    gsap.fromTo(el, { yPercent: -amount }, {
      yPercent: amount, ease: 'none',
      scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // The soft light behind each section drifts with the scroll
  $$('[data-aurora]').forEach((el) => {
    gsap.fromTo(el, { yPercent: -8 }, {
      yPercent: 14, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Index rows: each one is wiped in from the left as it rises
  $$('[data-rows]').forEach((list) => {
    const rows = $$(':scope > li', list);
    gsap.set(rows, { opacity: 0, y: 36, clipPath: 'inset(0 100% 0 0)' });
    ScrollTrigger.batch(rows, {
      start: 'top 92%', once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'expo.out', stagger: 0.1, clearProps: 'clipPath,transform' }),
    });
  });

  // Glass service tiles rise one after another
  $$('[data-bento]').forEach((grid) => {
    const cards = $$(':scope > *', grid);
    gsap.set(cards, { opacity: 0, y: 80, scale: 0.94, rotationX: -16, transformPerspective: 1100, transformOrigin: '50% 0%' });
    ScrollTrigger.batch(cards, {
      start: 'top 92%', once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1.3, ease: 'expo.out', stagger: 0.12, clearProps: 'transform' }),
    });
  });

  // Gallery images settle into their frames
  $$('[data-zoom]').forEach((el) => {
    const img = el.querySelector('img');
    if (!img) return;
    gsap.fromTo(img, { scale: 1.22 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 35%', scrub: 0.6 } });
  });

  // Inner-page heroes ease back as the content arrives
  $$('[data-hero-fade]').forEach((el) => {
    gsap.to(el, { yPercent: -8, opacity: 0.3, scale: 0.97, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top top', end: 'bottom 30%', scrub: true } });
  });

  // Numbers count up once
  $$('[data-count]').forEach((el) => {
    const m = el.textContent!.trim().match(/^(\d+)(\D*)$/);
    if (!m) return;
    const state = { v: 0 };
    const end = Number(m[1]);
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(state, { v: end, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(state.v) + m[2]; } }),
    });
  });

  // Client names drift on their own and pick up speed with the scroll
  $$('[data-marquee]').forEach((m) => {
    const rows = $$('.marquee__track', m).map((track) => {
      track.style.animation = 'none';
      return { track, dir: Number(track.dataset.dir || -1), x: 0, w: 0 };
    });
    const measure = () => rows.forEach((r) => { r.w = r.track.querySelector<HTMLElement>('.marquee__group')!.offsetWidth; if (r.dir > 0 && r.x === 0) r.x = -r.w; });
    measure();
    window.addEventListener('resize', measure);
    let active = false;
    ScrollTrigger.create({ trigger: m, start: 'top bottom', end: 'bottom top', onToggle: (self) => { active = self.isActive; } });
    gsap.ticker.add((_t, dt) => {
      if (!active) return;
      const boost = Math.min(Math.abs(lenis?.velocity ?? 0) * 14, 520);
      const step = (34 + boost) * (dt / 1000);
      rows.forEach((r) => {
        if (!r.w) return;
        r.x += step * r.dir;
        if (r.x <= -r.w) r.x += r.w;
        if (r.x >= 0) r.x -= r.w;
        r.track.style.transform = `translate3d(${r.x}px,0,0)`;
      });
    });
  });
}

/* ------------------------------------------------------------------ */
/* Home hero: a hand of cards that fans out as you scroll              */
/* ------------------------------------------------------------------ */
function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const ring = hero?.querySelector<HTMLElement>('[data-ring]');
  const spin = ring?.querySelector<HTMLElement>('.ring__spin');
  if (!hero || !ring || !spin) return;

  // The ring turns on its own, coasts after a drag, and picks up speed with the scroll.
  let angle = 0;
  let vel = 0.55;            // degrees per frame; a short opening glide that settles into the idle turn
  let dragging = false, lastX = 0, moved = 0, active = true;
  const IDLE = 0.05;
  ScrollTrigger.create({ trigger: hero, start: 'top bottom', end: 'bottom top', onToggle: (self) => { active = self.isActive; } });
  gsap.ticker.add(() => {
    if (!active) return;
    if (!dragging) {
      vel += (IDLE - vel) * 0.035;
      angle += vel + (lenis?.velocity ?? 0) * 0.02;
    }
    spin.style.rotate = `y ${angle.toFixed(3)}deg`;
  });
  ring.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; moved = 0; });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX;
    moved += Math.abs(dx);
    const d = dx * (window.innerWidth < 720 ? 0.32 : 0.16);
    angle -= d; vel = -d;   // seen from inside, the wall follows the hand
  }, { passive: true });
  const release = () => { dragging = false; };
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  // A drag is not a click
  ring.addEventListener('click', (e) => { if (moved > 8) { e.preventDefault(); e.stopPropagation(); } }, true);
  ring.addEventListener('dragstart', (e) => e.preventDefault());

  // Leaving the hero: the ring tips back and the words ease away
  gsap.to(ring, { rotationX: 14, scale: 0.9, yPercent: -4, transformPerspective: 1400, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to(hero.querySelector('.hero__inner'), {
    yPercent: -6, opacity: 0.3, scale: 0.97, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom 35%', scrub: true },
  });
}

/* ------------------------------------------------------------------ */
/* Pointer effects                                                     */
/* ------------------------------------------------------------------ */
function initPointer() {
  if (!finePointer) return;
  $$('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.14);
      yTo((e.clientY - r.top - r.height / 2) * 0.22);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
  // Glass tiles lean towards the pointer
  $$('[data-tilt]').forEach((el) => {
    let rx: ReturnType<typeof gsap.quickTo> | null = null;
    let ry: ReturnType<typeof gsap.quickTo> | null = null;
    el.addEventListener('pointerenter', () => {
      if (rx) return;
      gsap.set(el, { transformPerspective: 1000 });
      rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' });
    });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      ry?.(((e.clientX - r.left) / r.width - 0.5) * 7);
      rx?.(((e.clientY - r.top) / r.height - 0.5) * -7);
    });
    el.addEventListener('pointerleave', () => { rx?.(0); ry?.(0); });
  });

  // A "View" bubble follows the pointer over projects
  const cursor = document.querySelector<HTMLElement>('[data-cursor-el]');
  if (cursor) {
    const dot = cursor.querySelector<HTMLElement>('.cursor__dot')!;
    const label = cursor.querySelector<HTMLElement>('[data-cursor-label]')!;
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3.out' });
    let on = false;
    let px = -1, py = -1;
    const update = (el: Element | null) => {
      const target = (el as HTMLElement | null)?.closest?.<HTMLElement>('[data-cursor]') ?? null;
      if (!!target === on) return;
      on = !!target;
      if (target) label.textContent = target.dataset.cursor || '';
      gsap.to(dot, { scale: on ? 1 : 0, opacity: on ? 1 : 0, duration: on ? 0.5 : 0.3, ease: on ? 'back.out(1.6)' : 'power2.in', overwrite: true });
    };
    window.addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; xTo(px); yTo(py); update(e.target as Element); }, { passive: true });
    // The page can move under a resting pointer
    const onMove = () => { if (px >= 0) update(document.elementFromPoint(px, py)); };
    if (lenis) lenis.on('scroll', onMove); else window.addEventListener('scroll', onMove, { passive: true });
    document.addEventListener('pointerleave', () => update(null));
  }

  // A warm highlight follows the pointer across glass tiles
  $$('[data-glow]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/* ------------------------------------------------------------------ */
/* Page intro (preloader on first visit, then hero)                    */
/* ------------------------------------------------------------------ */
function intro() {
  const introEls = $$('[data-split="intro"]');
  const introFades = $$('[data-intro]');
  const pre = document.querySelector<HTMLElement>('[data-preloader]');
  const showPre = pre && !root.classList.contains('no-preload');
  try { sessionStorage.setItem('ira-visited', '1'); } catch {}

  const tl = gsap.timeline();
  if (showPre && pre) {
    const logo = pre.querySelector('.preloader__logo');
    const bar = pre.querySelector('.preloader__bar span');
    const count = pre.querySelector<HTMLElement>('[data-pre-count]');
    const n = { v: 0 };
    tl.from(logo, { opacity: 0, scale: 0.92, filter: 'blur(10px)', duration: 0.45, ease: 'expo.out' })
      .to(bar, { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, 0.05)
      .to(n, { v: 100, duration: 0.6, ease: 'power2.inOut', onUpdate: () => { if (count) count.textContent = String(Math.round(n.v)); } }, 0.05)
      .to(pre, { opacity: 0, duration: 0.4, ease: 'power2.out' })
      .set(pre, { display: 'none' });
  } else if (pre) {
    pre.style.display = 'none';
  }
  tl.add('heroIn', showPre ? '-=0.35' : 0);
  introEls.forEach((el, i) => {
    tl.to(splitWords(el), { ...WORD_TO, duration: 1.15, stagger: 0.05, clearProps: 'filter' }, `heroIn+=${i * 0.12}`);
  });
  if (introFades.length) {
    tl.fromTo(introFades, { opacity: 0, y: 28, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', stagger: 0.08, clearProps: 'filter,transform' }, 'heroIn+=0.2');
  }
  // The hand-drawn stroke under the last word draws itself
  const stroke = document.querySelector('.mark path');
  if (stroke) tl.to(stroke, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 'heroIn+=0.95');
  // Home: the ring of work rises into place while it spins down
  const ringEl = document.querySelector('[data-ring]');
  if (ringEl) tl.from(ringEl, { yPercent: 28, scale: 0.8, duration: 1.8, ease: 'expo.out' }, 'heroIn+=0.25');
  tl.from('[data-header]', { yPercent: -130, duration: 1.1, ease: 'expo.out', clearProps: 'transform' }, 'heroIn+=0.1');
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
async function boot() {
  if (motion) {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 350))]);
    initHero();
    intro();
    initReveals();
    initPointer();
    // Pinned scenes shift everything below them: order triggers by position, then measure
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }
  if (document.querySelector('[data-threads]')) import('./threads').then((m) => m.initThreads(motion));
  root.classList.add('motion-ready');

  // Feature modules load only on pages that use them
  if (document.querySelector('[data-reel]')) import('./modules/reel').then((m) => m.init(motion, lenis));
  if (document.querySelector('[data-voices]')) import('./modules/voices').then((m) => m.init(motion));
  if (document.querySelector('[data-accordion]')) import('./modules/accordion').then((m) => m.init());
  if (document.querySelector('[data-form]')) import('./modules/forms').then((m) => m.init());
  if (document.querySelector('[data-map]')) import('./modules/map').then((m) => m.init());

  // Refresh once images above the fold have dimensions
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
boot();
