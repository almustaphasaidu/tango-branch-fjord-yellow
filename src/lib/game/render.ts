import { COLS, DECOS, ROWS, TOWERS } from "./config";
import type { Engine } from "./engine";
import { hash2 } from "./engine";
import { pointOnPath } from "./path";
import type { Enemy, Projectile, Tower } from "./types";

export interface Camera {
  x: number;
  y: number;
  scale: number;
}

export function fitCamera(canvas: HTMLCanvasElement): Camera {
  const pad = 8;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const scale = Math.min((w - pad * 2) / COLS, (h - pad * 2) / ROWS);
  return {
    scale,
    x: (w - COLS * scale) / 2,
    y: (h - ROWS * scale) / 2,
  };
}

export function screenToCell(
  canvas: HTMLCanvasElement,
  sx: number,
  sy: number,
  cam: Camera,
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const x = (sx - rect.left - cam.x) / cam.scale;
  const y = (sy - rect.top - cam.y) / cam.scale;
  return { x: Math.floor(x), y: Math.floor(y) };
}

export function render(ctx: CanvasRenderingContext2D, engine: Engine, canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cssW = canvas.clientWidth;
  const cssH = canvas.clientHeight;
  const bw = Math.floor(cssW * dpr);
  const bh = Math.floor(cssH * dpr);
  if (canvas.width !== bw || canvas.height !== bh) {
    canvas.width = bw;
    canvas.height = bh;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);

  const cam = fitCamera(canvas);
  const shake = engine.shakeOffset();
  ctx.save();
  ctx.translate(cam.x + shake.x * cam.scale, cam.y + shake.y * cam.scale);
  ctx.scale(cam.scale, cam.scale);

  drawTerrain(ctx);
  drawPath(ctx, engine);
  drawDecos(ctx);
  drawKeep(ctx);
  drawPortal(ctx, engine.time);
  drawHover(ctx, engine);
  drawTowers(ctx, engine);
  drawEnemies(ctx, engine);
  drawProjectiles(ctx, engine);
  drawParticles(ctx, engine);
  drawFloaters(ctx, engine);
  drawVignette(ctx);

  ctx.restore();
}

function drawTerrain(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#101412";
  ctx.fillRect(-2, -2, COLS + 4, ROWS + 4);
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const n = hash2(x, y);
      const g = 22 + n * 10;
      ctx.fillStyle = `rgb(${18 + n * 8},${g},${20 + n * 6})`;
      ctx.fillRect(x, y, 1.02, 1.02);
      if (n > 0.78) {
        ctx.fillStyle = "rgba(180, 190, 170, 0.06)";
        ctx.beginPath();
        ctx.arc(x + 0.3 + n * 0.4, y + 0.4, 0.07, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.strokeStyle = "rgba(236, 234, 228, 0.035)";
  ctx.lineWidth = 0.02;
  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ROWS);
    ctx.stroke();
  }
  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(COLS, y);
    ctx.stroke();
  }
}

function drawPath(ctx: CanvasRenderingContext2D, engine: Engine) {
  const pts = engine.path.segs;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "#2a241f";
  ctx.lineWidth = 0.92;
  ctx.beginPath();
  ctx.moveTo(pts[0].x0, pts[0].y0);
  for (const s of pts) ctx.lineTo(s.x1, s.y1);
  ctx.stroke();

  ctx.strokeStyle = "#3d342c";
  ctx.lineWidth = 0.72;
  ctx.beginPath();
  ctx.moveTo(pts[0].x0, pts[0].y0);
  for (const s of pts) ctx.lineTo(s.x1, s.y1);
  ctx.stroke();

  ctx.strokeStyle = "#4a4036";
  ctx.lineWidth = 0.18;
  ctx.setLineDash([0.12, 0.2]);
  ctx.beginPath();
  ctx.moveTo(pts[0].x0, pts[0].y0);
  for (const s of pts) ctx.lineTo(s.x1, s.y1);
  ctx.stroke();
  ctx.setLineDash([]);

  for (let d = 0.4; d < engine.path.length; d += 0.55) {
    const p = pointOnPath(engine.path, d);
    const n = hash2(Math.floor(d * 10), 2);
    ctx.fillStyle = n > 0.5 ? "#53483e" : "#463d34";
    ctx.beginPath();
    ctx.arc(p.x + (n - 0.5) * 0.18, p.y + (hash2(Math.floor(d * 10), 5) - 0.5) * 0.18, 0.07 + n * 0.04, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawDecos(ctx: CanvasRenderingContext2D) {
  for (const d of DECOS) {
    const x = d.cellX + 0.5;
    const y = d.cellY + 0.5;
    if (d.kind === "pine") drawPine(ctx, x, y, 0.85 + hash2(d.cellX, d.cellY) * 0.2);
    else if (d.kind === "oak") drawOak(ctx, x, y);
    else if (d.kind === "rock") drawRock(ctx, x, y, hash2(d.cellX, d.cellY));
    else if (d.kind === "ruin") drawRuin(ctx, x, y);
    else if (d.kind === "pond") drawPond(ctx, d.cellX, d.cellY);
  }
}

function drawPine(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.fillStyle = "#2a211c";
  ctx.fillRect(x - 0.05, y + 0.05, 0.1, 0.28 * s);
  ctx.fillStyle = "#243028";
  for (let i = 0; i < 3; i++) {
    const top = y - 0.42 * s + i * 0.16;
    const w = 0.18 * s + i * 0.1;
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x + w, top + 0.28);
    ctx.lineTo(x - w, top + 0.28);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = "#2e3c32";
  ctx.beginPath();
  ctx.moveTo(x, y - 0.46 * s);
  ctx.lineTo(x + 0.14 * s, y - 0.18 * s);
  ctx.lineTo(x - 0.14 * s, y - 0.18 * s);
  ctx.closePath();
  ctx.fill();
}

function drawOak(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#2a211c";
  ctx.fillRect(x - 0.06, y, 0.12, 0.32);
  ctx.fillStyle = "#2a382c";
  ctx.beginPath();
  ctx.arc(x, y - 0.08, 0.28, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#334536";
  ctx.beginPath();
  ctx.arc(x + 0.12, y - 0.14, 0.18, 0, Math.PI * 2);
  ctx.fill();
}

function drawRock(ctx: CanvasRenderingContext2D, x: number, y: number, n: number) {
  ctx.fillStyle = "#3a3d3c";
  ctx.beginPath();
  ctx.ellipse(x, y + 0.08, 0.28, 0.18, n * 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#4a4e4c";
  ctx.beginPath();
  ctx.ellipse(x - 0.06, y, 0.2, 0.14, -0.3, 0, Math.PI * 2);
  ctx.fill();
}

function drawRuin(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#3e3c38";
  ctx.fillRect(x - 0.28, y - 0.1, 0.18, 0.42);
  ctx.fillRect(x + 0.08, y + 0.02, 0.16, 0.3);
  ctx.fillStyle = "#4c4944";
  ctx.fillRect(x - 0.3, y - 0.16, 0.58, 0.1);
}

function drawPond(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.fillStyle = "#1a2428";
  ctx.fillRect(cx, cy, 1, 1);
  ctx.fillStyle = "#243238";
  ctx.beginPath();
  ctx.ellipse(cx + 0.5, cy + 0.5, 0.42, 0.36, 0.2, 0, Math.PI * 2);
  ctx.fill();
}

function drawKeep(ctx: CanvasRenderingContext2D) {
  const x = COLS - 0.15;
  const y = 4.5;
  ctx.fillStyle = "#2c2d2c";
  ctx.fillRect(x - 0.15, y - 1.15, 1.35, 2.3);
  ctx.fillStyle = "#3a3b3a";
  ctx.fillRect(x, y - 1.05, 1.05, 2.1);
  ctx.fillStyle = "#1a1b1b";
  ctx.fillRect(x - 0.05, y - 0.28, 0.55, 0.7);
  ctx.fillStyle = "#4a4c4a";
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(x + i * 0.26, y - 1.22, 0.16, 0.18);
  }
  ctx.fillStyle = "#c5ccd3";
  ctx.globalAlpha = 0.35;
  ctx.fillRect(x + 0.55, y - 0.72, 0.12, 0.12);
  ctx.fillRect(x + 0.55, y + 0.18, 0.12, 0.12);
  ctx.globalAlpha = 1;
}

function drawPortal(ctx: CanvasRenderingContext2D, time: number) {
  const x = 0.15;
  const y = 5.5;
  const pulse = 0.5 + Math.sin(time * 2.2) * 0.15;
  ctx.fillStyle = "#1a1210";
  ctx.beginPath();
  ctx.ellipse(x, y, 0.42, 0.7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = `rgba(196, 92, 74, ${0.25 + pulse * 0.25})`;
  ctx.lineWidth = 0.06;
  ctx.beginPath();
  ctx.ellipse(x, y, 0.28, 0.52, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = `rgba(196, 92, 74, ${0.12 + pulse * 0.1})`;
  ctx.beginPath();
  ctx.ellipse(x, y, 0.16, 0.32, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawHover(ctx: CanvasRenderingContext2D, engine: Engine) {
  const h = engine.hover;
  if (!h || engine.phase !== "playing") return;
  ctx.save();
  if (engine.selectedKind) {
    ctx.fillStyle = h.buildable ? "rgba(197, 204, 211, 0.16)" : "rgba(196, 92, 74, 0.18)";
    ctx.fillRect(h.x + 0.06, h.y + 0.06, 0.88, 0.88);
    ctx.strokeStyle = h.buildable ? "rgba(197, 204, 211, 0.7)" : "rgba(196, 92, 74, 0.7)";
    ctx.lineWidth = 0.04;
    ctx.strokeRect(h.x + 0.08, h.y + 0.08, 0.84, 0.84);
    const def = TOWERS[engine.selectedKind];
    drawRange(ctx, h.x + 0.5, h.y + 0.5, def.range, h.buildable);
    drawTowerBody(ctx, {
      kind: engine.selectedKind,
      x: h.x + 0.5,
      y: h.y + 0.5,
      angle: -Math.PI / 2,
      recoil: 0,
    } as Tower, 0.55);
  } else {
    ctx.strokeStyle = "rgba(236, 234, 228, 0.18)";
    ctx.lineWidth = 0.03;
    ctx.strokeRect(h.x + 0.08, h.y + 0.08, 0.84, 0.84);
  }
  ctx.restore();
}

function drawRange(ctx: CanvasRenderingContext2D, x: number, y: number, range: number, ok: boolean) {
  ctx.beginPath();
  ctx.arc(x, y, range, 0, Math.PI * 2);
  ctx.strokeStyle = ok ? "rgba(197, 204, 211, 0.45)" : "rgba(196, 92, 74, 0.4)";
  ctx.lineWidth = 0.035;
  ctx.setLineDash([0.12, 0.1]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = ok ? "rgba(197, 204, 211, 0.05)" : "rgba(196, 92, 74, 0.05)";
  ctx.fill();
}

function drawTowers(ctx: CanvasRenderingContext2D, engine: Engine) {
  for (const t of engine.towers) {
    if (engine.selectedId === t.id) {
      drawRange(ctx, t.x, t.y, engine.towerStats(t).range, true);
    }
    drawTowerBody(ctx, t, 1);
  }
}

function drawTowerBody(ctx: CanvasRenderingContext2D, t: Pick<Tower, "kind" | "x" | "y" | "angle" | "recoil">, alpha: number) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.translate(t.x, t.y);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 0.22, 0.32, 0.1, 0, 0, Math.PI * 2);
  ctx.fill();

  if (t.kind === "sentry") {
    ctx.fillStyle = "#3a3e40";
    roundRect(ctx, -0.22, -0.18, 0.44, 0.42, 0.06);
    ctx.fill();
    ctx.fillStyle = "#5b6368";
    roundRect(ctx, -0.16, -0.28, 0.32, 0.22, 0.05);
    ctx.fill();
    ctx.rotate(t.angle);
    ctx.translate(-t.recoil * 0.06, 0);
    ctx.fillStyle = "#c5ccd3";
    ctx.fillRect(0.02, -0.06, 0.38, 0.12);
    ctx.fillStyle = "#8b949c";
    ctx.beginPath();
    ctx.arc(0, 0, 0.12, 0, Math.PI * 2);
    ctx.fill();
  } else if (t.kind === "repeater") {
    ctx.fillStyle = "#2f3336";
    roundRect(ctx, -0.26, -0.16, 0.52, 0.38, 0.05);
    ctx.fill();
    ctx.fillStyle = "#4a5258";
    roundRect(ctx, -0.2, -0.22, 0.4, 0.18, 0.04);
    ctx.fill();
    ctx.rotate(t.angle);
    ctx.translate(-t.recoil * 0.05, 0);
    ctx.fillStyle = "#d5dbe0";
    ctx.fillRect(0.04, -0.14, 0.34, 0.08);
    ctx.fillRect(0.04, 0.06, 0.34, 0.08);
  } else {
    ctx.fillStyle = "#3d3934";
    ctx.beginPath();
    ctx.arc(0, 0.04, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5c564e";
    ctx.beginPath();
    ctx.arc(0, -0.02, 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.rotate(t.angle);
    ctx.translate(-t.recoil * 0.04, 0);
    ctx.fillStyle = "#2a2824";
    ctx.fillRect(0.04, -0.08, 0.22, 0.16);
    ctx.fillStyle = "#8a8176";
    ctx.beginPath();
    ctx.arc(0.28, 0, 0.08, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawEnemies(ctx: CanvasRenderingContext2D, engine: Engine) {
  const list = engine.enemies.filter((e) => e.alive).sort((a, b) => a.y - b.y);
  for (const e of list) drawEnemy(ctx, e, engine.time);
}

function drawEnemy(ctx: CanvasRenderingContext2D, e: Enemy, time: number) {
  const bob = Math.sin(time * 7 + e.wobble) * 0.03;
  ctx.save();
  ctx.translate(e.x, e.y + bob);
  ctx.rotate(e.angle);
  if (e.flash > 0) ctx.globalAlpha = 0.55 + e.flash * 0.45;

  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.ellipse(0, 0.16, e.radius * 1.1, e.radius * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();

  if (e.kind === "grunt") {
    ctx.fillStyle = "#6a4a42";
    oval(ctx, 0, 0, 0.22, 0.16);
    ctx.fillStyle = "#3a2824";
    oval(ctx, 0.1, 0, 0.1, 0.1);
    ctx.fillStyle = "#c45c4a";
    ctx.fillRect(0.12, -0.03, 0.1, 0.06);
  } else if (e.kind === "runner") {
    ctx.fillStyle = "#5a5854";
    oval(ctx, 0, 0, 0.2, 0.11);
    ctx.fillStyle = "#2e2d2b";
    oval(ctx, 0.12, 0, 0.08, 0.08);
    ctx.strokeStyle = "#8a8176";
    ctx.lineWidth = 0.03;
    ctx.beginPath();
    ctx.moveTo(-0.16, -0.08);
    ctx.lineTo(-0.02, 0);
    ctx.lineTo(-0.16, 0.08);
    ctx.stroke();
  } else if (e.kind === "brute") {
    ctx.fillStyle = "#3e4448";
    roundRect(ctx, -0.28, -0.2, 0.56, 0.4, 0.08);
    ctx.fill();
    ctx.fillStyle = "#2a2e30";
    roundRect(ctx, -0.12, -0.12, 0.32, 0.24, 0.04);
    ctx.fill();
    ctx.fillStyle = "#c45c4a";
    ctx.fillRect(0.14, -0.05, 0.12, 0.1);
  } else {
    ctx.fillStyle = "#2c3034";
    roundRect(ctx, -0.4, -0.28, 0.8, 0.56, 0.1);
    ctx.fill();
    ctx.fillStyle = "#1c1e20";
    roundRect(ctx, -0.18, -0.16, 0.44, 0.32, 0.06);
    ctx.fill();
    ctx.fillStyle = "#c45c4a";
    ctx.globalAlpha = 0.7 + Math.sin(time * 4) * 0.2;
    ctx.fillRect(0.18, -0.08, 0.16, 0.16);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#4a4e52";
    ctx.fillRect(-0.38, -0.34, 0.12, 0.12);
    ctx.fillRect(-0.38, 0.22, 0.12, 0.12);
  }
  ctx.restore();

  if (e.hp < e.maxHp) {
    const w = e.kind === "colossus" ? 0.7 : 0.42;
    ctx.fillStyle = "rgba(10,10,11,0.7)";
    ctx.fillRect(e.x - w / 2, e.y - e.radius - 0.18, w, 0.06);
    ctx.fillStyle = "#c45c4a";
    ctx.fillRect(e.x - w / 2, e.y - e.radius - 0.18, w * Math.max(0, e.hp / e.maxHp), 0.06);
  }
}

function drawProjectiles(ctx: CanvasRenderingContext2D, engine: Engine) {
  for (const p of engine.projectiles) {
    if (!p.alive) continue;
    if (p.kind === "mortar") drawMortarShell(ctx, p, engine);
    else drawBolt(ctx, p);
  }
}

function drawBolt(ctx: CanvasRenderingContext2D, p: Projectile) {
  const ang = Math.atan2(p.ty - p.sy, p.tx - p.sx);
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(ang);
  ctx.strokeStyle = p.kind === "repeater" ? "#eceae4" : "#c5ccd3";
  ctx.lineWidth = p.kind === "repeater" ? 0.045 : 0.07;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-0.16, 0);
  ctx.lineTo(0.1, 0);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(0.08, 0, 0.045, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMortarShell(ctx: CanvasRenderingContext2D, p: Projectile, engine: Engine) {
  const flight = Math.max(0.12, Math.hypot(p.tx - p.sx, p.ty - p.sy) / p.speed);
  const t = Math.min(1, p.age / flight);
  const h = 4 * 0.85 * t * (1 - t);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(p.x, p.y, 0.1 + h * 0.04, 0.05, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2a2824";
  ctx.beginPath();
  ctx.arc(p.x, p.y - h, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#c45c4a";
  ctx.beginPath();
  ctx.arc(p.x, p.y - h - 0.04, 0.035, 0, Math.PI * 2);
  ctx.fill();
  void engine;
}

function drawParticles(ctx: CanvasRenderingContext2D, engine: Engine) {
  for (const p of engine.particles) {
    if (!p.alive) continue;
    const a = Math.max(0, p.life / p.maxLife);
    ctx.globalAlpha = p.kind === "mote" ? 0.18 * a : a;
    if (p.kind === "ring") {
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 0.04;
      ctx.beginPath();
      ctx.arc(p.x, p.y, (1 - a) * 0.7 + 0.15, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

function drawFloaters(ctx: CanvasRenderingContext2D, engine: Engine) {
  ctx.font = "600 0.22px Figtree, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const f of engine.floaters) {
    if (!f.alive) continue;
    const t = f.life / f.maxLife;
    ctx.globalAlpha = Math.min(1, t * 1.6);
    ctx.fillStyle = f.color;
    ctx.fillText(f.text, f.x, f.y);
    ctx.globalAlpha = 1;
  }
}

function drawVignette(ctx: CanvasRenderingContext2D) {
  const g = ctx.createRadialGradient(COLS / 2, ROWS / 2, 3, COLS / 2, ROWS / 2, 9);
  g.addColorStop(0, "rgba(11,12,13,0)");
  g.addColorStop(1, "rgba(11,12,13,0.42)");
  ctx.fillStyle = g;
  ctx.fillRect(-1, -1, COLS + 2, ROWS + 2);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function oval(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}
