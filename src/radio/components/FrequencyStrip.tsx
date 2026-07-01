import { useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { fonts, palette } from '../palette';
import type { Band, Station } from '../types';

const Face = styled.div`
  position: relative;
  background: linear-gradient(180deg, ${palette.paper} 0%, ${palette.paperShadow} 100%);
  border-radius: 6px;
  box-shadow:
    inset 0 2px 6px rgba(0, 0, 0, 0.45),
    inset 0 -1px 0 rgba(255, 255, 255, 0.4);
  padding: 14px 16px 22px;
  cursor: pointer;
  touch-action: none;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, rgba(255, 255, 255, 0.35) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.08) 100%);
    pointer-events: none;
  }
`;

const TrackRow = styled.div`
  position: relative;
  height: 46px;
`;

const Ticks = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
`;

const Tick = styled.div<{ $left: number; $major: boolean }>`
  position: absolute;
  bottom: 0;
  left: ${({ $left }) => $left}%;
  width: 1px;
  height: ${({ $major }) => ($major ? '55%' : '28%')};
  background: ${palette.ink};
  opacity: ${({ $major }) => ($major ? 0.55 : 0.25)};
`;

const TickLabel = styled.span<{ $left: number }>`
  position: absolute;
  bottom: 100%;
  left: ${({ $left }) => $left}%;
  transform: translateX(-50%);
  font-family: ${fonts.type};
  font-size: 0.6rem;
  color: ${palette.inkFaint};
  white-space: nowrap;
`;

const StationMark = styled.button<{ $left: number; $active: boolean }>`
  position: absolute;
  bottom: 0;
  left: ${({ $left }) => $left}%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 4px;
  z-index: 2;

  &:hover .callsign,
  &:focus-visible .callsign {
    opacity: 1;
  }

  .stem {
    width: 2px;
    height: 60%;
    background: ${({ $active }) => ($active ? palette.needle : palette.brassDark)};
    box-shadow: ${({ $active }) => ($active ? `0 0 6px ${palette.needle}` : 'none')};
    transition: background 0.2s ease;
  }

  .callsign {
    font-family: ${fonts.type};
    font-size: 0.58rem;
    letter-spacing: 0.03em;
    color: ${({ $active }) => ($active ? palette.needle : palette.inkFaint)};
    font-weight: ${({ $active }) => ($active ? 700 : 400)};
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.15s ease;
    white-space: nowrap;
    transform: translateY(-100%) translateY(-2px);
  }
`;

const Needle = styled(motion.div)`
  position: absolute;
  top: -2px;
  bottom: 0;
  width: 2px;
  background: ${palette.needle};
  box-shadow: 0 0 6px 1px rgba(193, 68, 45, 0.7);
  z-index: 3;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${palette.needle};
    box-shadow: 0 0 5px rgba(193, 68, 45, 0.8);
  }
`;

interface Props {
  band: Band;
  stations: Station[];
  freq: number;
  lockedStationId: string | null;
  onScrub: (freq: number) => void;
}

const formatFreq = (v: number, decimals: number) => v.toFixed(decimals);

const FrequencyStrip = ({ band, stations, freq, lockedStationId, onScrub }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const toFreq = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return freq;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return band.freqMin + pct * (band.freqMax - band.freqMin);
  };

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    onScrub(toFreq(e.clientX));
  };

  const percent = ((freq - band.freqMin) / (band.freqMax - band.freqMin)) * 100;

  const majorTicks = Array.from({ length: 6 }, (_, i) => {
    const v = band.freqMin + (i / 5) * (band.freqMax - band.freqMin);
    return { left: (i / 5) * 100, label: formatFreq(v, band.decimals) };
  });
  const minorTicks = Array.from({ length: 21 }, (_, i) => ({ left: (i / 20) * 100 }));

  return (
    <Face
      role="slider"
      aria-label={`${band.name} tuning dial`}
      aria-valuemin={band.freqMin}
      aria-valuemax={band.freqMax}
      aria-valuenow={freq}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        handlePointer(e);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) handlePointer(e);
      }}
    >
      <TrackRow ref={trackRef}>
        <Ticks>
          {minorTicks.map((t, i) => (
            <Tick key={`m-${i}`} $left={t.left} $major={false} />
          ))}
          {majorTicks.map((t, i) => (
            <Tick key={`M-${i}`} $left={t.left} $major />
          ))}
          {majorTicks.map((t, i) => (
            <TickLabel key={`L-${i}`} $left={t.left}>
              {t.label}
            </TickLabel>
          ))}
          {stations.map((s) => (
            <StationMark
              key={s.id}
              type="button"
              $left={((s.freq - band.freqMin) / (band.freqMax - band.freqMin)) * 100}
              $active={s.id === lockedStationId}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onScrub(s.freq);
              }}
              aria-label={`Tune to ${s.label}`}
            >
              <span className="callsign">{s.callSign}</span>
              <span className="stem" />
            </StationMark>
          ))}
        </Ticks>
        <Needle
          animate={{ left: `${percent}%` }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        />
      </TrackRow>
    </Face>
  );
};

export default FrequencyStrip;
