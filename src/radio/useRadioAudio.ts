import { useEffect, useRef } from 'react';

/**
 * Generates a soft, looping static/hum bed entirely with WebAudio — no audio
 * files to fetch. Only ever starts inside the power-button click handler,
 * so it never runs afoul of autoplay restrictions.
 */
export function useRadioAudio(poweredOn: boolean, locked: boolean, volume: number) {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  useEffect(() => {
    if (!poweredOn) {
      ctxRef.current?.suspend();
      return;
    }

    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = new AudioContext();
      ctxRef.current = ctx;

      const bufferSize = 2 * ctx.sampleRate;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      filter.Q.value = 0.6;
      filterRef.current = filter;

      const gain = ctx.createGain();
      gain.gain.value = 0;
      gainRef.current = gain;

      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start();
    }
    ctx.resume();

    return () => {
      // keep context alive across renders; only torn down on unmount
    };
  }, [poweredOn]);

  useEffect(() => {
    const gain = gainRef.current;
    const ctx = ctxRef.current;
    if (!gain || !ctx) return;
    const target = poweredOn ? volume * (locked ? 0.02 : 0.1) : 0;
    gain.gain.setTargetAtTime(target, ctx.currentTime, 0.25);
  }, [poweredOn, locked, volume]);

  useEffect(() => {
    const filter = filterRef.current;
    if (!filter) return;
    filter.frequency.setTargetAtTime(locked ? 3200 : 1400, filter.context.currentTime, 0.3);
  }, [locked]);

  useEffect(() => {
    return () => {
      ctxRef.current?.close();
    };
  }, []);
}
