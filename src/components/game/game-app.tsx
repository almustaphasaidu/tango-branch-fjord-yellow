import { useEffect, useRef, useState } from "react";
import { Engine } from "@/lib/game/engine";
import { audio } from "@/lib/game/audio";
import { fitCamera, render, screenToCell } from "@/lib/game/render";
import { Dock } from "./dock";
import { Hud } from "./hud";
import { Overlays } from "./overlays";

const STEP = 1 / 60;

export function GameApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const [engine] = useState(() => new Engine());
  engineRef.current = engine;

  useEffect(() => {
    const e = engineRef.current ?? new Engine();
    engineRef.current = e;

    (window as unknown as { __waykeep?: Engine }).__waykeep = e;
    const onVis = () => {
      if (document.visibilityState === "visible") audio.resume();
    };
    document.addEventListener("visibilitychange", onVis);

    const onKey = (ev: KeyboardEvent) => {
      const g = engineRef.current;
      if (!g) return;
      if (ev.code === "Space") {
        ev.preventDefault();
        g.callWave();
      } else if (ev.code === "Escape") {
        if (g.selectedKind || g.selectedId != null) {
          g.deselect();
        } else {
          g.togglePause();
        }
      } else if (ev.code === "Digit1") g.selectKind("sentry");
      else if (ev.code === "Digit2") g.selectKind("repeater");
      else if (ev.code === "Digit3") g.selectKind("mortar");
      else if (ev.code === "KeyP") g.togglePause();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const e = engine;
    if (!canvas || !e) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.1) dt = 0.1;
      acc += dt;
      while (acc >= STEP) {
        e.update(STEP);
        acc -= STEP;
      }
      const ctx = canvas.getContext("2d");
      if (ctx) render(ctx, e, canvas);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [engine]);

  const pointerCell = (ev: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !engine) return null;
    const cam = fitCamera(canvas);
    return screenToCell(canvas, ev.clientX, ev.clientY, cam);
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg text-fg">
      <Hud engine={engine} />
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="relative min-h-[240px] min-w-0 flex-1">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 size-full touch-none"
            onPointerMove={(ev) => {
              const cell = pointerCell(ev);
              if (cell && engine) engine.setHover(cell.x, cell.y);
            }}
            onPointerLeave={() => engine?.clearHover()}
            onPointerDown={(ev) => {
              const cell = pointerCell(ev);
              if (cell && engine) engine.clickCell(cell.x, cell.y);
            }}
          />
          <Overlays engine={engine} />
        </div>
        <Dock engine={engine} />
      </div>
    </div>
  );
}
