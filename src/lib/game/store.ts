import { create } from "zustand";
import { START_GOLD, START_LIVES, WAVES } from "./config";
import type { GameUI } from "./types";

export const useGameStore = create<GameUI>(() => ({
  phase: "title",
  gold: START_GOLD,
  lives: START_LIVES,
  wave: 0,
  totalWaves: WAVES.length,
  canCallWave: false,
  waveActive: false,
  remaining: 0,
  selectedKind: null,
  selectedTower: null,
  muted: false,
  notice: null,
}));
