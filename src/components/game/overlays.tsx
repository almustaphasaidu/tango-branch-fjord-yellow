import { Button } from "@/components/ui/button";
import type { Engine } from "@/lib/game/engine";
import { useGameStore } from "@/lib/game/store";

export function Overlays({ engine }: { engine: Engine | null }) {
  const phase = useGameStore((s) => s.phase);
  const wave = useGameStore((s) => s.wave);
  const total = useGameStore((s) => s.totalWaves);
  const gold = useGameStore((s) => s.gold);

  if (phase === "playing") return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-bg/70 px-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md rounded-[var(--radius-xl)] border border-border bg-surface p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8">
        {phase === "title" && (
          <TitleCard
            onPlay={() => engine?.start()}
          />
        )}
        {phase === "paused" && (
          <PauseCard
            onResume={() => engine?.togglePause()}
            onMenu={() => engine?.toTitle()}
          />
        )}
        {phase === "lost" && (
          <EndCard
            title="The gate fell"
            body={`The road was lost on wave ${Math.max(1, wave)} of ${total}.`}
            onAgain={() => engine?.restart()}
            onMenu={() => engine?.toTitle()}
          />
        )}
        {phase === "won" && (
          <EndCard
            title="The road holds"
            body={`All ${total} waves turned. ${gold} gold left in the coffers.`}
            onAgain={() => engine?.restart()}
            onMenu={() => engine?.toTitle()}
          />
        )}
      </div>
    </div>
  );
}

function TitleCard({ onPlay }: { onPlay: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">Tower defense</p>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl">
          Waykeep
        </h1>
        <p className="max-w-sm text-base text-muted">
          The road is the last thing still ours. Place towers, spend the spoils, hold the gate.
        </p>
      </div>
      <ul className="space-y-2 text-sm text-muted">
        <li className="flex gap-3">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
          Choose a tower, then a clear plot beside the path.
        </li>
        <li className="flex gap-3">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
          Call a wave when you are ready. Kills pay gold.
        </li>
        <li className="flex gap-3">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
          Upgrade damage or fire rate. A leak costs a life.
        </li>
      </ul>
      <Button variant="primary" size="lg" className="w-full" onClick={onPlay}>
        Enter the keep
      </Button>
    </div>
  );
}

function PauseCard({ onResume, onMenu }: { onResume: () => void; onMenu: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">Paused</h2>
        <p className="mt-1 text-sm text-muted">The field is still. The road is not.</p>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="primary" size="lg" onClick={onResume}>
          Resume
        </Button>
        <Button variant="ghost" size="md" onClick={onMenu}>
          Abandon
        </Button>
      </div>
    </div>
  );
}

function EndCard({
  title,
  body,
  onAgain,
  onMenu,
}: {
  title: string;
  body: string;
  onAgain: () => void;
  onMenu: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">{title}</h2>
        <p className="mt-2 text-sm text-muted">{body}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="primary" size="lg" onClick={onAgain}>
          Rally again
        </Button>
        <Button variant="ghost" size="md" onClick={onMenu}>
          Return
        </Button>
      </div>
    </div>
  );
}
