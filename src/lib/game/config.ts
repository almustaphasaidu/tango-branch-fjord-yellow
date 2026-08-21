import type { EnemyDef, EnemyKind, TowerDef, TowerKind, WaveDef } from "./types";

export const COLS = 16;
export const ROWS = 11;

export const START_GOLD = 200;
export const START_LIVES = 20;
export const SELL_RATIO = 0.6;
export const MAX_RANK = 3;
export const UPGRADE_COSTS = [50, 90, 150] as const;
export const DAMAGE_PER_RANK = 0.4;
export const RATE_PER_RANK = 0.28;

/** Cell coordinates the creeps walk. Axis-aligned segments. */
export const PATH_CELLS: readonly [number, number][] = [
  [0, 5],
  [1, 5],
  [2, 5],
  [3, 5],
  [3, 4],
  [3, 3],
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
  [7, 2],
  [7, 3],
  [7, 4],
  [7, 5],
  [7, 6],
  [7, 7],
  [7, 8],
  [8, 8],
  [9, 8],
  [10, 8],
  [11, 8],
  [11, 7],
  [11, 6],
  [11, 5],
  [11, 4],
  [12, 4],
  [13, 4],
  [14, 4],
  [15, 4],
];

export type DecoKind = "pine" | "oak" | "rock" | "ruin" | "pond";

export interface Deco {
  cellX: number;
  cellY: number;
  kind: DecoKind;
}

export const DECOS: readonly Deco[] = [
  { cellX: 1, cellY: 1, kind: "pine" },
  { cellX: 2, cellY: 0, kind: "pine" },
  { cellX: 5, cellY: 0, kind: "oak" },
  { cellX: 8, cellY: 0, kind: "pine" },
  { cellX: 12, cellY: 0, kind: "pine" },
  { cellX: 13, cellY: 1, kind: "rock" },
  { cellX: 0, cellY: 8, kind: "oak" },
  { cellX: 1, cellY: 9, kind: "pine" },
  { cellX: 2, cellY: 10, kind: "pine" },
  { cellX: 5, cellY: 9, kind: "rock" },
  { cellX: 6, cellY: 10, kind: "oak" },
  { cellX: 9, cellY: 5, kind: "ruin" },
  { cellX: 10, cellY: 6, kind: "rock" },
  { cellX: 13, cellY: 7, kind: "pine" },
  { cellX: 14, cellY: 9, kind: "pond" },
  { cellX: 15, cellY: 9, kind: "pond" },
  { cellX: 14, cellY: 10, kind: "pond" },
  { cellX: 15, cellY: 10, kind: "pond" },
  { cellX: 5, cellY: 5, kind: "oak" },
  { cellX: 5, cellY: 6, kind: "pine" },
  { cellX: 12, cellY: 9, kind: "ruin" },
  { cellX: 0, cellY: 2, kind: "rock" },
  { cellX: 9, cellY: 10, kind: "pine" },
  { cellX: 15, cellY: 0, kind: "oak" },
];

export const TOWERS: Record<TowerKind, TowerDef> = {
  sentry: {
    kind: "sentry",
    name: "Sentry",
    blurb: "Long reach. Steady bolts.",
    cost: 75,
    range: 2.75,
    damage: 10,
    fireRate: 1.15,
    projectileSpeed: 9.5,
    splash: 0,
    color: "#9aa7b2",
  },
  repeater: {
    kind: "repeater",
    name: "Repeater",
    blurb: "Short reach. Relentless.",
    cost: 140,
    range: 2.05,
    damage: 6,
    fireRate: 3.4,
    projectileSpeed: 12,
    splash: 0,
    color: "#c5ccd3",
  },
  mortar: {
    kind: "mortar",
    name: "Mortar",
    blurb: "Arcing shells. Splashes.",
    cost: 230,
    range: 3.45,
    damage: 34,
    fireRate: 0.52,
    projectileSpeed: 3.6,
    splash: 1.05,
    color: "#8a8176",
  },
};

export const TOWER_ORDER: TowerKind[] = ["sentry", "repeater", "mortar"];

export const ENEMIES: Record<EnemyKind, EnemyDef> = {
  grunt: { kind: "grunt", name: "Cinder", hp: 28, speed: 1.32, gold: 8, radius: 0.22 },
  runner: { kind: "runner", name: "Skitter", hp: 16, speed: 2.18, gold: 10, radius: 0.18 },
  brute: { kind: "brute", name: "Hull", hp: 120, speed: 0.82, gold: 18, radius: 0.32 },
  colossus: { kind: "colossus", name: "Siege", hp: 460, speed: 0.58, gold: 55, radius: 0.46 },
};

export const WAVES: WaveDef[] = [
  { spawns: [{ kind: "grunt", count: 6, interval: 0.9, delay: 0 }] },
  { spawns: [{ kind: "grunt", count: 10, interval: 0.7, delay: 0 }] },
  {
    spawns: [
      { kind: "grunt", count: 8, interval: 0.75, delay: 0 },
      { kind: "runner", count: 4, interval: 0.55, delay: 2.4 },
    ],
  },
  {
    spawns: [
      { kind: "grunt", count: 10, interval: 0.55, delay: 0 },
      { kind: "runner", count: 8, interval: 0.42, delay: 1.4 },
    ],
  },
  { spawns: [{ kind: "brute", count: 6, interval: 1.15, delay: 0 }] },
  {
    spawns: [
      { kind: "grunt", count: 12, interval: 0.4, delay: 0 },
      { kind: "brute", count: 4, interval: 1.05, delay: 2 },
    ],
  },
  { spawns: [{ kind: "runner", count: 18, interval: 0.3, delay: 0 }] },
  {
    spawns: [
      { kind: "brute", count: 8, interval: 0.85, delay: 0 },
      { kind: "colossus", count: 1, interval: 1, delay: 4 },
    ],
  },
  {
    spawns: [
      { kind: "grunt", count: 14, interval: 0.34, delay: 0 },
      { kind: "runner", count: 10, interval: 0.38, delay: 1 },
      { kind: "brute", count: 5, interval: 0.95, delay: 3 },
    ],
  },
  {
    spawns: [
      { kind: "brute", count: 10, interval: 0.68, delay: 0 },
      { kind: "runner", count: 12, interval: 0.28, delay: 1.8 },
    ],
  },
  {
    spawns: [
      { kind: "grunt", count: 18, interval: 0.26, delay: 0 },
      { kind: "brute", count: 8, interval: 0.75, delay: 2 },
      { kind: "runner", count: 12, interval: 0.32, delay: 3.5 },
    ],
  },
  {
    spawns: [
      { kind: "runner", count: 16, interval: 0.26, delay: 0 },
      { kind: "brute", count: 10, interval: 0.6, delay: 1.8 },
      { kind: "colossus", count: 2, interval: 5, delay: 5.5 },
    ],
  },
];

export const TARGETING_LABEL: Record<string, string> = {
  first: "First",
  last: "Last",
  closest: "Closest",
  strongest: "Strongest",
};

export const TARGETING_CYCLE = ["first", "last", "closest", "strongest"] as const;
