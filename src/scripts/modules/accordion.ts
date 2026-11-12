import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Disclosure accordion. Several panels may be open at once.
export function init() {
  document.querySelectorAll<HTMLElement>('[data-accordion]').forEach((acc) => {
    acc.querySelectorAll<HTMLButtonElement>('.acc__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.acc__item')!;
        const open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(open));
        item.classList.toggle('is-open', open);
        const panel = document.getElementById(btn.getAttribute('aria-controls')!);
        if (panel) (panel as any).inert = !open;
        setTimeout(() => ScrollTrigger.refresh(), 650);
      });
    });
  });
}
