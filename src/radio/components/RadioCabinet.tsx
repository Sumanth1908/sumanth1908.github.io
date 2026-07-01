import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { fonts, palette } from '../palette';
import FrequencyStrip from './FrequencyStrip';
import BandSelector from './BandSelector';
import TuningKnob from './TuningKnob';
import VolumeKnob from './VolumeKnob';
import PowerButton from './PowerButton';
import SeekButton from './SeekButton';
import type { Band, BandId, Station } from '../types';

const Cabinet = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  border-radius: 22px;
  padding: 20px;
  background:
    repeating-linear-gradient(100deg, rgba(0, 0, 0, 0.08) 0px, transparent 2px, transparent 6px),
    linear-gradient(155deg, ${palette.walnutLight} 0%, ${palette.walnutMid} 45%, ${palette.walnutGrain} 100%);
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.55),
    0 2px 0 rgba(255, 255, 255, 0.06) inset,
    0 -6px 18px rgba(0, 0, 0, 0.4) inset;
  border: 1px solid #170f09;
`;

const Plaque = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 6px 14px;
  font-family: ${fonts.display};
  color: ${palette.brassLight};
  letter-spacing: 0.14em;
  font-size: 0.85rem;
  opacity: 0.85;

  span.sub {
    font-family: ${fonts.type};
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    color: ${palette.creamDark};
    opacity: 0.7;
  }
`;

const Body = styled.div`
  display: flex;
  gap: 18px;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

const grilleDots = `radial-gradient(${palette.grilleDot} 22%, transparent 23%)`;

const Grille = styled.div<{ $pulse: boolean }>`
  flex: 0 0 34%;
  border-radius: 12px;
  background: ${palette.grilleBg};
  background-image: ${grilleDots};
  background-size: 9px 9px;
  box-shadow: inset 0 0 24px rgba(0, 0, 0, 0.85), inset 0 0 0 3px #0d0906;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  min-height: 180px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: radial-gradient(circle at 50% 40%, ${palette.amberSoft} 0%, transparent 65%);
    opacity: ${({ $pulse }) => ($pulse ? 0.5 : 0)};
    animation: ${({ $pulse }) => ($pulse ? 'breathe 2.6s ease-in-out infinite' : 'none')};
  }

  @keyframes breathe {
    0%,
    100% {
      opacity: 0.25;
    }
    50% {
      opacity: 0.55;
    }
  }
`;

const GrilleLabel = styled.span`
  position: relative;
  z-index: 1;
  font-family: ${fonts.type};
  font-size: 0.55rem;
  letter-spacing: 0.12em;
  color: ${palette.brassDark};
`;

const Controls = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

const Readout = styled.div`
  font-family: ${fonts.type};
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  color: ${palette.brassLight};
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
  min-height: 1em;

  .status {
    color: ${palette.creamDark};
    opacity: 0.75;
  }
`;

const KnobRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 2px;
`;

const TuneCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Scrim = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 20;
  border-radius: 22px;
  background: rgba(8, 5, 3, 0.72);
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 14px;
  text-align: center;
  padding: 20px;
`;

const ScrimText = styled.p`
  font-family: ${fonts.serif};
  font-style: italic;
  color: ${palette.creamDark};
  max-width: 320px;
  font-size: 1rem;
  line-height: 1.5;
`;

interface Props {
  poweredOn: boolean;
  onPowerToggle: () => void;
  band: Band;
  bandId: BandId;
  onBandSelect: (id: BandId) => void;
  stations: Station[];
  freq: number;
  onScrub: (freq: number) => void;
  onSeekPrev: () => void;
  onSeekNext: () => void;
  lockedStationId: string | null;
  locked: boolean;
  currentLabel: string;
  volume: number;
  onVolumeChange: (v: number) => void;
}

const RadioCabinet = ({
  poweredOn,
  onPowerToggle,
  band,
  bandId,
  onBandSelect,
  stations,
  freq,
  onScrub,
  onSeekPrev,
  onSeekNext,
  lockedStationId,
  locked,
  currentLabel,
  volume,
  onVolumeChange,
}: Props) => (
  <Cabinet>
    <Plaque>
      <span>STUDIO&nbsp;SUMANTH</span>
      <span className="sub">TRANSISTOR&nbsp;MODEL&nbsp;10YR</span>
    </Plaque>

    <Body>
      <Grille $pulse={poweredOn && locked}>
        <GrilleLabel>SJ&nbsp;RADIO&nbsp;CO.</GrilleLabel>
      </Grille>

      <Controls>
        <Readout>
          <span>{band.name.toUpperCase()} · {band.dialLabel}</span>
          <span className="status">
            {locked
              ? currentLabel
              : poweredOn
                ? bandId === 'skills'
                  ? 'reading levels…'
                  : 'searching…'
                : 'standby'}
          </span>
        </Readout>

        <FrequencyStrip
          band={band}
          stations={stations}
          freq={freq}
          lockedStationId={lockedStationId}
          onScrub={onScrub}
        />

        <BandSelector active={bandId} onSelect={onBandSelect} />

        <KnobRow>
          <TuneCluster>
            <SeekButton direction="prev" onClick={onSeekPrev} label="Previous station" />
            <TuningKnob band={band} freq={freq} onChange={onScrub} />
            <SeekButton direction="next" onClick={onSeekNext} label="Next station" />
          </TuneCluster>
          <TuneCluster>
            <VolumeKnob volume={volume} onChange={onVolumeChange} />
            {poweredOn && <PowerButton on={poweredOn} onToggle={onPowerToggle} />}
          </TuneCluster>
        </KnobRow>
      </Controls>
    </Body>

    <AnimatePresence>
      {!poweredOn && (
        <Scrim initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ScrimText>The dial is dark. Press power to tune in ten years of work.</ScrimText>
          <PowerButton on={false} onToggle={onPowerToggle} />
        </Scrim>
      )}
    </AnimatePresence>
  </Cabinet>
);

export default RadioCabinet;
