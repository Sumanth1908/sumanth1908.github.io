import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { fonts, palette } from '../palette';
import { skills } from '../../data/resume';
import { Card, Header, Title, Subtitle } from './QSLCard';

const GroupLabel = styled.div`
  font-family: ${fonts.type};
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: ${palette.inkFaint};
  text-transform: uppercase;
  margin: 14px 0 8px;
`;

const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 150px;
  overflow-x: auto;
  padding: 4px 2px 0;
`;

const BarCol = styled.button<{ $dim: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 36px;
  flex: 1 0 36px;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  opacity: ${({ $dim }) => ($dim ? 0.45 : 1)};
  transition: opacity 0.25s ease;
`;

const Track = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: flex-end;
  background: rgba(42, 33, 24, 0.07);
  border-radius: 2px;
  overflow: hidden;
`;

const Fill = styled(motion.div)<{ $active: boolean }>`
  width: 100%;
  border-radius: 2px 2px 0 0;
  background: ${({ $active }) =>
    $active
      ? `linear-gradient(180deg, ${palette.amber}, ${palette.needle})`
      : `linear-gradient(180deg, ${palette.brass}, ${palette.brassDark})`};
`;

const PctLabel = styled.span`
  font-family: ${fonts.type};
  font-size: 0.6rem;
  color: ${palette.inkFaint};
`;

const NameLabel = styled.span`
  font-family: ${fonts.type};
  font-size: 0.6rem;
  color: ${palette.ink};
  text-align: center;
  line-height: 1.15;
  min-height: 2.3em;
`;

interface Props {
  highlightSkillId: string | null;
  onSelect: (skillId: string) => void;
}

const Equalizer = ({ highlightSkillId, onSelect }: Props) => {
  const technical = skills.filter((s) => s.category === 'technical');
  const additional = skills.filter((s) => s.category === 'additional');

  const renderGroup = (label: string, group: typeof skills) => (
    <>
      <GroupLabel>{label}</GroupLabel>
      <Bars>
        {group.map((s) => {
          const active = highlightSkillId === s.id;
          const dim = highlightSkillId !== null && !active;
          return (
            <BarCol key={s.id} type="button" $dim={dim} onClick={() => onSelect(s.id)} aria-label={`${s.name}: ${s.level}%`}>
              <Track>
                <Fill
                  $active={active}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(s.level, 4)}%` }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </Track>
              <PctLabel>{s.level > 0 ? `${s.level}%` : 'n/a'}</PctLabel>
              <NameLabel>{s.name}</NameLabel>
            </BarCol>
          );
        })}
      </Bars>
    </>
  );

  return (
    <Card initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      <Header>
        <span>SIGNAL STRENGTH REPORT · SW3</span>
        <span>KSMJ</span>
      </Header>
      <Title>Reading the Meters</Title>
      <Subtitle>Sweep the dial, or tap a bar, to isolate a single signal.</Subtitle>
      {renderGroup('Core Technical', technical)}
      {renderGroup('Supporting', additional)}
    </Card>
  );
};

export default Equalizer;
