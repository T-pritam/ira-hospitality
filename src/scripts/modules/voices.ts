import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Accessible testimonial tabs (avatars + prev/next arrows).
export function init(motion: boolean) {
  const root = document.querySelector<HTMLElement>('[data-voices]');
  if (!root) return;
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
  let current = Math.max(0, tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true'));
  root.classList.add('is-enhanced');

  const show = (i: number, focus = false) => {
    const next = (i + tabs.length) % tabs.length;
    if (next === current) return;
    const prevPanel = panels[current];
    const nextPanel = panels[next];
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === next));
      t.tabIndex = k === next ? 0 : -1;
    });
    if (focus) tabs[next].focus();
    if (motion) {
      gsap.to(prevPanel, { opacity: 0, y: -20, duration: 0.45, ease: 'power2.in', onComplete: () => { prevPanel.hidden = true; } });
      nextPanel.hidden = false;
      gsap.fromTo(nextPanel, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.35 });
      // The new quote comes into focus word by word
      const pull = nextPanel.querySelector<HTMLElement>('.voice__pull');
      if (pull) {
        const words = ((pull as any).__words ??= SplitText.create(pull, { type: 'words', wordsClass: 'split-word', aria: 'none' }).words);
        gsap.fromTo(words, { opacity: 0, yPercent: 50, filter: 'blur(10px)' }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 0.9, delay: 0.35, ease: 'expo.out', stagger: 0.03, clearProps: 'filter' });
      }
    } else {
      prevPanel.hidden = true;
      nextPanel.hidden = false;
    }
    current = next;
  };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1, true); }
    });
  });
  root.querySelector('[data-prev]')?.addEventListener('click', () => show(current - 1));
  root.querySelector('[data-next]')?.addEventListener('click', () => show(current + 1));
}
