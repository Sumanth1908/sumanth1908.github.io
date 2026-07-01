import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { fonts, palette } from '../palette';

const Wrap = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  opacity: 0.5;
  mix-blend-mode: screen;
`;

const Scanlines = styled.div`
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0px, transparent 1px, transparent 3px);
  pointer-events: none;
`;

const Label = styled.span`
  position: relative;
  z-index: 1;
  font-family: ${fonts.type};
  font-size: 0.8rem;
  letter-spacing: 0.25em;
  color: ${palette.cream};
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  animation: flicker 0.6s steps(2) infinite;

  @keyframes flicker {
    50% {
      opacity: 0.55;
    }
  }
`;

const StaticOverlay = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const w = 64;
    const h = 48;
    canvas.width = w;
    canvas.height = h;
    const imageData = ctx.createImageData(w, h);
    let raf = 0;
    let last = 0;

    const draw = (t: number) => {
      if (t - last > 65) {
        last = t;
        const buf = imageData.data;
        for (let i = 0; i < buf.length; i += 4) {
          const v = Math.random() * 255;
          buf[i] = v;
          buf[i + 1] = v;
          buf[i + 2] = v;
          buf[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  if (!active) return null;

  return (
    <Wrap>
      <Canvas ref={canvasRef} />
      <Scanlines />
      <Label>SEARCHING&hellip;</Label>
    </Wrap>
  );
};

export default StaticOverlay;
