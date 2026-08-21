import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Pause, c as Coins, i as Play, n as Volume2, o as Heart, s as Flag, t as VolumeX } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CSME5cNL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SELL_RATIO = .6;
var UPGRADE_COSTS = [
	50,
	90,
	150
];
var DAMAGE_PER_RANK = .4;
var RATE_PER_RANK = .28;
/** Cell coordinates the creeps walk. Axis-aligned segments. */
var PATH_CELLS = [
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
	[15, 4]
];
var DECOS = [
	{
		cellX: 1,
		cellY: 1,
		kind: "pine"
	},
	{
		cellX: 2,
		cellY: 0,
		kind: "pine"
	},
	{
		cellX: 5,
		cellY: 0,
		kind: "oak"
	},
	{
		cellX: 8,
		cellY: 0,
		kind: "pine"
	},
	{
		cellX: 12,
		cellY: 0,
		kind: "pine"
	},
	{
		cellX: 13,
		cellY: 1,
		kind: "rock"
	},
	{
		cellX: 0,
		cellY: 8,
		kind: "oak"
	},
	{
		cellX: 1,
		cellY: 9,
		kind: "pine"
	},
	{
		cellX: 2,
		cellY: 10,
		kind: "pine"
	},
	{
		cellX: 5,
		cellY: 9,
		kind: "rock"
	},
	{
		cellX: 6,
		cellY: 10,
		kind: "oak"
	},
	{
		cellX: 9,
		cellY: 5,
		kind: "ruin"
	},
	{
		cellX: 10,
		cellY: 6,
		kind: "rock"
	},
	{
		cellX: 13,
		cellY: 7,
		kind: "pine"
	},
	{
		cellX: 14,
		cellY: 9,
		kind: "pond"
	},
	{
		cellX: 15,
		cellY: 9,
		kind: "pond"
	},
	{
		cellX: 14,
		cellY: 10,
		kind: "pond"
	},
	{
		cellX: 15,
		cellY: 10,
		kind: "pond"
	},
	{
		cellX: 5,
		cellY: 5,
		kind: "oak"
	},
	{
		cellX: 5,
		cellY: 6,
		kind: "pine"
	},
	{
		cellX: 12,
		cellY: 9,
		kind: "ruin"
	},
	{
		cellX: 0,
		cellY: 2,
		kind: "rock"
	},
	{
		cellX: 9,
		cellY: 10,
		kind: "pine"
	},
	{
		cellX: 15,
		cellY: 0,
		kind: "oak"
	}
];
var TOWERS = {
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
		color: "#9aa7b2"
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
		color: "#c5ccd3"
	},
	mortar: {
		kind: "mortar",
		name: "Mortar",
		blurb: "Arcing shells. Splashes.",
		cost: 230,
		range: 3.45,
		damage: 34,
		fireRate: .52,
		projectileSpeed: 3.6,
		splash: 1.05,
		color: "#8a8176"
	}
};
var TOWER_ORDER = [
	"sentry",
	"repeater",
	"mortar"
];
var ENEMIES = {
	grunt: {
		kind: "grunt",
		name: "Cinder",
		hp: 28,
		speed: 1.32,
		gold: 8,
		radius: .22
	},
	runner: {
		kind: "runner",
		name: "Skitter",
		hp: 16,
		speed: 2.18,
		gold: 10,
		radius: .18
	},
	brute: {
		kind: "brute",
		name: "Hull",
		hp: 120,
		speed: .82,
		gold: 18,
		radius: .32
	},
	colossus: {
		kind: "colossus",
		name: "Siege",
		hp: 460,
		speed: .58,
		gold: 55,
		radius: .46
	}
};
var WAVES = [
	{ spawns: [{
		kind: "grunt",
		count: 6,
		interval: .9,
		delay: 0
	}] },
	{ spawns: [{
		kind: "grunt",
		count: 10,
		interval: .7,
		delay: 0
	}] },
	{ spawns: [{
		kind: "grunt",
		count: 8,
		interval: .75,
		delay: 0
	}, {
		kind: "runner",
		count: 4,
		interval: .55,
		delay: 2.4
	}] },
	{ spawns: [{
		kind: "grunt",
		count: 10,
		interval: .55,
		delay: 0
	}, {
		kind: "runner",
		count: 8,
		interval: .42,
		delay: 1.4
	}] },
	{ spawns: [{
		kind: "brute",
		count: 6,
		interval: 1.15,
		delay: 0
	}] },
	{ spawns: [{
		kind: "grunt",
		count: 12,
		interval: .4,
		delay: 0
	}, {
		kind: "brute",
		count: 4,
		interval: 1.05,
		delay: 2
	}] },
	{ spawns: [{
		kind: "runner",
		count: 18,
		interval: .3,
		delay: 0
	}] },
	{ spawns: [{
		kind: "brute",
		count: 8,
		interval: .85,
		delay: 0
	}, {
		kind: "colossus",
		count: 1,
		interval: 1,
		delay: 4
	}] },
	{ spawns: [
		{
			kind: "grunt",
			count: 14,
			interval: .34,
			delay: 0
		},
		{
			kind: "runner",
			count: 10,
			interval: .38,
			delay: 1
		},
		{
			kind: "brute",
			count: 5,
			interval: .95,
			delay: 3
		}
	] },
	{ spawns: [{
		kind: "brute",
		count: 10,
		interval: .68,
		delay: 0
	}, {
		kind: "runner",
		count: 12,
		interval: .28,
		delay: 1.8
	}] },
	{ spawns: [
		{
			kind: "grunt",
			count: 18,
			interval: .26,
			delay: 0
		},
		{
			kind: "brute",
			count: 8,
			interval: .75,
			delay: 2
		},
		{
			kind: "runner",
			count: 12,
			interval: .32,
			delay: 3.5
		}
	] },
	{ spawns: [
		{
			kind: "runner",
			count: 16,
			interval: .26,
			delay: 0
		},
		{
			kind: "brute",
			count: 10,
			interval: .6,
			delay: 1.8
		},
		{
			kind: "colossus",
			count: 2,
			interval: 5,
			delay: 5.5
		}
	] }
];
var TARGETING_LABEL = {
	first: "First",
	last: "Last",
	closest: "Closest",
	strongest: "Strongest"
};
var TARGETING_CYCLE = [
	"first",
	"last",
	"closest",
	"strongest"
];
var GameAudio = class {
	ctx = null;
	master = null;
	sfx = null;
	music = null;
	muted = false;
	unlocked = false;
	noise = null;
	voices = 0;
	maxVoices = 18;
	get isMuted() {
		return this.muted;
	}
	unlock() {
		if (this.unlocked && this.ctx) {
			if (this.ctx.state === "suspended") this.ctx.resume();
			return;
		}
		const Ctor = window.AudioContext || window.webkitAudioContext;
		this.ctx = new Ctor({ latencyHint: "interactive" });
		this.master = this.ctx.createGain();
		this.sfx = this.ctx.createGain();
		this.music = this.ctx.createGain();
		this.sfx.gain.value = .7;
		this.music.gain.value = .18;
		this.sfx.connect(this.master);
		this.music.connect(this.master);
		this.master.connect(this.ctx.destination);
		this.noise = this.makeNoise();
		this.unlocked = true;
		if (this.ctx.state === "suspended") this.ctx.resume();
		this.applyMute();
		this.startDrone();
	}
	resume() {
		if (this.ctx?.state === "suspended") this.ctx.resume();
	}
	setMuted(muted) {
		this.muted = muted;
		this.applyMute();
	}
	place() {
		this.blip(420, .07, "triangle", .12);
		this.blip(180, .09, "sine", .08);
	}
	shoot(kind) {
		if (kind === "sentry") this.blip(880 + Math.random() * 40, .045, "square", .05);
		else if (kind === "repeater") this.blip(1240 + Math.random() * 80, .028, "square", .035);
		else {
			this.thump(90, .16, .18);
			this.noiseBurst(.08, .12);
		}
	}
	hit() {
		this.blip(240 + Math.random() * 40, .04, "sawtooth", .06);
	}
	kill() {
		this.noiseBurst(.09, .16);
		this.blip(520, .08, "triangle", .07);
		this.blip(780, .05, "sine", .05);
	}
	leak() {
		this.thump(70, .28, .22);
		this.blip(160, .22, "sawtooth", .08);
	}
	wave() {
		this.blip(220, .18, "triangle", .1);
		this.blip(330, .2, "triangle", .08);
	}
	upgrade() {
		this.blip(480, .08, "sine", .08);
		this.blip(720, .1, "sine", .07);
	}
	deny() {
		this.blip(140, .1, "square", .06);
	}
	win() {
		this.blip(392, .18, "triangle", .1);
		this.blip(494, .2, "triangle", .09);
		this.blip(587, .28, "sine", .1);
	}
	lose() {
		this.thump(55, .4, .22);
		this.blip(110, .35, "sawtooth", .07);
	}
	applyMute() {
		if (!this.master || !this.ctx) return;
		this.master.gain.setTargetAtTime(this.muted ? 0 : 1, this.ctx.currentTime, .03);
	}
	canPlay() {
		return Boolean(this.ctx && this.sfx && !this.muted && this.voices < this.maxVoices);
	}
	blip(freq, dur, type, gain) {
		if (!this.canPlay() || !this.ctx || !this.sfx) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const g = this.ctx.createGain();
		osc.type = type;
		osc.frequency.setValueAtTime(freq, t);
		osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * .55), t + dur);
		g.gain.setValueAtTime(gain, t);
		g.gain.exponentialRampToValueAtTime(.001, t + dur);
		osc.connect(g);
		g.connect(this.sfx);
		this.track(osc, dur);
		osc.start(t);
		osc.stop(t + dur + .02);
	}
	thump(freq, dur, gain) {
		if (!this.canPlay() || !this.ctx || !this.sfx) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const g = this.ctx.createGain();
		osc.type = "sine";
		osc.frequency.setValueAtTime(freq, t);
		osc.frequency.exponentialRampToValueAtTime(40, t + dur);
		g.gain.setValueAtTime(gain, t);
		g.gain.exponentialRampToValueAtTime(.001, t + dur);
		osc.connect(g);
		g.connect(this.sfx);
		this.track(osc, dur);
		osc.start(t);
		osc.stop(t + dur + .02);
	}
	noiseBurst(dur, gain) {
		if (!this.canPlay() || !this.ctx || !this.sfx || !this.noise) return;
		const t = this.ctx.currentTime;
		const src = this.ctx.createBufferSource();
		src.buffer = this.noise;
		const g = this.ctx.createGain();
		const f = this.ctx.createBiquadFilter();
		f.type = "bandpass";
		f.frequency.value = 900;
		g.gain.setValueAtTime(gain, t);
		g.gain.exponentialRampToValueAtTime(.001, t + dur);
		src.connect(f);
		f.connect(g);
		g.connect(this.sfx);
		this.track(src, dur);
		src.start(t);
		src.stop(t + dur + .02);
	}
	startDrone() {
		if (!this.ctx || !this.music) return;
		const t = this.ctx.currentTime;
		const make = (freq, type, gain) => {
			const osc = this.ctx.createOscillator();
			const g = this.ctx.createGain();
			osc.type = type;
			osc.frequency.value = freq;
			g.gain.value = gain;
			osc.connect(g);
			g.connect(this.music);
			osc.start(t);
		};
		make(55, "sine", .22);
		make(82.4, "triangle", .07);
		make(110, "sine", .05);
	}
	makeNoise() {
		const ctx = this.ctx;
		const buffer = ctx.createBuffer(1, ctx.sampleRate * .4, ctx.sampleRate);
		const data = buffer.getChannelData(0);
		for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
		return buffer;
	}
	track(node, dur) {
		this.voices += 1;
		const done = () => {
			this.voices = Math.max(0, this.voices - 1);
		};
		node.onended = done;
		window.setTimeout(done, (dur + .1) * 1e3);
	}
};
var audio = new GameAudio();
function cellKey(x, y) {
	return `${x},${y}`;
}
function buildPath() {
	const centers = PATH_CELLS.map(([c, r]) => ({
		x: c + .5,
		y: r + .5
	}));
	const start = centers[0];
	const end = centers[centers.length - 1];
	const points = [
		{
			x: -.7,
			y: start.y
		},
		...centers,
		{
			x: 16.55,
			y: end.y
		}
	];
	const segs = [];
	let acc = 0;
	for (let i = 0; i < points.length - 1; i++) {
		const a = points[i];
		const b = points[i + 1];
		const len = Math.hypot(b.x - a.x, b.y - a.y);
		segs.push({
			x0: a.x,
			y0: a.y,
			x1: b.x,
			y1: b.y,
			len,
			acc
		});
		acc += len;
	}
	return {
		segs,
		length: acc,
		cellSet: new Set(PATH_CELLS.map(([c, r]) => cellKey(c, r)))
	};
}
function pointOnPath(path, dist) {
	const d = Math.max(0, Math.min(dist, path.length));
	for (let i = 0; i < path.segs.length; i++) {
		const s = path.segs[i];
		if (d <= s.acc + s.len || i === path.segs.length - 1) {
			const t = s.len < 1e-6 ? 1 : Math.min(1, (d - s.acc) / s.len);
			return {
				x: s.x0 + (s.x1 - s.x0) * t,
				y: s.y0 + (s.y1 - s.y0) * t,
				angle: Math.atan2(s.y1 - s.y0, s.x1 - s.x0)
			};
		}
	}
	const last = path.segs[path.segs.length - 1];
	return {
		x: last.x1,
		y: last.y1,
		angle: Math.atan2(last.y1 - last.y0, last.x1 - last.x0)
	};
}
var useGameStore = create(() => ({
	phase: "title",
	gold: 200,
	lives: 20,
	wave: 0,
	totalWaves: WAVES.length,
	canCallWave: false,
	waveActive: false,
	remaining: 0,
	selectedKind: null,
	selectedTower: null,
	muted: false,
	notice: null
}));
var PARTICLE_CAP = 280;
var FLOATER_CAP = 40;
var PROJECTILE_CAP = 80;
var ENEMY_CAP = 80;
function hash(x, y) {
	let n = x * 374761393 + y * 668265263;
	n = (n ^ n >> 13) * 1274126177;
	return ((n ^ n >> 16) >>> 0) / 4294967296;
}
function angleLerp(a, b, t) {
	let d = b - a;
	while (d > Math.PI) d -= Math.PI * 2;
	while (d < -Math.PI) d += Math.PI * 2;
	return a + d * t;
}
var Engine = class {
	path = buildPath();
	blocked = new Set(DECOS.map((d) => cellKey(d.cellX, d.cellY)));
	occupied = /* @__PURE__ */ new Set();
	phase = "title";
	gold = 200;
	lives = 20;
	waveIndex = -1;
	selectedKind = null;
	selectedId = null;
	hover = null;
	muted = false;
	notice = null;
	noticeT = 0;
	towers = [];
	enemies = [];
	projectiles = [];
	particles = [];
	floaters = [];
	time = 0;
	waveTime = 0;
	spawning = false;
	spawned = [];
	trauma = 0;
	hitstop = 0;
	reducedMotion = false;
	nextId = 1;
	lastSig = "";
	constructor() {
		if (typeof window !== "undefined") this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
		if (this.phase === "playing") this.phase = "paused";
		else if (this.phase === "paused") this.phase = "playing";
		this.sync();
	}
	setMuted(muted) {
		this.muted = muted;
		audio.setMuted(muted);
		this.sync();
	}
	selectKind(kind) {
		if (this.phase !== "playing") return;
		this.selectedKind = kind;
		this.selectedId = null;
		this.sync();
	}
	setHover(cellX, cellY) {
		if (cellX < 0 || cellY < 0 || cellX >= 16 || cellY >= 11) {
			this.hover = null;
			return;
		}
		this.hover = {
			x: cellX,
			y: cellY,
			buildable: this.isBuildable(cellX, cellY)
		};
	}
	clearHover() {
		this.hover = null;
	}
	clickCell(cellX, cellY) {
		if (this.phase !== "playing") return;
		if (cellX < 0 || cellY < 0 || cellX >= 16 || cellY >= 11) return;
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
	tryPlace(cellX, cellY) {
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
		const t = {
			id: this.nextId++,
			kind,
			cellX,
			cellY,
			x: cellX + .5,
			y: cellY + .5,
			angle: -Math.PI / 2,
			cooldown: .2,
			damageRank: 0,
			rateRank: 0,
			targeting: "first",
			spent: def.cost,
			recoil: 0
		};
		this.towers.push(t);
		this.occupied.add(cellKey(cellX, cellY));
		audio.place();
		this.burst(t.x, t.y, "#c5ccd3", 8, "spark");
		this.sync();
	}
	upgradeDamage() {
		const t = this.selectedTower();
		if (!t || t.damageRank >= 3) return;
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
		if (!t || t.rateRank >= 3) return;
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
		t.targeting = TARGETING_CYCLE[(TARGETING_CYCLE.indexOf(t.targeting) + 1) % TARGETING_CYCLE.length];
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
	isBuildable(cx, cy) {
		if (cx < 0 || cy < 0 || cx >= 16 || cy >= 11) return false;
		const k = cellKey(cx, cy);
		if (this.path.cellSet.has(k)) return false;
		if (this.blocked.has(k)) return false;
		if (this.occupied.has(k)) return false;
		return true;
	}
	canCallWave() {
		if (this.phase !== "playing") return false;
		if (this.spawning) return false;
		if (this.livingCount() > 0) return false;
		return this.waveIndex + 1 < WAVES.length;
	}
	towerStats(t) {
		const def = TOWERS[t.kind];
		return {
			def,
			damage: def.damage * (1 + DAMAGE_PER_RANK * t.damageRank),
			fireRate: def.fireRate * (1 + RATE_PER_RANK * t.rateRank),
			range: def.range
		};
	}
	selectedTower() {
		if (this.selectedId == null) return void 0;
		return this.towers.find((t) => t.id === this.selectedId);
	}
	update(dt) {
		this.time += dt;
		if (this.noticeT > 0) {
			this.noticeT -= dt;
			if (this.noticeT <= 0) this.notice = null;
		}
		if (this.phase === "paused" || this.phase === "title") {
			this.updateParticles(dt * .6);
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
				this.addTrauma(.55);
				this.hitstop = this.reducedMotion ? 0 : .06;
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
				this.addTrauma(.3);
			}
		}
		this.sync();
	}
	shakeOffset() {
		if (this.reducedMotion || this.trauma <= 0) return {
			x: 0,
			y: 0
		};
		const mag = this.trauma * this.trauma * .18;
		return {
			x: mag * Math.sin(this.time * 47.2),
			y: mag * Math.cos(this.time * 41.7)
		};
	}
	reset(keepTitle) {
		this.gold = 200;
		this.lives = 20;
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
	advanceSpawns(dt) {
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
	spawnEnemy(kind) {
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
				wobble: Math.random() * 10
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
	pickTarget(tower) {
		const { range } = this.towerStats(tower);
		const range2 = range * range;
		let best = null;
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
				case "strongest": score = e.hp;
			}
			if (score > bestScore) {
				bestScore = score;
				best = e;
			}
		}
		return best;
	}
	fire(tower, target) {
		const { def, damage, fireRate } = this.towerStats(tower);
		tower.cooldown = 1 / fireRate;
		tower.recoil = 1;
		audio.shoot(tower.kind);
		let tx = target.x;
		let ty = target.y;
		if (tower.kind === "mortar") {
			const eta = Math.hypot(target.x - tower.x, target.y - tower.y) / def.projectileSpeed;
			const pred = pointOnPath(this.path, target.dist + target.speed * eta * .85);
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
				ttl: 2.4
			};
			this.projectiles.push(p);
		}
		p.id = this.nextId++;
		p.alive = true;
		p.kind = tower.kind;
		const muzzle = .32;
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
	updateProjectiles(dt) {
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
				if (dist <= step + .08) {
					this.impact(p, target ?? null);
					p.alive = false;
				} else {
					p.x += dx / dist * step;
					p.y += dy / dist * step;
				}
			} else {
				const flight = Math.max(.12, Math.hypot(p.tx - p.sx, p.ty - p.sy) / p.speed);
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
	impact(p, direct) {
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
			this.addTrauma(.22);
		} else if (direct) {
			this.hurt(direct, p.damage);
			this.burst(p.x, p.y, "#eceae4", 6, "spark");
		}
	}
	hurt(e, amount) {
		e.hp -= amount;
		e.flash = 1;
		audio.hit();
		this.float(e.x, e.y - .2, `${Math.round(amount)}`, "#eceae4");
		if (e.hp <= 0) {
			e.alive = false;
			this.gold += e.gold;
			audio.kill();
			this.float(e.x, e.y, `+${e.gold}`, "#c4a574");
			this.burst(e.x, e.y, e.kind === "colossus" ? "#c45c4a" : "#8a8176", e.kind === "colossus" ? 22 : 12, "spark");
			this.burst(e.x, e.y, "#3d342c", 6, "smoke");
			if (e.kind === "colossus") {
				this.addTrauma(.45);
				this.hitstop = this.reducedMotion ? 0 : .05;
			}
		}
	}
	livingCount() {
		let n = 0;
		for (const e of this.enemies) if (e.alive) n += 1;
		return n;
	}
	remainingInWave() {
		if (this.waveIndex < 0) return 0;
		const wave = WAVES[this.waveIndex];
		let left = 0;
		if (this.spawning) for (let i = 0; i < wave.spawns.length; i++) left += wave.spawns[i].count - this.spawned[i];
		return left + this.livingCount();
	}
	addTrauma(v) {
		if (this.reducedMotion) return;
		this.trauma = Math.min(1, this.trauma + v);
	}
	burst(x, y, color, n, kind) {
		for (let i = 0; i < n; i++) {
			const a = Math.random() * Math.PI * 2;
			const s = .4 + Math.random() * 1.8;
			this.spawnParticle({
				x,
				y,
				vx: Math.cos(a) * s,
				vy: Math.sin(a) * s,
				life: .25 + Math.random() * .35,
				maxLife: .5,
				size: kind === "smoke" ? .18 : .06 + Math.random() * .05,
				color,
				kind
			});
		}
	}
	ring(x, y, color) {
		this.spawnParticle({
			x,
			y,
			vx: 0,
			vy: 0,
			life: .28,
			maxLife: .28,
			size: .2,
			color,
			kind: "ring"
		});
	}
	spawnParticle(init) {
		let p = this.particles.find((x) => !x.alive);
		if (!p) {
			if (this.particles.length >= PARTICLE_CAP) return;
			p = {
				...init,
				alive: true
			};
			this.particles.push(p);
			return;
		}
		Object.assign(p, init);
		p.alive = true;
		p.maxLife = init.life;
	}
	float(x, y, text, color) {
		let f = this.floaters.find((x) => !x.alive);
		if (!f) {
			if (this.floaters.length >= FLOATER_CAP) return;
			f = {
				alive: true,
				x,
				y,
				text,
				life: .7,
				maxLife: .7,
				color
			};
			this.floaters.push(f);
			return;
		}
		f.alive = true;
		f.x = x;
		f.y = y;
		f.text = text;
		f.life = .7;
		f.maxLife = .7;
		f.color = color;
	}
	updateParticles(dt) {
		for (const p of this.particles) {
			if (!p.alive) continue;
			p.life -= dt;
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			p.vx *= .96;
			p.vy *= .96;
			if (p.kind === "smoke") p.size += dt * .2;
			if (p.kind === "mote") {
				if (p.y < -.3) p.y = 11.2;
				if (p.x < -.3) p.x = 16.2;
				if (p.x > 16.3) p.x = -.2;
				if (p.life <= 0) p.life = p.maxLife;
				continue;
			}
			if (p.life <= 0) p.alive = false;
		}
		for (const f of this.floaters) {
			if (!f.alive) continue;
			f.life -= dt;
			f.y -= dt * .55;
			if (f.life <= 0) f.alive = false;
		}
	}
	seedMotes() {
		for (const p of this.particles) if (p.kind === "mote") p.alive = false;
		for (let i = 0; i < 28; i++) this.spawnParticle({
			x: hash(i, 3) * 16,
			y: hash(i, 7) * 11,
			vx: (hash(i, 11) - .5) * .12,
			vy: -.08 - hash(i, 13) * .08,
			life: 8 + hash(i, 17) * 10,
			maxLife: 12,
			size: .03 + hash(i, 19) * .03,
			color: "#c5ccd3",
			kind: "mote"
		});
	}
	deselect() {
		this.selectedKind = null;
		this.selectedId = null;
		this.sync();
	}
	ping(text) {
		this.notice = text;
		this.noticeT = 1.6;
	}
	towerView(t) {
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
			nextDamageCost: t.damageRank < 3 ? UPGRADE_COSTS[t.damageRank] : null,
			nextRateCost: t.rateRank < 3 ? UPGRADE_COSTS[t.rateRank] : null,
			sellValue: Math.floor(t.spent * SELL_RATIO)
		};
	}
	sync() {
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
			this.canCallWave() ? 1 : 0
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
			notice: this.notice
		});
	}
};
function hash2(x, y) {
	return hash(x, y);
}
function fitCamera(canvas) {
	const w = canvas.clientWidth;
	const h = canvas.clientHeight;
	const scale = Math.min((w - 16) / 16, (h - 16) / 11);
	return {
		scale,
		x: (w - 16 * scale) / 2,
		y: (h - 11 * scale) / 2
	};
}
function screenToCell(canvas, sx, sy, cam) {
	const rect = canvas.getBoundingClientRect();
	const x = (sx - rect.left - cam.x) / cam.scale;
	const y = (sy - rect.top - cam.y) / cam.scale;
	return {
		x: Math.floor(x),
		y: Math.floor(y)
	};
}
function render(ctx, engine, canvas) {
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
function drawTerrain(ctx) {
	ctx.fillStyle = "#101412";
	ctx.fillRect(-2, -2, 20, 15);
	for (let y = 0; y < 11; y++) for (let x = 0; x < 16; x++) {
		const n = hash2(x, y);
		const g = 22 + n * 10;
		ctx.fillStyle = `rgb(${18 + n * 8},${g},${20 + n * 6})`;
		ctx.fillRect(x, y, 1.02, 1.02);
		if (n > .78) {
			ctx.fillStyle = "rgba(180, 190, 170, 0.06)";
			ctx.beginPath();
			ctx.arc(x + .3 + n * .4, y + .4, .07, 0, Math.PI * 2);
			ctx.fill();
		}
	}
	ctx.strokeStyle = "rgba(236, 234, 228, 0.035)";
	ctx.lineWidth = .02;
	for (let x = 0; x <= 16; x++) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, 11);
		ctx.stroke();
	}
	for (let y = 0; y <= 11; y++) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(16, y);
		ctx.stroke();
	}
}
function drawPath(ctx, engine) {
	const pts = engine.path.segs;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	ctx.strokeStyle = "#2a241f";
	ctx.lineWidth = .92;
	ctx.beginPath();
	ctx.moveTo(pts[0].x0, pts[0].y0);
	for (const s of pts) ctx.lineTo(s.x1, s.y1);
	ctx.stroke();
	ctx.strokeStyle = "#3d342c";
	ctx.lineWidth = .72;
	ctx.beginPath();
	ctx.moveTo(pts[0].x0, pts[0].y0);
	for (const s of pts) ctx.lineTo(s.x1, s.y1);
	ctx.stroke();
	ctx.strokeStyle = "#4a4036";
	ctx.lineWidth = .18;
	ctx.setLineDash([.12, .2]);
	ctx.beginPath();
	ctx.moveTo(pts[0].x0, pts[0].y0);
	for (const s of pts) ctx.lineTo(s.x1, s.y1);
	ctx.stroke();
	ctx.setLineDash([]);
	for (let d = .4; d < engine.path.length; d += .55) {
		const p = pointOnPath(engine.path, d);
		const n = hash2(Math.floor(d * 10), 2);
		ctx.fillStyle = n > .5 ? "#53483e" : "#463d34";
		ctx.beginPath();
		ctx.arc(p.x + (n - .5) * .18, p.y + (hash2(Math.floor(d * 10), 5) - .5) * .18, .07 + n * .04, 0, Math.PI * 2);
		ctx.fill();
	}
}
function drawDecos(ctx) {
	for (const d of DECOS) {
		const x = d.cellX + .5;
		const y = d.cellY + .5;
		if (d.kind === "pine") drawPine(ctx, x, y, .85 + hash2(d.cellX, d.cellY) * .2);
		else if (d.kind === "oak") drawOak(ctx, x, y);
		else if (d.kind === "rock") drawRock(ctx, x, y, hash2(d.cellX, d.cellY));
		else if (d.kind === "ruin") drawRuin(ctx, x, y);
		else if (d.kind === "pond") drawPond(ctx, d.cellX, d.cellY);
	}
}
function drawPine(ctx, x, y, s) {
	ctx.fillStyle = "#2a211c";
	ctx.fillRect(x - .05, y + .05, .1, .28 * s);
	ctx.fillStyle = "#243028";
	for (let i = 0; i < 3; i++) {
		const top = y - .42 * s + i * .16;
		const w = .18 * s + i * .1;
		ctx.beginPath();
		ctx.moveTo(x, top);
		ctx.lineTo(x + w, top + .28);
		ctx.lineTo(x - w, top + .28);
		ctx.closePath();
		ctx.fill();
	}
	ctx.fillStyle = "#2e3c32";
	ctx.beginPath();
	ctx.moveTo(x, y - .46 * s);
	ctx.lineTo(x + .14 * s, y - .18 * s);
	ctx.lineTo(x - .14 * s, y - .18 * s);
	ctx.closePath();
	ctx.fill();
}
function drawOak(ctx, x, y) {
	ctx.fillStyle = "#2a211c";
	ctx.fillRect(x - .06, y, .12, .32);
	ctx.fillStyle = "#2a382c";
	ctx.beginPath();
	ctx.arc(x, y - .08, .28, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#334536";
	ctx.beginPath();
	ctx.arc(x + .12, y - .14, .18, 0, Math.PI * 2);
	ctx.fill();
}
function drawRock(ctx, x, y, n) {
	ctx.fillStyle = "#3a3d3c";
	ctx.beginPath();
	ctx.ellipse(x, y + .08, .28, .18, n * .4, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#4a4e4c";
	ctx.beginPath();
	ctx.ellipse(x - .06, y, .2, .14, -.3, 0, Math.PI * 2);
	ctx.fill();
}
function drawRuin(ctx, x, y) {
	ctx.fillStyle = "#3e3c38";
	ctx.fillRect(x - .28, y - .1, .18, .42);
	ctx.fillRect(x + .08, y + .02, .16, .3);
	ctx.fillStyle = "#4c4944";
	ctx.fillRect(x - .3, y - .16, .58, .1);
}
function drawPond(ctx, cx, cy) {
	ctx.fillStyle = "#1a2428";
	ctx.fillRect(cx, cy, 1, 1);
	ctx.fillStyle = "#243238";
	ctx.beginPath();
	ctx.ellipse(cx + .5, cy + .5, .42, .36, .2, 0, Math.PI * 2);
	ctx.fill();
}
function drawKeep(ctx) {
	const x = 15.85;
	ctx.fillStyle = "#2c2d2c";
	ctx.fillRect(15.7, 3.35, 1.35, 2.3);
	ctx.fillStyle = "#3a3b3a";
	ctx.fillRect(x, 3.45, 1.05, 2.1);
	ctx.fillStyle = "#1a1b1b";
	ctx.fillRect(15.799999999999999, 4.22, .55, .7);
	ctx.fillStyle = "#4a4c4a";
	for (let i = 0; i < 4; i++) ctx.fillRect(x + i * .26, 3.2800000000000002, .16, .18);
	ctx.fillStyle = "#c5ccd3";
	ctx.globalAlpha = .35;
	ctx.fillRect(16.4, 3.7800000000000002, .12, .12);
	ctx.fillRect(16.4, 4.68, .12, .12);
	ctx.globalAlpha = 1;
}
function drawPortal(ctx, time) {
	const x = .15;
	const y = 5.5;
	const pulse = .5 + Math.sin(time * 2.2) * .15;
	ctx.fillStyle = "#1a1210";
	ctx.beginPath();
	ctx.ellipse(x, y, .42, .7, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = `rgba(196, 92, 74, ${.25 + pulse * .25})`;
	ctx.lineWidth = .06;
	ctx.beginPath();
	ctx.ellipse(x, y, .28, .52, 0, 0, Math.PI * 2);
	ctx.stroke();
	ctx.fillStyle = `rgba(196, 92, 74, ${.12 + pulse * .1})`;
	ctx.beginPath();
	ctx.ellipse(x, y, .16, .32, 0, 0, Math.PI * 2);
	ctx.fill();
}
function drawHover(ctx, engine) {
	const h = engine.hover;
	if (!h || engine.phase !== "playing") return;
	ctx.save();
	if (engine.selectedKind) {
		ctx.fillStyle = h.buildable ? "rgba(197, 204, 211, 0.16)" : "rgba(196, 92, 74, 0.18)";
		ctx.fillRect(h.x + .06, h.y + .06, .88, .88);
		ctx.strokeStyle = h.buildable ? "rgba(197, 204, 211, 0.7)" : "rgba(196, 92, 74, 0.7)";
		ctx.lineWidth = .04;
		ctx.strokeRect(h.x + .08, h.y + .08, .84, .84);
		const def = TOWERS[engine.selectedKind];
		drawRange(ctx, h.x + .5, h.y + .5, def.range, h.buildable);
		drawTowerBody(ctx, {
			kind: engine.selectedKind,
			x: h.x + .5,
			y: h.y + .5,
			angle: -Math.PI / 2,
			recoil: 0
		}, .55);
	} else {
		ctx.strokeStyle = "rgba(236, 234, 228, 0.18)";
		ctx.lineWidth = .03;
		ctx.strokeRect(h.x + .08, h.y + .08, .84, .84);
	}
	ctx.restore();
}
function drawRange(ctx, x, y, range, ok) {
	ctx.beginPath();
	ctx.arc(x, y, range, 0, Math.PI * 2);
	ctx.strokeStyle = ok ? "rgba(197, 204, 211, 0.45)" : "rgba(196, 92, 74, 0.4)";
	ctx.lineWidth = .035;
	ctx.setLineDash([.12, .1]);
	ctx.stroke();
	ctx.setLineDash([]);
	ctx.fillStyle = ok ? "rgba(197, 204, 211, 0.05)" : "rgba(196, 92, 74, 0.05)";
	ctx.fill();
}
function drawTowers(ctx, engine) {
	for (const t of engine.towers) {
		if (engine.selectedId === t.id) drawRange(ctx, t.x, t.y, engine.towerStats(t).range, true);
		drawTowerBody(ctx, t, 1);
	}
}
function drawTowerBody(ctx, t, alpha) {
	ctx.save();
	ctx.globalAlpha *= alpha;
	ctx.translate(t.x, t.y);
	ctx.fillStyle = "rgba(0,0,0,0.28)";
	ctx.beginPath();
	ctx.ellipse(0, .22, .32, .1, 0, 0, Math.PI * 2);
	ctx.fill();
	if (t.kind === "sentry") {
		ctx.fillStyle = "#3a3e40";
		roundRect(ctx, -.22, -.18, .44, .42, .06);
		ctx.fill();
		ctx.fillStyle = "#5b6368";
		roundRect(ctx, -.16, -.28, .32, .22, .05);
		ctx.fill();
		ctx.rotate(t.angle);
		ctx.translate(-t.recoil * .06, 0);
		ctx.fillStyle = "#c5ccd3";
		ctx.fillRect(.02, -.06, .38, .12);
		ctx.fillStyle = "#8b949c";
		ctx.beginPath();
		ctx.arc(0, 0, .12, 0, Math.PI * 2);
		ctx.fill();
	} else if (t.kind === "repeater") {
		ctx.fillStyle = "#2f3336";
		roundRect(ctx, -.26, -.16, .52, .38, .05);
		ctx.fill();
		ctx.fillStyle = "#4a5258";
		roundRect(ctx, -.2, -.22, .4, .18, .04);
		ctx.fill();
		ctx.rotate(t.angle);
		ctx.translate(-t.recoil * .05, 0);
		ctx.fillStyle = "#d5dbe0";
		ctx.fillRect(.04, -.14, .34, .08);
		ctx.fillRect(.04, .06, .34, .08);
	} else {
		ctx.fillStyle = "#3d3934";
		ctx.beginPath();
		ctx.arc(0, .04, .3, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#5c564e";
		ctx.beginPath();
		ctx.arc(0, -.02, .22, 0, Math.PI * 2);
		ctx.fill();
		ctx.rotate(t.angle);
		ctx.translate(-t.recoil * .04, 0);
		ctx.fillStyle = "#2a2824";
		ctx.fillRect(.04, -.08, .22, .16);
		ctx.fillStyle = "#8a8176";
		ctx.beginPath();
		ctx.arc(.28, 0, .08, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.restore();
}
function drawEnemies(ctx, engine) {
	const list = engine.enemies.filter((e) => e.alive).sort((a, b) => a.y - b.y);
	for (const e of list) drawEnemy(ctx, e, engine.time);
}
function drawEnemy(ctx, e, time) {
	const bob = Math.sin(time * 7 + e.wobble) * .03;
	ctx.save();
	ctx.translate(e.x, e.y + bob);
	ctx.rotate(e.angle);
	if (e.flash > 0) ctx.globalAlpha = .55 + e.flash * .45;
	ctx.fillStyle = "rgba(0,0,0,0.3)";
	ctx.beginPath();
	ctx.ellipse(0, .16, e.radius * 1.1, e.radius * .45, 0, 0, Math.PI * 2);
	ctx.fill();
	if (e.kind === "grunt") {
		ctx.fillStyle = "#6a4a42";
		oval(ctx, 0, 0, .22, .16);
		ctx.fillStyle = "#3a2824";
		oval(ctx, .1, 0, .1, .1);
		ctx.fillStyle = "#c45c4a";
		ctx.fillRect(.12, -.03, .1, .06);
	} else if (e.kind === "runner") {
		ctx.fillStyle = "#5a5854";
		oval(ctx, 0, 0, .2, .11);
		ctx.fillStyle = "#2e2d2b";
		oval(ctx, .12, 0, .08, .08);
		ctx.strokeStyle = "#8a8176";
		ctx.lineWidth = .03;
		ctx.beginPath();
		ctx.moveTo(-.16, -.08);
		ctx.lineTo(-.02, 0);
		ctx.lineTo(-.16, .08);
		ctx.stroke();
	} else if (e.kind === "brute") {
		ctx.fillStyle = "#3e4448";
		roundRect(ctx, -.28, -.2, .56, .4, .08);
		ctx.fill();
		ctx.fillStyle = "#2a2e30";
		roundRect(ctx, -.12, -.12, .32, .24, .04);
		ctx.fill();
		ctx.fillStyle = "#c45c4a";
		ctx.fillRect(.14, -.05, .12, .1);
	} else {
		ctx.fillStyle = "#2c3034";
		roundRect(ctx, -.4, -.28, .8, .56, .1);
		ctx.fill();
		ctx.fillStyle = "#1c1e20";
		roundRect(ctx, -.18, -.16, .44, .32, .06);
		ctx.fill();
		ctx.fillStyle = "#c45c4a";
		ctx.globalAlpha = .7 + Math.sin(time * 4) * .2;
		ctx.fillRect(.18, -.08, .16, .16);
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#4a4e52";
		ctx.fillRect(-.38, -.34, .12, .12);
		ctx.fillRect(-.38, .22, .12, .12);
	}
	ctx.restore();
	if (e.hp < e.maxHp) {
		const w = e.kind === "colossus" ? .7 : .42;
		ctx.fillStyle = "rgba(10,10,11,0.7)";
		ctx.fillRect(e.x - w / 2, e.y - e.radius - .18, w, .06);
		ctx.fillStyle = "#c45c4a";
		ctx.fillRect(e.x - w / 2, e.y - e.radius - .18, w * Math.max(0, e.hp / e.maxHp), .06);
	}
}
function drawProjectiles(ctx, engine) {
	for (const p of engine.projectiles) {
		if (!p.alive) continue;
		if (p.kind === "mortar") drawMortarShell(ctx, p, engine);
		else drawBolt(ctx, p);
	}
}
function drawBolt(ctx, p) {
	const ang = Math.atan2(p.ty - p.sy, p.tx - p.sx);
	ctx.save();
	ctx.translate(p.x, p.y);
	ctx.rotate(ang);
	ctx.strokeStyle = p.kind === "repeater" ? "#eceae4" : "#c5ccd3";
	ctx.lineWidth = p.kind === "repeater" ? .045 : .07;
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(-.16, 0);
	ctx.lineTo(.1, 0);
	ctx.stroke();
	ctx.fillStyle = "#ffffff";
	ctx.beginPath();
	ctx.arc(.08, 0, .045, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
}
function drawMortarShell(ctx, p, engine) {
	const flight = Math.max(.12, Math.hypot(p.tx - p.sx, p.ty - p.sy) / p.speed);
	const t = Math.min(1, p.age / flight);
	const h = 3.4 * t * (1 - t);
	ctx.fillStyle = "rgba(0,0,0,0.28)";
	ctx.beginPath();
	ctx.ellipse(p.x, p.y, .1 + h * .04, .05, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#2a2824";
	ctx.beginPath();
	ctx.arc(p.x, p.y - h, .1, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#c45c4a";
	ctx.beginPath();
	ctx.arc(p.x, p.y - h - .04, .035, 0, Math.PI * 2);
	ctx.fill();
}
function drawParticles(ctx, engine) {
	for (const p of engine.particles) {
		if (!p.alive) continue;
		const a = Math.max(0, p.life / p.maxLife);
		ctx.globalAlpha = p.kind === "mote" ? .18 * a : a;
		if (p.kind === "ring") {
			ctx.strokeStyle = p.color;
			ctx.lineWidth = .04;
			ctx.beginPath();
			ctx.arc(p.x, p.y, (1 - a) * .7 + .15, 0, Math.PI * 2);
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
function drawFloaters(ctx, engine) {
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
function drawVignette(ctx) {
	const g = ctx.createRadialGradient(8, 11 / 2, 3, 8, 11 / 2, 9);
	g.addColorStop(0, "rgba(11,12,13,0)");
	g.addColorStop(1, "rgba(11,12,13,0.42)");
	ctx.fillStyle = g;
	ctx.fillRect(-1, -1, 18, 13);
}
function roundRect(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}
function oval(ctx, x, y, rx, ry) {
	ctx.beginPath();
	ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
	ctx.fill();
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] select-none", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-surface-2 text-fg border border-border hover:bg-surface",
			ghost: "text-muted hover:text-fg hover:bg-surface-2",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-[var(--radius-sm)]",
			md: "h-11 px-4 text-sm rounded-[var(--radius-md)]",
			lg: "h-12 px-5 text-base rounded-[var(--radius-md)]",
			icon: "size-11 rounded-[var(--radius-md)]"
		}
	},
	defaultVariants: {
		variant: "secondary",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
function Dock({ engine }) {
	const phase = useGameStore((s) => s.phase);
	const gold = useGameStore((s) => s.gold);
	const selectedKind = useGameStore((s) => s.selectedKind);
	const selectedTower = useGameStore((s) => s.selectedTower);
	const canCall = useGameStore((s) => s.canCallWave);
	const waveActive = useGameStore((s) => s.waveActive);
	const remaining = useGameStore((s) => s.remaining);
	const wave = useGameStore((s) => s.wave);
	if (phase !== "playing") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "z-10 flex max-h-[46%] shrink-0 flex-col gap-3 overflow-y-auto border-t border-border bg-surface/95 p-3 backdrop-blur-sm lg:max-h-none lg:w-80 lg:border-l lg:border-t-0 lg:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				size: "lg",
				className: "w-full sm:hidden",
				disabled: !canCall,
				onClick: () => engine?.callWave(),
				children: canCall ? wave === 0 ? "Call first wave" : "Call next wave" : waveActive ? `${remaining} remaining` : "Stand by"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-medium uppercase tracking-[0.16em] text-subtle",
				children: "Towers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2",
				children: TOWER_ORDER.map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TowerCard, {
					kind,
					gold,
					selected: selectedKind === kind,
					onSelect: () => engine?.selectKind(selectedKind === kind ? null : kind)
				}, kind))
			})] }),
			selectedTower ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedPanel, {
				engine,
				gold
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hidden text-xs leading-relaxed text-muted lg:block",
				children: "Select a type, then tap a clear plot. Tap a placed tower to upgrade damage or fire rate."
			})
		]
	});
}
function TowerCard({ kind, gold, selected, onSelect }) {
	const def = TOWERS[kind];
	const afford = gold >= def.cost;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onSelect,
		className: cn("flex min-h-11 flex-col items-start gap-0.5 rounded-[var(--radius-md)] border px-2.5 py-2 text-left transition-[border-color,background-color] duration-[var(--motion-quick)]", selected ? "border-accent bg-surface-2" : "border-border bg-bg hover:border-border-strong", !afford && "opacity-50"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium text-fg",
			children: def.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs tabular-nums text-gold",
			children: def.cost
		})]
	});
}
function SelectedPanel({ engine, gold }) {
	const t = useGameStore((s) => s.selectedTower);
	if (!t) return null;
	const dmgMax = t.damageRank >= 3;
	const rateMax = t.rateRank >= 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-border bg-bg p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-fg",
					children: t.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						t.damage.toFixed(0),
						" dmg · ",
						t.fireRate.toFixed(1),
						"/s"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => engine?.cycleTargeting(),
					className: "h-9 rounded-[var(--radius-sm)] border border-border px-2 text-xs text-muted hover:text-fg",
					children: TARGETING_LABEL[t.targeting]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					size: "sm",
					className: "h-11 flex-col gap-0 py-1",
					disabled: dmgMax || t.nextDamageCost != null && gold < t.nextDamageCost,
					onClick: () => engine?.upgradeDamage(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Damage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tabular-nums text-muted",
						children: dmgMax ? "Max" : `${t.nextDamageCost} · ${t.damageRank}/3`
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					size: "sm",
					className: "h-11 flex-col gap-0 py-1",
					disabled: rateMax || t.nextRateCost != null && gold < t.nextRateCost,
					onClick: () => engine?.upgradeRate(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fire rate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tabular-nums text-muted",
						children: rateMax ? "Max" : `${t.nextRateCost} · ${t.rateRank}/3`
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "sm",
				className: "mt-2 w-full",
				onClick: () => engine?.sell(),
				children: [
					"Sell · ",
					t.sellValue,
					" gold"
				]
			})
		]
	});
}
function Hud({ engine }) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "relative z-10 flex shrink-0 items-center gap-2 border-b border-border bg-bg/90 px-3 py-2 backdrop-blur-sm sm:px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold leading-none tracking-[-0.03em] text-fg",
					children: "Waykeep"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 hidden truncate text-xs text-subtle sm:block",
					children: "Hold the last road"
				})]
			}),
			playing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 sm:gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
							className: "size-3.5",
							strokeWidth: 2
						}),
						value: lives,
						tone: "danger",
						label: "Lives"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, {
							className: "size-3.5",
							strokeWidth: 2
						}),
						value: gold,
						tone: "gold",
						label: "Gold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
							className: "size-3.5",
							strokeWidth: 2
						}),
						value: wave === 0 ? `0/${total}` : `${wave}/${total}`,
						label: "Wave"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [
					playing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						className: "hidden h-11 min-w-11 sm:inline-flex",
						disabled: !canCall,
						onClick: () => engine?.callWave(),
						children: canCall ? wave === 0 ? "Call wave" : "Next wave" : waveActive ? `${remaining} left` : "Stand by"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": muted ? "Unmute" : "Mute",
						onClick: () => engine?.setMuted(!muted),
						children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
					}),
					playing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": phase === "paused" ? "Resume" : "Pause",
						onClick: () => engine?.togglePause(),
						children: phase === "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
					})
				]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-1.5 text-xs text-fg",
				children: notice
			})
		]
	});
}
function Stat({ icon, value, label, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex h-11 min-w-11 items-center gap-1.5 rounded-[var(--radius-md)] border border-border bg-surface px-2.5 tabular-nums", tone === "danger" && "text-danger", tone === "gold" && "text-gold"),
		title: label,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-current opacity-80",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-fg",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: label
			})
		]
	});
}
function Overlays({ engine }) {
	const phase = useGameStore((s) => s.phase);
	const wave = useGameStore((s) => s.wave);
	const total = useGameStore((s) => s.totalWaves);
	const gold = useGameStore((s) => s.gold);
	if (phase === "playing") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-center justify-center bg-bg/70 px-4 backdrop-blur-[2px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-[var(--radius-xl)] border border-border bg-surface p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8",
			children: [
				phase === "title" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleCard, { onPlay: () => engine?.start() }),
				phase === "paused" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseCard, {
					onResume: () => engine?.togglePause(),
					onMenu: () => engine?.toTitle()
				}),
				phase === "lost" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndCard, {
					title: "The gate fell",
					body: `The road was lost on wave ${Math.max(1, wave)} of ${total}.`,
					onAgain: () => engine?.restart(),
					onMenu: () => engine?.toTitle()
				}),
				phase === "won" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndCard, {
					title: "The road holds",
					body: `All ${total} waves turned. ${gold} gold left in the coffers.`,
					onAgain: () => engine?.restart(),
					onMenu: () => engine?.toTitle()
				})
			]
		})
	});
}
function TitleCard({ onPlay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.22em] text-muted",
						children: "Tower defense"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl",
						children: "Waykeep"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-base text-muted",
						children: "The road is the last thing still ours. Place towers, spend the spoils, hold the gate."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" }), "Choose a tower, then a clear plot beside the path."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" }), "Call a wave when you are ready. Kills pay gold."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" }), "Upgrade damage or fire rate. A leak costs a life."]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				size: "lg",
				className: "w-full",
				onClick: onPlay,
				children: "Enter the keep"
			})
		]
	});
}
function PauseCard({ onResume, onMenu }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl font-semibold tracking-[-0.03em]",
			children: "Paused"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "The field is still. The road is not."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				size: "lg",
				onClick: onResume,
				children: "Resume"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "md",
				onClick: onMenu,
				children: "Abandon"
			})]
		})]
	});
}
function EndCard({ title, body, onAgain, onMenu }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl font-semibold tracking-[-0.03em]",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: body
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				size: "lg",
				onClick: onAgain,
				children: "Rally again"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "md",
				onClick: onMenu,
				children: "Return"
			})]
		})]
	});
}
var STEP = 1 / 60;
function GameApp() {
	const canvasRef = (0, import_react.useRef)(null);
	const engineRef = (0, import_react.useRef)(null);
	const [engine] = (0, import_react.useState)(() => new Engine());
	engineRef.current = engine;
	(0, import_react.useEffect)(() => {
		const e = engineRef.current ?? new Engine();
		engineRef.current = e;
		window.__waykeep = e;
		const onVis = () => {
			if (document.visibilityState === "visible") audio.resume();
		};
		document.addEventListener("visibilitychange", onVis);
		const onKey = (ev) => {
			const g = engineRef.current;
			if (!g) return;
			if (ev.code === "Space") {
				ev.preventDefault();
				g.callWave();
			} else if (ev.code === "Escape") {
				if (g.selectedKind || g.selectedId != null) g.deselect();
				else g.togglePause();
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
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const e = engine;
		if (!canvas || !e) return;
		let raf = 0;
		let last = performance.now();
		let acc = 0;
		const loop = (now) => {
			raf = requestAnimationFrame(loop);
			let dt = (now - last) / 1e3;
			last = now;
			if (dt > .1) dt = .1;
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
	const pointerCell = (ev) => {
		const canvas = canvasRef.current;
		if (!canvas || !engine) return null;
		const cam = fitCamera(canvas);
		return screenToCell(canvas, ev.clientX, ev.clientY, cam);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-dvh flex-col overflow-hidden bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, { engine }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col lg:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-[240px] min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					className: "absolute inset-0 size-full touch-none",
					onPointerMove: (ev) => {
						const cell = pointerCell(ev);
						if (cell && engine) engine.setHover(cell.x, cell.y);
					},
					onPointerLeave: () => engine?.clearHover(),
					onPointerDown: (ev) => {
						const cell = pointerCell(ev);
						if (cell && engine) engine.clickCell(cell.x, cell.y);
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlays, { engine })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, { engine })]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {});
}
//#endregion
export { Home as component };
