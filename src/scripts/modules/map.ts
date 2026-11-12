// Loads the Google Maps iframe only on request (keeps the page fast and avoids
// third-party cookies until the visitor actually wants the map).
export function init() {
  document.querySelectorAll<HTMLElement>('[data-map]').forEach((map) => {
    const btn = map.querySelector<HTMLButtonElement>('[data-map-load]');
    btn?.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = map.dataset.map!;
      iframe.title = 'Ira Hospitality location on Google Maps';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allowFullscreen = true;
      map.appendChild(iframe);
      iframe.addEventListener('load', () => btn.closest('.map__load')?.remove());
    });
  });
}
