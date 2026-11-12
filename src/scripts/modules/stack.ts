import { gsap } from 'gsap';

// Stacked service cards: each card sticks (CSS) and the previous one
// recedes (scales down, content dims) as the next card slides over it.
export function init(motion: boolean) {
  if (!motion) return;
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-stack] .stack__card'));
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    const st = { trigger: next, start: 'top bottom', end: 'top 30%', scrub: true };
    gsap.to(card, { scale: 0.94, ease: 'none', scrollTrigger: st });
    gsap.to(card.querySelectorAll(':scope > *'), { opacity: 0.25, ease: 'none', scrollTrigger: { ...st } });
  });
}
