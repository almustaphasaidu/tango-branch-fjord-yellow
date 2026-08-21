import { Button } from "@/components/ui/button";
import { MAX_RANK, TARGETING_LABEL, TOWERS, TOWER_ORDER } from "@/lib/game/config";
import type { Engine } from "@/lib/game/engine";
import { useGameStore } from "@/lib/game/store";
import { cn } from "@/lib/utils";
import type { TowerKind } from "@/lib/game/types";

export function Dock({ engine }: { engine: Engine | null }) {
  const phase = useGameStore((s) => s.phase);
  const gold = useGameStore((s) => s.gold);
  const selectedKind = useGameStore((s) => s.selectedKind);
  const selectedTower = useGameStore((s) => s.selectedTower);
  const canCall = useGameStore((s) => s.canCallWave);
  const waveActive = useGameStore((s) => s.waveActive);
  const remaining = useGameStore((s) => s.remaining);
  const wave = useGameStore((s) => s.wave);

  if (phase !== "playing") return null;

  return (
    <aside className="z-10 flex max-h-[46%] shrink-0 flex-col gap-3 overflow-y-auto border-t border-border bg-surface/95 p-3 backdrop-blur-sm lg:max-h-none lg:w-80 lg:border-l lg:border-t-0 lg:p-4">
      <Button
        variant="primary"
        size="lg"
        className="w-full sm:hidden"
        disabled={!canCall}
        onClick={() => engine?.callWave()}
      >
        {canCall ? (wave === 0 ? "Call first wave" : "Call next wave") : waveActive ? `${remaining} remaining` : "Stand by"}
      </Button>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-subtle">Towers</p>
        <div className="grid grid-cols-3 gap-2">
          {TOWER_ORDER.map((kind) => (
            <TowerCard
              key={kind}
              kind={kind}
              gold={gold}
              selected={selectedKind === kind}
              onSelect={() => engine?.selectKind(selectedKind === kind ? null : kind)}
            />
          ))}
        </div>
      </div>

      {selectedTower ? (
        <SelectedPanel engine={engine} gold={gold} />
      ) : (
        <p className="hidden text-xs leading-relaxed text-muted lg:block">
          Select a type, then tap a clear plot. Tap a placed tower to upgrade damage or fire rate.
        </p>
      )}
    </aside>
  );
}

function TowerCard({
  kind,
  gold,
  selected,
  onSelect,
}: {
  kind: TowerKind;
  gold: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const def = TOWERS[kind];
  const afford = gold >= def.cost;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex min-h-11 flex-col items-start gap-0.5 rounded-[var(--radius-md)] border px-2.5 py-2 text-left transition-[border-color,background-color] duration-[var(--motion-quick)]",
        selected ? "border-accent bg-surface-2" : "border-border bg-bg hover:border-border-strong",
        !afford && "opacity-50",
      )}
    >
      <span className="text-sm font-medium text-fg">{def.name}</span>
      <span className="text-xs tabular-nums text-gold">{def.cost}</span>
    </button>
  );
}

function SelectedPanel({ engine, gold }: { engine: Engine | null; gold: number }) {
  const t = useGameStore((s) => s.selectedTower);
  if (!t) return null;
  const dmgMax = t.damageRank >= MAX_RANK;
  const rateMax = t.rateRank >= MAX_RANK;

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-bg p-3">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-fg">{t.name}</p>
          <p className="text-xs text-muted">
            {t.damage.toFixed(0)} dmg · {t.fireRate.toFixed(1)}/s
          </p>
        </div>
        <button
          type="button"
          onClick={() => engine?.cycleTargeting()}
          className="h-9 rounded-[var(--radius-sm)] border border-border px-2 text-xs text-muted hover:text-fg"
        >
          {TARGETING_LABEL[t.targeting]}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="h-11 flex-col gap-0 py-1"
          disabled={dmgMax || (t.nextDamageCost != null && gold < t.nextDamageCost)}
          onClick={() => engine?.upgradeDamage()}
        >
          <span>Damage</span>
          <span className="text-xs tabular-nums text-muted">
            {dmgMax ? "Max" : `${t.nextDamageCost} · ${t.damageRank}/${MAX_RANK}`}
          </span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-11 flex-col gap-0 py-1"
          disabled={rateMax || (t.nextRateCost != null && gold < t.nextRateCost)}
          onClick={() => engine?.upgradeRate()}
        >
          <span>Fire rate</span>
          <span className="text-xs tabular-nums text-muted">
            {rateMax ? "Max" : `${t.nextRateCost} · ${t.rateRank}/${MAX_RANK}`}
          </span>
        </Button>
      </div>
      <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={() => engine?.sell()}>
        Sell · {t.sellValue} gold
      </Button>
    </div>
  );
}
