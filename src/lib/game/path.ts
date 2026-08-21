import { COLS, PATH_CELLS } from "./config";

export interface PathSeg {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  len: number;
  acc: number;
}

export interface PathData {
  segs: PathSeg[];
  length: number;
  cellSet: Set<string>;
}

export function cellKey(x: number, y: number): string {
  return `${x},${y}`;
}

export function buildPath(): PathData {
  const centers = PATH_CELLS.map(([c, r]) => ({ x: c + 0.5, y: r + 0.5 }));
  const start = centers[0];
  const end = centers[centers.length - 1];
  const points = [{ x: -0.7, y: start.y }, ...centers, { x: COLS + 0.55, y: end.y }];

  const segs: PathSeg[] = [];
  let acc = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    segs.push({ x0: a.x, y0: a.y, x1: b.x, y1: b.y, len, acc });
    acc += len;
  }

  return {
    segs,
    length: acc,
    cellSet: new Set(PATH_CELLS.map(([c, r]) => cellKey(c, r))),
  };
}

export function pointOnPath(path: PathData, dist: number): { x: number; y: number; angle: number } {
  const d = Math.max(0, Math.min(dist, path.length));
  for (let i = 0; i < path.segs.length; i++) {
    const s = path.segs[i];
    if (d <= s.acc + s.len || i === path.segs.length - 1) {
      const t = s.len < 1e-6 ? 1 : Math.min(1, (d - s.acc) / s.len);
      return {
        x: s.x0 + (s.x1 - s.x0) * t,
        y: s.y0 + (s.y1 - s.y0) * t,
        angle: Math.atan2(s.y1 - s.y0, s.x1 - s.x0),
      };
    }
  }
  const last = path.segs[path.segs.length - 1];
  return { x: last.x1, y: last.y1, angle: Math.atan2(last.y1 - last.y0, last.x1 - last.x0) };
}
