export class GameAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private sfx: GainNode | null = null;
  private music: GainNode | null = null;
  private muted = false;
  private unlocked = false;
  private noise: AudioBuffer | null = null;
  private voices = 0;
  private readonly maxVoices = 18;

  get isMuted() {
    return this.muted;
  }

  unlock() {
    if (this.unlocked && this.ctx) {
      if (this.ctx.state === "suspended") void this.ctx.resume();
      return;
    }
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new Ctor({ latencyHint: "interactive" });
    this.master = this.ctx.createGain();
    this.sfx = this.ctx.createGain();
    this.music = this.ctx.createGain();
    this.sfx.gain.value = 0.7;
    this.music.gain.value = 0.18;
    this.sfx.connect(this.master);
    this.music.connect(this.master);
    this.master.connect(this.ctx.destination);
    this.noise = this.makeNoise();
    this.unlocked = true;
    if (this.ctx.state === "suspended") void this.ctx.resume();
    this.applyMute();
    this.startDrone();
  }

  resume() {
    if (this.ctx?.state === "suspended") void this.ctx.resume();
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    this.applyMute();
  }

  place() {
    this.blip(420, 0.07, "triangle", 0.12);
    this.blip(180, 0.09, "sine", 0.08);
  }

  shoot(kind: "sentry" | "repeater" | "mortar") {
    if (kind === "sentry") this.blip(880 + Math.random() * 40, 0.045, "square", 0.05);
    else if (kind === "repeater") this.blip(1240 + Math.random() * 80, 0.028, "square", 0.035);
    else {
      this.thump(90, 0.16, 0.18);
      this.noiseBurst(0.08, 0.12);
    }
  }

  hit() {
    this.blip(240 + Math.random() * 40, 0.04, "sawtooth", 0.06);
  }

  kill() {
    this.noiseBurst(0.09, 0.16);
    this.blip(520, 0.08, "triangle", 0.07);
    this.blip(780, 0.05, "sine", 0.05);
  }

  leak() {
    this.thump(70, 0.28, 0.22);
    this.blip(160, 0.22, "sawtooth", 0.08);
  }

  wave() {
    this.blip(220, 0.18, "triangle", 0.1);
    this.blip(330, 0.2, "triangle", 0.08);
  }

  upgrade() {
    this.blip(480, 0.08, "sine", 0.08);
    this.blip(720, 0.1, "sine", 0.07);
  }

  deny() {
    this.blip(140, 0.1, "square", 0.06);
  }

  win() {
    this.blip(392, 0.18, "triangle", 0.1);
    this.blip(494, 0.2, "triangle", 0.09);
    this.blip(587, 0.28, "sine", 0.1);
  }

  lose() {
    this.thump(55, 0.4, 0.22);
    this.blip(110, 0.35, "sawtooth", 0.07);
  }

  private applyMute() {
    if (!this.master || !this.ctx) return;
    this.master.gain.setTargetAtTime(this.muted ? 0 : 1, this.ctx.currentTime, 0.03);
  }

  private canPlay(): boolean {
    return Boolean(this.ctx && this.sfx && !this.muted && this.voices < this.maxVoices);
  }

  private blip(freq: number, dur: number, type: OscillatorType, gain: number) {
    if (!this.canPlay() || !this.ctx || !this.sfx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.55), t + dur);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(g);
    g.connect(this.sfx);
    this.track(osc, dur);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  private thump(freq: number, dur: number, gain: number) {
    if (!this.canPlay() || !this.ctx || !this.sfx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + dur);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(g);
    g.connect(this.sfx);
    this.track(osc, dur);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  private noiseBurst(dur: number, gain: number) {
    if (!this.canPlay() || !this.ctx || !this.sfx || !this.noise) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const g = this.ctx.createGain();
    const f = this.ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 900;
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.sfx);
    this.track(src, dur);
    src.start(t);
    src.stop(t + dur + 0.02);
  }

  private startDrone() {
    if (!this.ctx || !this.music) return;
    const t = this.ctx.currentTime;
    const make = (freq: number, type: OscillatorType, gain: number) => {
      const osc = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.value = gain;
      osc.connect(g);
      g.connect(this.music!);
      osc.start(t);
    };
    make(55, "sine", 0.22);
    make(82.4, "triangle", 0.07);
    make(110, "sine", 0.05);
  }

  private makeNoise(): AudioBuffer {
    const ctx = this.ctx!;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  private track(node: { onended: ((this: AudioScheduledSourceNode, ev: Event) => void) | null }, dur: number) {
    this.voices += 1;
    const done = () => {
      this.voices = Math.max(0, this.voices - 1);
    };
    node.onended = done;
    window.setTimeout(done, (dur + 0.1) * 1000);
  }
}

export const audio = new GameAudio();
