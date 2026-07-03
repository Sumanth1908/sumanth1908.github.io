import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { fonts, palette } from '../palette';
import QSLCard from './QSLCard';
import Equalizer from './Equalizer';
import StaticOverlay from './StaticOverlay';
import type { Band, BandId, Station } from '../types';

const Panel = styled.div`
  width: 100%;
  max-width: 560px;
  perspective: 1200px;
`;

const NoSignal = styled.div`
  position: relative;
  min-height: 300px;
  border-radius: 6px;
  background: linear-gradient(180deg, #0c0906, #060402);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(201, 162, 75, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IdleText = styled.p`
  font-family: ${fonts.serif};
  font-style: italic;
  color: ${palette.inkFaint};
  opacity: 0.6;
  font-size: 1rem;
`;

interface Props {
  poweredOn: boolean;
  bandId: BandId;
  band: Band;
  lockedStation: Station | null;
  locked: boolean;
  onSelectSkill: (skillId: string) => void;
}

const TransmissionPanel = ({ poweredOn, bandId, band, lockedStation, locked, onSelectSkill }: Props) => {
  const highlightSkillId =
    locked && lockedStation?.content.kind === 'skill' ? lockedStation.content.data.id : null;

  let key = 'off';
  let node: React.ReactNode;

  if (!poweredOn) {
    key = 'off';
    node = (
      <NoSignal>
        <IdleText>The radio is off.</IdleText>
      </NoSignal>
    );
  } else if (bandId === 'skills') {
    key = `skills-${highlightSkillId ?? 'overview'}`;
    node = <Equalizer highlightSkillId={highlightSkillId} onSelect={onSelectSkill} />;
  } else if (locked && lockedStation) {
    key = lockedStation.id;
    node = <QSLCard station={lockedStation} band={band} />;
  } else {
    key = 'searching';
    node = (
      <NoSignal>
        <StaticOverlay active />
      </NoSignal>
    );
  }

  return (
    <Panel>
      <AnimatePresence mode="wait">
        <motion.div key={key}>{node}</motion.div>
      </AnimatePresence>
    </Panel>
  );
};

export default TransmissionPanel;
