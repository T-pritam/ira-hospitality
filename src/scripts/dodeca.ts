// Lightweight wireframe dodecahedron (the original site's signature shape),
// drawn on a 2D canvas instead of shipping Three.js.

const PHI = (1 + Math.sqrt(5)) / 2;
const INV = 1 / PHI;

const VERTS: [number, number, number][] = [];
for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) VERTS.push([x, y, z]);
for (const a of [-1, 1]) for (const b of [-1, 1]) {
  VERTS.push([0, a * INV, b * PHI]);
  VERTS.push([a * INV, b * PHI, 0]);
  VERTS.push([a * PHI, 0, b * INV]);
}
const EDGE_LEN = 2 * INV;
const EDGES: [number, number][] = [];
for (let i = 0; i < VERTS.length; i++) for (let j = i + 1; j < VERTS.length; j++) {
  const [a, b] = [VERTS[i], VERTS[j]];
  const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  if (Math.abs(d - EDGE_LEN) < 1e-6) EDGES.push([i, j]);
}

type Instance = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  color: string;
  speed: number;
  rx: number; ry: number; rz: number;
  seed: number;
  visible: boolean;
  w: number; h: number; dpr: number;
};

function resize(inst: Instance) {
  const r = inst.canvas.getBoundingClientRect();
  inst.dpr = Math.min(window.devicePixelRatio || 1, 2);
  inst.w = r.width; inst.h = r.height;
  inst.canvas.width = Math.max(1, Math.round(r.width * inst.dpr));
  inst.canvas.height = Math.max(1, Math.round(r.height * inst.dpr));
}

function draw(inst: Instance, t: number) {
  const { ctx, w, h, dpr } = inst;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const scale = Math.min(w, h) * 0.26;
  const bob = Math.sin(t * 0.0004 + inst.seed) * Math.min(w, h) * 0.03;
  const [cx, cy, cz] = [Math.cos(inst.rx), Math.cos(inst.ry), Math.cos(inst.rz)];
  const [sx, sy, sz] = [Math.sin(inst.rx), Math.sin(inst.ry), Math.sin(inst.rz)];
  const pts = VERTS.map(([x, y, z]) => {
    // rotate X
    let y1 = y * cx - z * sx; let z1 = y * sx + z * cx;
    // rotate Y
    let x2 = x * cy + z1 * sy; let z2 = -x * sy + z1 * cy;
    // rotate Z
    let x3 = x2 * cz - y1 * sz; let y3 = x2 * sz + y1 * cz;
    const p = 4.2 / (4.2 + z2);
    return [w / 2 + x3 * scale * p, h / 2 + y3 * scale * p + bob, z2] as const;
  });
  ctx.lineWidth = 1;
  ctx.strokeStyle = inst.color;
  ctx.beginPath();
  for (const [a, b] of EDGES) {
    ctx.moveTo(pts[a][0], pts[a][1]);
    ctx.lineTo(pts[b][0], pts[b][1]);
  }
  ctx.stroke();
}

export function initDodecas(motion: boolean, velocity: () => number) {
  const canvases = Array.from(document.querySelectorAll<HTMLCanvasElement>('canvas[data-dodeca]'));
  if (!canvases.length) return;
  const instances: Instance[] = canvases.map((canvas, i) => {
    const ctx = canvas.getContext('2d')!;
    const inst: Instance = {
      canvas, ctx,
      color: canvas.dataset.color || 'rgba(255,255,255,0.32)',
      speed: Number(canvas.dataset.speed || 1),
      rx: 0.6 + i, ry: 0.3 + i * 0.7, rz: 0.1 * i,
      seed: i * 1.7,
      visible: true, w: 0, h: 0, dpr: 1,
    };
    resize(inst);
    draw(inst, 0);
    return inst;
  });

  const ro = new ResizeObserver(() => instances.forEach((inst) => { resize(inst); draw(inst, performance.now()); }));
  instances.forEach((inst) => ro.observe(inst.canvas));
  if (!motion) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const inst = instances.find((x) => x.canvas === e.target);
      if (inst) inst.visible = e.isIntersecting;
    });
  });
  instances.forEach((inst) => io.observe(inst.canvas));

  let mx = 0, my = 0;
  window.addEventListener('pointermove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  let last = performance.now();
  const loop = (now: number) => {
    const dt = Math.min(64, now - last); last = now;
    if (!document.hidden) {
      const v = Math.max(-40, Math.min(40, velocity()));
      for (const inst of instances) {
        if (!inst.visible) continue;
        const k = dt * 0.00012 * inst.speed;
        inst.rx += k * (1.4 + my * 0.8) + v * 0.0006;
        inst.ry += k * (2 + mx * 0.8) + v * 0.0009;
        inst.rz += k * 0.4;
        draw(inst, now);
      }
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
