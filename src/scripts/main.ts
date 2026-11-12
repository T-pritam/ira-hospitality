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
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), anchors: false });
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
if (header) {
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    const menuOpen = root.classList.contains('menu-open');
    header.classList.toggle('is-scrolled', y > 40);
    if (!menuOpen) header.classList.toggle('is-hidden', y > lastY && y > 300);
    toTop?.classList.toggle('is-visible', y > window.innerHeight);
    lastY = y;
  };
  if (lenis) lenis.on('scroll', onScroll);
  else window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));

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

  // Glass service tiles rise one after another
  $$('[data-bento]').forEach((grid) => {
    const cards = $$(':scope > *', grid);
    gsap.set(cards, { opacity: 0, y: 70, scale: 0.94 });
    ScrollTrigger.batch(cards, {
      start: 'top 92%', once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out', stagger: 0.12, clearProps: 'transform' }),
    });
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
}

/* ------------------------------------------------------------------ */
/* Home hero: a hand of cards that fans out as you scroll              */
/* ------------------------------------------------------------------ */
function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const fan = hero?.querySelector<HTMLElement>('[data-fan]');
  if (!hero || !fan) return;
  const cards = $$('.fan__card', fan);
  const mid = (cards.length - 1) / 2;
  gsap.fromTo(cards,
    { rotation: (i) => (i - mid) * 7, xPercent: (i) => (i - mid) * -34, y: (i) => Math.abs(i - mid) * 26, transformOrigin: '50% 120%' },
    {
      rotation: 0, xPercent: 0, y: (i) => (i % 2 ? 36 : 0), ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: () => `+=${Math.max(320, fan.offsetTop + fan.offsetHeight * 0.4 - window.innerHeight * 0.45)}`, scrub: 0.7, invalidateOnRefresh: true },
    });
  gsap.to(hero.querySelector('.hero__inner'), {
    yPercent: -6, opacity: 0.35, ease: 'none',
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
    tl.from(logo, { opacity: 0, scale: 0.92, filter: 'blur(10px)', duration: 0.7, ease: 'expo.out' })
      .to(bar, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, 0.1)
      .to(pre, { opacity: 0, duration: 0.6, ease: 'power2.out' })
      .set(pre, { display: 'none' });
  } else if (pre) {
    pre.style.display = 'none';
  }
  tl.add('heroIn', showPre ? '-=0.45' : 0);
  introEls.forEach((el, i) => {
    tl.to(splitWords(el), { ...WORD_TO, duration: 1.3, stagger: 0.06, clearProps: 'filter' }, `heroIn+=${i * 0.15}`);
  });
  if (introFades.length) {
    tl.fromTo(introFades, { opacity: 0, y: 28, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', stagger: 0.09, clearProps: 'filter,transform' }, 'heroIn+=0.35');
  }
  tl.from('[data-header]', { yPercent: -130, duration: 1.1, ease: 'expo.out', clearProps: 'transform' }, 'heroIn+=0.1');
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
async function boot() {
  if (motion) {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
    initHero();
    intro();
    initReveals();
    initPointer();
  }
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
