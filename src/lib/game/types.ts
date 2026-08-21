export type Phase = "title" | "playing" | "paused" | "won" | "lost";

export type TowerKind = "sentry" | "repeater" | "mortar";

export type EnemyKind = "grunt" | "runner" | "brute" | "colossus";

export type Targeting = "first" | "last" | "closest" | "strongest";

export interface TowerDef {
  kind: TowerKind;
  name: string;
  blurb: string;
  cost: number;
  range: number;
  damage: number;
  fireRate: number;
  projectileSpeed: number;
  splash: number;
  color: string;
}

export interface EnemyDef {
  kind: EnemyKind;
  name: string;
  hp: number;
  speed: number;
  gold: number;
  radius: number;
}

export interface WaveSpawn {
  kind: EnemyKind;
  count: number;
  interval: number;
  delay: number;
}

export interface WaveDef {
  spawns: WaveSpawn[];
}

export interface Tower {
  id: number;
  kind: TowerKind;
  cellX: number;
  cellY: number;
  x: number;
  y: number;
  angle: number;
  cooldown: number;
  damageRank: number;
  rateRank: number;
  targeting: Targeting;
  spent: number;
  recoil: number;
}

export interface Enemy {
  id: number;
  kind: EnemyKind;
  alive: boolean;
  hp: number;
  maxHp: number;
  dist: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  gold: number;
  radius: number;
  flash: number;
  wobble: number;
}

export interface Projectile {
  id: number;
  alive: boolean;
  kind: TowerKind;
  x: number;
  y: number;
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  speed: number;
  damage: number;
  splash: number;
  targetId: number;
  age: number;
  ttl: number;
}

export interface Particle {
  alive: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  kind: "spark" | "smoke" | "ring" | "mote";
}

export interface Floater {
  alive: boolean;
  x: number;
  y: number;
  text: string;
  life: number;
  maxLife: number;
  color: string;
}

export interface HoverCell {
  x: number;
  y: number;
  buildable: boolean;
}

export interface TowerView {
  id: number;
  kind: TowerKind;
  name: string;
  damageRank: number;
  rateRank: number;
  targeting: Targeting;
  damage: number;
  fireRate: number;
  range: number;
  nextDamageCost: number | null;
  nextRateCost: number | null;
  sellValue: number;
}

export interface GameUI {
  phase: Phase;
  gold: number;
  lives: number;
  wave: number;
  totalWaves: number;
  canCallWave: boolean;
  waveActive: boolean;
  remaining: number;
  selectedKind: TowerKind | null;
  selectedTower: TowerView | null;
  muted: boolean;
  notice: string | null;
}
