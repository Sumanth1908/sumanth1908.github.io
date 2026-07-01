import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { fonts, palette } from '../palette';

const thresholdColor = (level: number) => {
  if (level <= 0) return palette.textDim;
  if (level < 50) return palette.red;
  if (level < 75) return palette.orange;
  return palette.green;
};

const Row = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 4px;
  background: ${({ $active }) => ($active ? 'rgba(255,255,255,0.04)' : 'transparent')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
`;

const Name = styled.span`
  font-family: ${fonts.mono};
  font-size: 0.72rem;
  color: ${palette.text};
  width: 150px;
  flex: 0 0 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 560px) {
    width: 96px;
    flex-basis: 96px;
  }
`;

const Track = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  overflow: hidden;
`;

const Fill = styled(motion.div)<{ $color: string }>`
  height: 100%;
  background: ${({ $color }) => $color};
  border-radius: 3px;
`;

const Value = styled.span<{ $color: string }>`
  font-family: ${fonts.mono};
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ $color }) => $color};
  width: 42px;
  flex: 0 0 42px;
  text-align: right;
`;

interface Props {
  name: string;
  level: number;
  active?: boolean;
  onClick?: () => void;
}

const BarGauge = ({ name, level, active = false, onClick }: Props) => {
  const color = thresholdColor(level);
  return (
    <Row type="button" $active={active} onClick={onClick}>
      <Name>{name}</Name>
      <Track>
        <Fill
          $color={color}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(level, level > 0 ? 3 : 0)}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </Track>
      <Value $color={color}>{level > 0 ? `${level}%` : 'n/a'}</Value>
    </Row>
  );
};

export default BarGauge;
