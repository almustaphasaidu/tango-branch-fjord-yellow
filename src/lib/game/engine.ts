import {
  COLS,
  DAMAGE_PER_RANK,
  DECOS,
  ENEMIES,
  MAX_RANK,
  RATE_PER_RANK,
  ROWS,
  SELL_RATIO,
  START_GOLD,
  START_LIVES,
  TARGETING_CYCLE,
  TOWERS,
  UPGRADE_COSTS,
  WAVES,
} from "./config";
import { audio } from "./audio";
import { buildPath, cellKey, pointOnPath, type PathData } from "./path";
import { useGameStore } from "./store";
import type {
  Enemy,
  Floater,
  HoverCell,
  Particle,
  Phase,
  Projectile,
  Targeting,
  Tower,
  TowerKind,
  TowerView,
} from "./types";

const PARTICLE_CAP = 280;
const FLOATER_CAP = 40;
const PROJECTILE_CAP = 80;
const ENEMY_CAP = 80;

function hash(x: number, y: number): number {
  let n = x * 374761393 + y * 668265263;
  n = (n ^ (n >> 13)) * 1274126177;
  return ((n ^ (n >> 16)) >>> 0) / 4294967296;
}

function angleLerp(a: number, b: number, t: number): number {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

export class Engine {
  readonly path: PathData = buildPath();
  readonly blocked = new Set<string>(DECOS.map((d) => cellKey(d.cellX, d.cellY)));
  readonly occupied = new Set<string>();

  phase: Phase = "title";
  gold = START_GOLD;
  lives = START_LIVES;
  waveIndex = -1;
  selectedKind: TowerKind | null = null;
  selectedId: number | null = null;
  hover: HoverCell | null = null;
  muted = false;
  notice: string | null = null;
  noticeT = 0;

  towers: Tower[] = [];
  enemies: Enemy[] = [];
  projectiles: Projectile[] = [];
  particles: Particle[] = [];
  floaters: Floater[] = [];

  time = 0;
  waveTime = 0;
  spawning = false;
  spawned: number[] = [];
  trauma = 0;
  hitstop = 0;
  reducedMotion = false;
  nextId = 1;
  private lastSig = "";

  constructor() {
    if (typeof window !== "undefined") {
      this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    this.seedMotes();
    this.sync();
  }

  start() {
    audio.unlock();
    this.reset(false);
    this.phase = "playing";
    this.sync();
  }

  restart() {
    audio.unlock();
    this.reset(false);
    this.phase = "playing";
    this.sync();
  }

  toTitle() {
    this.reset(true);
    this.phase = "title";
    this.sync();
  }

  togglePause() {
    if (this.phase === "playing") {
      this.phase = "paused";
    } else if (this.phase === "paused") {
      this.phase = "playing";
    }
    this.sync();
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    audio.setMuted(muted);
    this.sync();
  }

  selectKind(kind: TowerKind | null) {
    if (this.phase !== "playing") return;
    this.selectedKind = kind;
    this.selectedId = null;
    this.sync();
  }

  setHover(cellX: number, cellY: number) {
    if (cellX < 0 || cellY < 0 || cellX >= COLS || cellY >= ROWS) {
      this.hover = null;
      return;
    }
    this.hover = { x: cellX, y: cellY, buildable: this.isBuildable(cellX, cellY) };
  }

  clearHover() {
    this.hover = null;
  }

  clickCell(cellX: number, cellY: number) {
    if (this.phase !== "playing") return;
    if (cellX < 0 || cellY < 0 || cellX >= COLS || cellY >= ROWS) return;

    const tower = this.towers.find((t) => t.cellX === cellX && t.cellY === cellY);
    if (tower) {
      this.selectedId = tower.id;
      this.selectedKind = null;
      this.sync();
      return;
    }

    if (this.selectedKind) {
      this.tryPlace(cellX, cellY);
      return;
    }

    this.selectedId = null;
    this.sync();
  }

  tryPlace(cellX: number, cellY: number) {
    const kind = this.selectedKind;
    if (!kind) return;
    if (!this.isBuildable(cellX, cellY)) {
      this.ping("That plot is blocked.");
      audio.deny();
      return;
    }
    const def = TOWERS[kind];
    if (this.gold < def.cost) {
      this.ping("Not enough gold.");
      audio.deny();
      return;
    }
    this.gold -= def.cost;
    const t: Tower = {
      id: this.nextId++,
      kind,
      cellX,
      cellY,
      x: cellX + 0.5,
      y: cellY + 0.5,
      angle: -Math.PI / 2,
      cooldown: 0.2,
      damageRank: 0,
      rateRank: 0,
      targeting: "first",
      spent: def.cost,
      recoil: 0,
    };
    this.towers.push(t);
    this.occupied.add(cellKey(cellX, cellY));
    audio.place();
    this.burst(t.x, t.y, "#c5ccd3", 8, "spark");
    this.sync();
  }

  upgradeDamage() {
    const t = this.selectedTower();
    if (!t || t.damageRank >= MAX_RANK) return;
    const cost = UPGRADE_COSTS[t.damageRank];
    if (this.gold < cost) {
      this.ping("Not enough gold.");
      audio.deny();
      return;
    }
    this.gold -= cost;
    t.damageRank += 1;
    t.spent += cost;
    audio.upgrade();
    this.burst(t.x, t.y, "#eceae4", 10, "spark");
    this.sync();
  }

  upgradeRate() {
    const t = this.selectedTower();
    if (!t || t.rateRank >= MAX_RANK) return;
    const cost = UPGRADE_COSTS[t.rateRank];
    if (this.gold < cost) {
      this.ping("Not enough gold.");
      audio.deny();
      return;
    }
    this.gold -= cost;
    t.rateRank += 1;
    t.spent += cost;
    audio.upgrade();
    this.burst(t.x, t.y, "#eceae4", 10, "spark");
    this.sync();
  }

  cycleTargeting() {
    const t = this.selectedTower();
    if (!t) return;
    const i = TARGETING_CYCLE.indexOf(t.targeting);
    t.targeting = TARGETING_CYCLE[(i + 1) % TARGETING_CYCLE.length] as Targeting;
    this.sync();
  }

  sell() {
    const t = this.selectedTower();
    if (!t) return;
    const value = Math.floor(t.spent * SELL_RATIO);
    this.gold += value;
    this.occupied.delete(cellKey(t.cellX, t.cellY));
    this.towers = this.towers.filter((x) => x.id !== t.id);
    this.selectedId = null;
    this.float(t.x, t.y, `+${value}`, "#c4a574");
    audio.place();
    this.sync();
  }

  callWave() {
    if (this.phase !== "playing") return;
    if (!this.canCallWave()) {
      this.ping("A wave is already in the field.");
      return;
    }
    if (this.waveIndex + 1 >= WAVES.length) return;
    this.waveIndex += 1;
    this.waveTime = 0;
    this.spawning = true;
    this.spawned = WAVES[this.waveIndex].spawns.map(() => 0);
    audio.wave();
    this.sync();
  }

  isBuildable(cx: number, cy: number): boolean {
    if (cx < 0 || cy < 0 || cx >= COLS || cy >= ROWS) return false;
    const k = cellKey(cx, cy);
    if (this.path.cellSet.has(k)) return false;
    if (this.blocked.has(k)) return false;
    if (this.occupied.has(k)) return false;
    return true;
  }

  canCallWave(): boolean {
    if (this.phase !== "playing") return false;
    if (this.spawning) return false;
    if (this.livingCount() > 0) return false;
    return this.waveIndex + 1 < WAVES.length;
  }

  towerStats(t: Tower) {
    const def = TOWERS[t.kind];
    const damage = def.damage * (1 + DAMAGE_PER_RANK * t.damageRank);
    const fireRate = def.fireRate * (1 + RATE_PER_RANK * t.rateRank);
    return { def, damage, fireRate, range: def.range };
  }

  selectedTower(): Tower | undefined {
    if (this.selectedId == null) return undefined;
    return this.towers.find((t) => t.id === this.selectedId);
  }

  update(dt: number) {
    this.time += dt;
    if (this.noticeT > 0) {
      this.noticeT -= dt;
      if (this.noticeT <= 0) this.notice = null;
    }

    if (this.phase === "paused" || this.phase === "title") {
      this.updateParticles(dt * 0.6);
      this.sync();
      return;
    }
    if (this.phase !== "playing") {
      this.updateParticles(dt);
      this.sync();
      return;
    }

    if (this.hitstop > 0) {
      this.hitstop -= dt;
      this.updateParticles(dt);
      return;
    }

    this.trauma = Math.max(0, this.trauma - dt * 2.4);

    if (this.spawning) this.advanceSpawns(dt);

    for (const e of this.enemies) {
      if (!e.alive) continue;
      e.dist += e.speed * dt;
      e.flash = Math.max(0, e.flash - dt * 6);
      e.wobble += dt;
      const p = pointOnPath(this.path, e.dist);
      e.x = p.x;
      e.y = p.y;
      e.angle = p.angle;
      if (e.dist >= this.path.length) {
        e.alive = false;
        this.lives -= 1;
        this.addTrauma(0.55);
        this.hitstop = this.reducedMotion ? 0 : 0.06;
        audio.leak();
        this.burst(e.x, e.y, "#c45c4a", 14, "spark");
        if (this.lives <= 0) {
          this.lives = 0;
          this.phase = "lost";
          audio.lose();
        }
      }
    }

    for (const t of this.towers) {
      t.recoil = Math.max(0, t.recoil - dt * 6);
      t.cooldown -= dt;
      const target = this.pickTarget(t);
      if (target) {
        const desired = Math.atan2(target.y - t.y, target.x - t.x);
        t.angle = angleLerp(t.angle, desired, 1 - Math.exp(-14 * dt));
        if (t.cooldown <= 0) this.fire(t, target);
      }
    }

    this.updateProjectiles(dt);
    this.updateParticles(dt);

    if (!this.spawning && this.livingCount() === 0 && this.waveIndex >= 0) {
      if (this.waveIndex + 1 >= WAVES.length && this.phase === "playing") {
        this.phase = "won";
        audio.win();
        this.addTrauma(0.3);
      }
    }

    this.sync();
  }

  shakeOffset(): { x: number; y: number } {
    if (this.reducedMotion || this.trauma <= 0) return { x: 0, y: 0 };
    const mag = this.trauma * this.trauma * 0.18;
    return {
      x: mag * Math.sin(this.time * 47.2),
      y: mag * Math.cos(this.time * 41.7),
    };
  }

  private reset(keepTitle: boolean) {
    this.gold = START_GOLD;
    this.lives = START_LIVES;
    this.waveIndex = -1;
    this.selectedKind = null;
    this.selectedId = null;
    this.hover = null;
    this.towers = [];
    this.occupied.clear();
    this.enemies.forEach((e) => {
      e.alive = false;
    });
    this.projectiles.forEach((p) => {
      p.alive = false;
    });
    this.floaters.forEach((f) => {
      f.alive = false;
    });
    this.spawning = false;
    this.spawned = [];
    this.waveTime = 0;
    this.trauma = 0;
    this.hitstop = 0;
    this.notice = null;
    this.noticeT = 0;
    if (!keepTitle) this.phase = "playing";
    this.seedMotes();
  }

  private advanceSpawns(dt: number) {
    this.waveTime += dt;
    const wave = WAVES[this.waveIndex];
    let allDone = true;
    for (let i = 0; i < wave.spawns.length; i++) {
      const group = wave.spawns[i];
      const already = this.spawned[i];
      if (already < group.count) {
        allDone = false;
        const due = group.delay + already * group.interval;
        if (this.waveTime >= due) {
          this.spawnEnemy(group.kind);
          this.spawned[i] += 1;
        }
      }
    }
    if (allDone) this.spawning = false;
  }

  private spawnEnemy(kind: Enemy["kind"]) {
    const def = ENEMIES[kind];
    const p = pointOnPath(this.path, 0);
    let e = this.enemies.find((x) => !x.alive);
    if (!e) {
      if (this.enemies.length >= ENEMY_CAP) return;
      e = {
        id: 0,
        kind,
        alive: true,
        hp: def.hp,
        maxHp: def.hp,
        dist: 0,
        x: p.x,
        y: p.y,
        angle: p.angle,
        speed: def.speed,
        gold: def.gold,
        radius: def.radius,
        flash: 0,
        wobble: Math.random() * 10,
      };
      this.enemies.push(e);
    }
    e.id = this.nextId++;
    e.kind = kind;
    e.alive = true;
    e.hp = def.hp;
    e.maxHp = def.hp;
    e.dist = 0;
    e.x = p.x;
    e.y = p.y;
    e.angle = p.angle;
    e.speed = def.speed;
    e.gold = def.gold;
    e.radius = def.radius;
    e.flash = 0;
    e.wobble = Math.random() * 10;
  }

  private pickTarget(tower: Tower): Enemy | null {
    const { range } = this.towerStats(tower);
    const range2 = range * range;
    let best: Enemy | null = null;
    let bestScore = -Infinity;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      const dx = e.x - tower.x;
      const dy = e.y - tower.y;
      const d2 = dx * dx + dy * dy;
      if (d2 > range2) continue;
      let score = 0;
      switch (tower.targeting) {
        case "first":
          score = e.dist;
          break;
        case "last":
          score = -e.dist;
          break;
        case "closest":
          score = -d2;
          break;
        case "strongest":
          score = e.hp;
          break;
      }
      if (score > bestScore) {
        bestScore = score;
        best = e;
      }
    }
    return best;
  }

  private fire(tower: Tower, target: Enemy) {
    const { def, damage, fireRate } = this.towerStats(tower);
    tower.cooldown = 1 / fireRate;
    tower.recoil = 1;
    audio.shoot(tower.kind);

    let tx = target.x;
    let ty = target.y;
    if (tower.kind === "mortar") {
      const eta = Math.hypot(target.x - tower.x, target.y - tower.y) / def.projectileSpeed;
      const pred = pointOnPath(this.path, target.dist + target.speed * eta * 0.85);
      tx = pred.x;
      ty = pred.y;
    }

    let p = this.projectiles.find((x) => !x.alive);
    if (!p) {
      if (this.projectiles.length >= PROJECTILE_CAP) return;
      p = {
        id: 0,
        alive: true,
        kind: tower.kind,
        x: tower.x,
        y: tower.y,
        tx,
        ty,
        sx: tower.x,
        sy: tower.y,
        speed: def.projectileSpeed,
        damage,
        splash: def.splash,
        targetId: target.id,
        age: 0,
        ttl: 2.4,
      };
      this.projectiles.push(p);
    }
    p.id = this.nextId++;
    p.alive = true;
    p.kind = tower.kind;
    const muzzle = 0.32;
    p.x = tower.x + Math.cos(tower.angle) * muzzle;
    p.y = tower.y + Math.sin(tower.angle) * muzzle;
    p.sx = p.x;
    p.sy = p.y;
    p.tx = tx;
    p.ty = ty;
    p.speed = def.projectileSpeed;
    p.damage = damage;
    p.splash = def.splash;
    p.targetId = target.id;
    p.age = 0;
    p.ttl = 2.6;
  }

  private updateProjectiles(dt: number) {
    for (const p of this.projectiles) {
      if (!p.alive) continue;
      p.age += dt;
      if (p.age > p.ttl) {
        p.alive = false;
        continue;
      }

      if (p.kind !== "mortar") {
        const target = this.enemies.find((e) => e.id === p.targetId && e.alive);
        if (target) {
          p.tx = target.x;
          p.ty = target.y;
        }
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        const dist = Math.hypot(dx, dy);
        const step = p.speed * dt;
        if (dist <= step + 0.08) {
          this.impact(p, target ?? null);
          p.alive = false;
        } else {
          p.x += (dx / dist) * step;
          p.y += (dy / dist) * step;
        }
      } else {
        const flight = Math.max(0.12, Math.hypot(p.tx - p.sx, p.ty - p.sy) / p.speed);
        const t = Math.min(1, p.age / flight);
        p.x = p.sx + (p.tx - p.sx) * t;
        p.y = p.sy + (p.ty - p.sy) * t;
        if (t >= 1) {
          this.impact(p, null);
          p.alive = false;
        }
      }
    }
  }

  private impact(p: Projectile, direct: Enemy | null) {
    if (p.splash > 0) {
      const r2 = p.splash * p.splash;
      for (const e of this.enemies) {
        if (!e.alive) continue;
        const dx = e.x - p.x;
        const dy = e.y - p.y;
        if (dx * dx + dy * dy <= r2) this.hurt(e, p.damage);
      }
      this.burst(p.x, p.y, "#c45c4a", 16, "spark");
      this.ring(p.x, p.y, "#c5ccd3");
      this.addTrauma(0.22);
    } else if (direct) {
      this.hurt(direct, p.damage);
      this.burst(p.x, p.y, "#eceae4", 6, "spark");
    }
  }

  private hurt(e: Enemy, amount: number) {
    e.hp -= amount;
    e.flash = 1;
    audio.hit();
    this.float(e.x, e.y - 0.2, `${Math.round(amount)}`, "#eceae4");
    if (e.hp <= 0) {
      e.alive = false;
      this.gold += e.gold;
      audio.kill();
      this.float(e.x, e.y, `+${e.gold}`, "#c4a574");
      this.burst(e.x, e.y, e.kind === "colossus" ? "#c45c4a" : "#8a8176", e.kind === "colossus" ? 22 : 12, "spark");
      this.burst(e.x, e.y, "#3d342c", 6, "smoke");
      if (e.kind === "colossus") {
        this.addTrauma(0.45);
        this.hitstop = this.reducedMotion ? 0 : 0.05;
      }
    }
  }

  private livingCount() {
    let n = 0;
    for (const e of this.enemies) if (e.alive) n += 1;
    return n;
  }

  private remainingInWave() {
    if (this.waveIndex < 0) return 0;
    const wave = WAVES[this.waveIndex];
    let left = 0;
    if (this.spawning) {
      for (let i = 0; i < wave.spawns.length; i++) {
        left += wave.spawns[i].count - this.spawned[i];
      }
    }
    return left + this.livingCount();
  }

  private addTrauma(v: number) {
    if (this.reducedMotion) return;
    this.trauma = Math.min(1, this.trauma + v);
  }

  private burst(x: number, y: number, color: string, n: number, kind: Particle["kind"]) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 0.4 + Math.random() * 1.8;
      this.spawnParticle({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life: 0.25 + Math.random() * 0.35,
        maxLife: 0.5,
        size: kind === "smoke" ? 0.18 : 0.06 + Math.random() * 0.05,
        color,
        kind,
      });
    }
  }

  private ring(x: number, y: number, color: string) {
    this.spawnParticle({
      x,
      y,
      vx: 0,
      vy: 0,
      life: 0.28,
      maxLife: 0.28,
      size: 0.2,
      color,
      kind: "ring",
    });
  }

  private spawnParticle(init: Omit<Particle, "alive">) {
    let p = this.particles.find((x) => !x.alive);
    if (!p) {
      if (this.particles.length >= PARTICLE_CAP) return;
      p = { ...init, alive: true };
      this.particles.push(p);
      return;
    }
    Object.assign(p, init);
    p.alive = true;
    p.maxLife = init.life;
  }

  private float(x: number, y: number, text: string, color: string) {
    let f = this.floaters.find((x) => !x.alive);
    if (!f) {
      if (this.floaters.length >= FLOATER_CAP) return;
      f = { alive: true, x, y, text, life: 0.7, maxLife: 0.7, color };
      this.floaters.push(f);
      return;
    }
    f.alive = true;
    f.x = x;
    f.y = y;
    f.text = text;
    f.life = 0.7;
    f.maxLife = 0.7;
    f.color = color;
  }

  private updateParticles(dt: number) {
    for (const p of this.particles) {
      if (!p.alive) continue;
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.96;
      p.vy *= 0.96;
      if (p.kind === "smoke") p.size += dt * 0.2;
      if (p.kind === "mote") {
        if (p.y < -0.3) p.y = ROWS + 0.2;
        if (p.x < -0.3) p.x = COLS + 0.2;
        if (p.x > COLS + 0.3) p.x = -0.2;
        if (p.life <= 0) p.life = p.maxLife;
        continue;
      }
      if (p.life <= 0) p.alive = false;
    }
    for (const f of this.floaters) {
      if (!f.alive) continue;
      f.life -= dt;
      f.y -= dt * 0.55;
      if (f.life <= 0) f.alive = false;
    }
  }

  private seedMotes() {
    for (const p of this.particles) {
      if (p.kind === "mote") p.alive = false;
    }
    for (let i = 0; i < 28; i++) {
      this.spawnParticle({
        x: hash(i, 3) * COLS,
        y: hash(i, 7) * ROWS,
        vx: (hash(i, 11) - 0.5) * 0.12,
        vy: -0.08 - hash(i, 13) * 0.08,
        life: 8 + hash(i, 17) * 10,
        maxLife: 12,
        size: 0.03 + hash(i, 19) * 0.03,
        color: "#c5ccd3",
        kind: "mote",
      });
    }
  }

  deselect() {
    this.selectedKind = null;
    this.selectedId = null;
    this.sync();
  }

  private ping(text: string) {
    this.notice = text;
    this.noticeT = 1.6;
  }

  private towerView(t: Tower): TowerView {
    const { def, damage, fireRate, range } = this.towerStats(t);
    return {
      id: t.id,
      kind: t.kind,
      name: def.name,
      damageRank: t.damageRank,
      rateRank: t.rateRank,
      targeting: t.targeting,
      damage,
      fireRate,
      range,
      nextDamageCost: t.damageRank < MAX_RANK ? UPGRADE_COSTS[t.damageRank] : null,
      nextRateCost: t.rateRank < MAX_RANK ? UPGRADE_COSTS[t.rateRank] : null,
      sellValue: Math.floor(t.spent * SELL_RATIO),
    };
  }

  private sync() {
    const selected = this.selectedTower();
    const sig = [
      this.phase,
      this.gold,
      this.lives,
      this.waveIndex,
      this.spawning ? 1 : 0,
      this.livingCount(),
      this.selectedKind,
      this.selectedId,
      selected?.damageRank,
      selected?.rateRank,
      selected?.targeting,
      this.muted ? 1 : 0,
      this.notice,
      this.canCallWave() ? 1 : 0,
    ].join("|");
    if (sig === this.lastSig) return;
    this.lastSig = sig;
    useGameStore.setState({
      phase: this.phase,
      gold: this.gold,
      lives: this.lives,
      wave: this.waveIndex + 1,
      totalWaves: WAVES.length,
      canCallWave: this.canCallWave(),
      waveActive: this.spawning || this.livingCount() > 0,
      remaining: this.remainingInWave(),
      selectedKind: this.selectedKind,
      selectedTower: selected ? this.towerView(selected) : null,
      muted: this.muted,
      notice: this.notice,
    });
  }
}

export function hash2(x: number, y: number): number {
  return hash(x, y);
}
