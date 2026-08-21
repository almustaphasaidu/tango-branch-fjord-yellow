import type { ReactNode } from "react";
import { Heart, Coins, Flag, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Engine } from "@/lib/game/engine";
import { useGameStore } from "@/lib/game/store";
import { cn } from "@/lib/utils";

export function Hud({ engine }: { engine: Engine | null }) {
  const gold = useGameStore((s) => s.gold);
  const lives = useGameStore((s) => s.lives);
  const wave = useGameStore((s) => s.wave);
  const total = useGameStore((s) => s.totalWaves);
  const remaining = useGameStore((s) => s.remaining);
  const waveActive = useGameStore((s) => s.waveActive);
  const canCall = useGameStore((s) => s.canCallWave);
  const phase = useGameStore((s) => s.phase);
  const muted = useGameStore((s) => s.muted);
  const notice = useGameStore((s) => s.notice);

  const playing = phase === "playing" || phase === "paused";

  return (
    <header className="relative z-10 flex shrink-0 items-center gap-2 border-b border-border bg-bg/90 px-3 py-2 backdrop-blur-sm sm:px-4">
      <div className="min-w-0 flex-1">
        <p className="font-display text-lg font-semibold leading-none tracking-[-0.03em] text-fg">Waykeep</p>
        <p className="mt-0.5 hidden truncate text-xs text-subtle sm:block">Hold the last road</p>
      </div>

      {playing && (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Stat icon={<Heart className="size-3.5" strokeWidth={2} />} value={lives} tone="danger" label="Lives" />
          <Stat icon={<Coins className="size-3.5" strokeWidth={2} />} value={gold} tone="gold" label="Gold" />
          <Stat
            icon={<Flag className="size-3.5" strokeWidth={2} />}
            value={wave === 0 ? `0/${total}` : `${wave}/${total}`}
            label="Wave"
          />
        </div>
      )}

      <div className="flex items-center gap-1">
        {playing && (
          <Button
            variant="secondary"
            size="sm"
            className="hidden h-11 min-w-11 sm:inline-flex"
            disabled={!canCall}
            onClick={() => engine?.callWave()}
          >
            {canCall ? (wave === 0 ? "Call wave" : "Next wave") : waveActive ? `${remaining} left` : "Stand by"}
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label={muted ? "Unmute" : "Mute"}
          onClick={() => engine?.setMuted(!muted)}
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </Button>
        {playing && (
          <Button
            variant="ghost"
            size="icon"
            aria-label={phase === "paused" ? "Resume" : "Pause"}
            onClick={() => engine?.togglePause()}
          >
            {phase === "paused" ? <Play className="size-4" /> : <Pause className="size-4" />}
          </Button>
        )}
      </div>

      {notice && (
        <p className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-1.5 text-xs text-fg">
          {notice}
        </p>
      )}
    </header>
  );
}

function Stat({
  icon,
  value,
  label,
  tone,
}: {
  icon: ReactNode;
  value: number | string;
  label: string;
  tone?: "danger" | "gold";
}) {
  return (
    <div
      className={cn(
        "flex h-11 min-w-11 items-center gap-1.5 rounded-[var(--radius-md)] border border-border bg-surface px-2.5 tabular-nums",
        tone === "danger" && "text-danger",
        tone === "gold" && "text-gold",
      )}
      title={label}
    >
      <span className="text-current opacity-80">{icon}</span>
      <span className="text-sm font-medium text-fg">{value}</span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
