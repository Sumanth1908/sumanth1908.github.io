import { useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { palette } from '../palette';

const SWEEP_DEG = 270;

const Body = styled.button<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: grab;
  touch-action: none;
  position: relative;
  background: radial-gradient(circle at 32% 28%, #f3d9a0, ${palette.brass} 45%, ${palette.brassDark} 90%);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.55),
    inset 0 2px 2px rgba(255, 255, 255, 0.5),
    inset 0 -4px 6px rgba(0, 0, 0, 0.35);

  &:active {
    cursor: grabbing;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 14%;
    border-radius: 50%;
    background: repeating-conic-gradient(
      from 0deg,
      rgba(0, 0, 0, 0.12) 0deg 2deg,
      transparent 2deg 12deg
    );
    opacity: 0.6;
  }
`;

const Indicator = styled.div<{ $angle: number }>`
  position: absolute;
  top: 8%;
  left: 50%;
  width: 3px;
  height: 32%;
  border-radius: 2px;
  background: ${palette.needle};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  transform-origin: 50% 190%;
  transform: translateX(-50%) rotate(${({ $angle }) => $angle}deg);
`;

interface Props {
  value: number; // 0..1
  onChange: (v: number) => void;
  size?: number;
  ariaLabel: string;
}

const RotaryKnob = ({ value, onChange, size = 64, ariaLabel }: Props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ startAngle: number; startValue: number } | null>(null);

  const angleFromCenter = useCallback((clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    ref.current?.setPointerCapture(e.pointerId);
    drag.current = { startAngle: angleFromCenter(e.clientX, e.clientY), startValue: value };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!drag.current) return;
    const current = angleFromCenter(e.clientX, e.clientY);
    let delta = current - drag.current.startAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const next = Math.min(1, Math.max(0, drag.current.startValue + delta / SWEEP_DEG));
    onChange(next);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    drag.current = null;
    ref.current?.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') onChange(Math.min(1, value + 0.03));
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') onChange(Math.max(0, value - 0.03));
  };

  const angle = -SWEEP_DEG / 2 + value * SWEEP_DEG;

  return (
    <Body
      ref={ref}
      type="button"
      $size={size}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={Math.round(value * 100) / 100}
    >
      <Indicator $angle={angle} />
    </Body>
  );
};

export default RotaryKnob;
