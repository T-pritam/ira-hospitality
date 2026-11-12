import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { initDodecas } from './dodeca';

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
/* Wireframe dodecahedrons                                             */
/* ------------------------------------------------------------------ */
initDodecas(motion, () => lenis?.velocity ?? 0);

/* ------------------------------------------------------------------ */
/* Reveal system                                                       */
/* ------------------------------------------------------------------ */
function splitLines(el: HTMLElement, opts: { delay?: number; trigger?: boolean } = {}) {
  return SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'split-line',
    aria: 'none',
    autoSplit: true,
    onSplit(self) {
      gsap.set(el, { visibility: 'visible' });
      return gsap.from(self.lines, {
        yPercent: 110,
        duration: 1.25,
        ease: 'expo.out',
        stagger: 0.09,
        delay: opts.delay ?? 0,
        scrollTrigger: opts.trigger === false ? undefined : { trigger: el, start: 'top 88%', once: true },
      });
    },
  });
}

function initReveals() {
  // Line-by-line headline reveals
  $$('[data-split]:not([data-split="intro"])').forEach((el) => splitLines(el));

  // Fade-up blocks, batched for natural staggering
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, overwrite: true }),
    // Elements skipped over by a fast jump (anchor links, back-to-top) still end up visible
    onLeave: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.6, overwrite: true }),
    onEnterBack: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', overwrite: true }),
  });

  // Image curtain reveals
  $$('[data-clip]').forEach((el) => {
    const img = el.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    tl.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut' });
    if (img && !img.hasAttribute('data-parallax')) tl.from(img, { scale: 1.25, duration: 1.8, ease: 'expo.out' }, 0.1);
  });

  // Word-by-word statement that "reads itself" while scrolling
  $$('[data-words]').forEach((el) => {
    SplitText.create(el, {
      type: 'words',
      aria: 'none',
      autoSplit: true,
      onSplit(self) {
        return gsap.fromTo(self.words, { opacity: 0.14 }, {
          opacity: 1, ease: 'none', stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: true },
        });
      },
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
}

/* ------------------------------------------------------------------ */
/* Magnetic buttons                                                    */
/* ------------------------------------------------------------------ */
function initMagnetic() {
  if (!finePointer) return;
  $$('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.18);
      yTo((e.clientY - r.top - r.height / 2) * 0.3);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
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
    const logo = pre.querySelector('.preloader__logo img');
    const bar = pre.querySelector('.preloader__bar span');
    tl.from(logo, { yPercent: 105, duration: 0.75, ease: 'expo.out' })
      .to(bar, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, 0.1)
      .to(logo, { yPercent: -105, duration: 0.5, ease: 'expo.in' })
      .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '-=0.2')
      .set(pre, { display: 'none' });
  } else if (pre) {
    pre.style.display = 'none';
  }
  const start = showPre ? '-=0.55' : 0;
  const label = 'heroIn';
  tl.add(label, start);
  introEls.forEach((el, i) => {
    SplitText.create(el, {
      type: 'lines', mask: 'lines', linesClass: 'split-line', autoSplit: true, aria: 'none',
      onSplit(self) {
        gsap.set(el, { visibility: 'visible' });
        const anim = gsap.from(self.lines, { yPercent: 115, duration: 1.4, ease: 'expo.out', stagger: 0.1 });
        // First split joins the intro timeline; re-splits (on resize) just render the final state.
        if (!(el as any).__introDone) { (el as any).__introDone = true; tl.add(anim, `${label}+=${i * 0.15}`); }
        else anim.progress(1);
        return anim;
      },
    });
  });
  if (introFades.length) {
    tl.fromTo(introFades, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1 }, `${label}+=0.45`);
  }
  tl.from('[data-header]', { yPercent: -100, opacity: 0, duration: 1, ease: 'expo.out', clearProps: 'transform,opacity' }, `${label}+=0.2`);
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
async function boot() {
  if (motion) {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
    intro();
    initReveals();
    initMagnetic();
  }
  root.classList.add('motion-ready');

  // Feature modules load only on pages that use them
  if (document.querySelector('[data-stack]')) import('./modules/stack').then((m) => m.init(motion));
  if (document.querySelector('[data-reel]')) import('./modules/reel').then((m) => m.init(motion, lenis));
  if (document.querySelector('[data-voices]')) import('./modules/voices').then((m) => m.init(motion));
  if (document.querySelector('[data-accordion]')) import('./modules/accordion').then((m) => m.init());
  if (document.querySelector('[data-form]')) import('./modules/forms').then((m) => m.init());
  if (document.querySelector('[data-map]')) import('./modules/map').then((m) => m.init());

  // Refresh once images above the fold have dimensions
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
boot();
