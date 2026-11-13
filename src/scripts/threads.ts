// Flowing threads of warm light behind the home hero, drawn on a 2D canvas.
// Each thread is a slow double sine wave; the bundle bends towards the pointer.
export function initThreads(motion: boolean) {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-threads]');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  const small = window.innerWidth < 760;
  const LINES = small ? 16 : 30;
  let w = 0, h = 0, dpr = 1, visible = true, raf = 0;
  let px = 0.5, py = 0.5, tx = 0.5, ty = 0.5;
  let grad: CanvasGradient;

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5);
    w = r.width; h = r.height;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, 'rgba(190,170,143,0)');
    grad.addColorStop(0.25, 'rgba(214,192,160,0.34)');
    grad.addColorStop(0.6, 'rgba(255,137,4,0.3)');
    grad.addColorStop(1, 'rgba(190,170,143,0)');
  };

  const draw = (time: number) => {
    const t = time / 1000;
    px += (tx - px) * 0.04; py += (ty - py) * 0.04;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    ctx.strokeStyle = grad;
    const step = Math.max(small ? 26 : 18, w / 70);
    const amp = Math.min(h * 0.16, 130);
    for (let i = 0; i < LINES; i++) {
      const k = i / (LINES - 1);
      const base = h * (0.3 + 0.5 * k) + (py - 0.5) * 60 * (k - 0.5);
      ctx.globalAlpha = 0.35 + 0.65 * Math.sin(k * Math.PI);
      ctx.beginPath();
      for (let x = -step; x <= w + step; x += step) {
        const u = x / w;
        const pull = Math.exp(-Math.pow((u - px) * 3.2, 2)) * 46 * (k - 0.5);
        const y = base
          + Math.sin(u * 5.2 + t * 0.32 + k * 2.6) * amp * (0.55 + 0.45 * Math.sin(t * 0.17 + k * 3))
          + Math.sin(u * 2.1 - t * 0.21 + k * 5.4) * amp * 0.6
          + pull;
        if (x === -step) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  // Phones draw every other frame; the motion is slow enough that it reads the same
  let frame = 0;
  const loop = (time: number) => { if (visible && (!small || frame++ % 2 === 0)) draw(time); raf = requestAnimationFrame(loop); };
  resize();
  window.addEventListener('resize', resize);
  if (!motion) { draw(4000); return; }
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);
  window.addEventListener('pointermove', (e) => { tx = e.clientX / window.innerWidth; ty = e.clientY / window.innerHeight; }, { passive: true });
  raf = requestAnimationFrame(loop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(loop); });
}
