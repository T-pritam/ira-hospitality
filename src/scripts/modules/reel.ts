import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

// Horizontal work reel: pinned and scroll-driven on desktop,
// a native swipe carousel on touch screens and with reduced motion.
export function init(motion: boolean, lenis: Lenis | null) {
  const section = document.querySelector<HTMLElement>('[data-reel]');
  const track = section?.querySelector<HTMLElement>('.reel__track');
  const bar = section?.querySelector<HTMLElement>('.reel__progress span');
  if (!section || !track || !motion) return;

  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    section.classList.add('is-pinned');
    const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
    // Cards turn slightly towards the centre of the screen, like a carousel seen from inside
    const items = Array.from(track.querySelectorAll<HTMLElement>('.reel__item'));
    const index = section.querySelector<HTMLElement>('[data-reel-index]');
    gsap.set(items, { transformPerspective: 1200 });
    const shape = () => {
      const vw = window.innerWidth;
      let best = 0, bestD = Infinity;
      items.forEach((item, i) => {
        const r = item.getBoundingClientRect();
        const d = (r.left + r.width / 2 - vw / 2) / vw;
        const c = Math.max(-1, Math.min(1, d));
        gsap.set(item, { rotationY: c * -16, scale: 1 - Math.abs(c) * 0.07 });
        if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = i; }
      });
      if (index) index.textContent = String(best + 1).padStart(2, '0');
    };

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => { if (bar) bar.style.transform = `scaleX(${self.progress})`; shape(); },
      },
    });

    // Each cover drifts inside its frame as the reel moves
    gsap.utils.toArray<HTMLElement>('.pcard__media img', track).forEach((img) => {
      gsap.fromTo(img, { xPercent: -5 }, {
        xPercent: 5, ease: 'none',
        scrollTrigger: { trigger: img.closest('.reel__item'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
      });
    });

    // Keyboard users: bring a focused card into view
    const onFocus = (e: FocusEvent) => {
      const item = (e.target as HTMLElement).closest<HTMLElement>('.reel__item, .reel__end');
      const st = tween.scrollTrigger;
      if (!item || !st) return;
      const d = distance();
      const x = Math.min(d, Math.max(0, item.offsetLeft - window.innerWidth * 0.2));
      const y = st.start + (d ? x / d : 0) * (st.end - st.start);
      if (lenis) lenis.scrollTo(y, { immediate: true }); else window.scrollTo(0, y);
    };
    track.addEventListener('focusin', onFocus);
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    shape();

    return () => {
      section.classList.remove('is-pinned');
      gsap.set(items, { clearProps: 'transform' });
      track.removeEventListener('focusin', onFocus);
    };
  });
}
