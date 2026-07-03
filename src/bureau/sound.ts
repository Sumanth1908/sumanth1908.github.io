// Procedural office foley — no audio assets, everything synthesized with WebAudio.

let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(m: boolean) {
  muted = m;
}

export function isMuted() {
  return muted;
}

function audio(): AudioContext | null {
  try {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function noiseBuffer(ac: AudioContext, seconds: number): AudioBuffer {
  const buffer = ac.createBuffer(1, Math.max(1, Math.floor(ac.sampleRate * seconds)), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

interface SwishOpts {
  duration: number;
  filterType: BiquadFilterType;
  freqFrom: number;
  freqTo: number;
  gain: number;
  delay?: number;
}

function swish(opts: SwishOpts) {
  if (muted) return;
  const ac = audio();
  if (!ac) return;
  const t0 = ac.currentTime + (opts.delay ?? 0);
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac, opts.duration);
  const filter = ac.createBiquadFilter();
  filter.type = opts.filterType;
  filter.frequency.setValueAtTime(opts.freqFrom, t0);
  filter.frequency.exponentialRampToValueAtTime(Math.max(40, opts.freqTo), t0 + opts.duration);
  filter.Q.value = 0.8;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(opts.gain, t0 + opts.duration * 0.2);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + opts.duration);
  src.connect(filter).connect(gain).connect(ac.destination);
  src.start(t0);
  src.stop(t0 + opts.duration);
}

function thunk(freqFrom: number, freqTo: number, duration: number, gain: number, delay = 0) {
  if (muted) return;
  const ac = audio();
  if (!ac) return;
  const t0 = ac.currentTime + delay;
  const osc = ac.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freqFrom, t0);
  osc.frequency.exponentialRampToValueAtTime(Math.max(30, freqTo), t0 + duration);
  const g = ac.createGain();
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration);
}

/** Metal drawer rolling open on its runners. */
export function playDrawer() {
  swish({ duration: 0.3, filterType: 'lowpass', freqFrom: 700, freqTo: 160, gain: 0.12 });
  thunk(90, 45, 0.14, 0.1, 0.22);
}

/** Manila folder pulled from the hangers. */
export function playFolder() {
  swish({ duration: 0.16, filterType: 'bandpass', freqFrom: 1200, freqTo: 2400, gain: 0.08 });
  swish({ duration: 0.14, filterType: 'bandpass', freqFrom: 2000, freqTo: 900, gain: 0.06, delay: 0.09 });
}

/** A page turning. */
export function playPage() {
  swish({ duration: 0.22, filterType: 'highpass', freqFrom: 900, freqTo: 2600, gain: 0.07 });
}

/** Rubber stamp hitting paper. */
export function playStamp() {
  thunk(140, 50, 0.12, 0.22);
  swish({ duration: 0.05, filterType: 'highpass', freqFrom: 2000, freqTo: 3000, gain: 0.05 });
}

/** Lamp pull-chain click. */
export function playClick() {
  swish({ duration: 0.04, filterType: 'bandpass', freqFrom: 3000, freqTo: 2200, gain: 0.09 });
}
