import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { fonts, palette } from '../palette';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const Btn = styled(motion.button)<{ $on: boolean }>`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 2px solid ${palette.brassDark};
  background: radial-gradient(circle at 35% 30%, ${palette.brassLight}, ${palette.brass} 55%, ${palette.brassDark} 100%);
  box-shadow: ${({ $on }) =>
    $on
      ? `0 0 16px 2px ${palette.amberSoft}, inset 0 2px 3px rgba(255,255,255,0.5), inset 0 -3px 4px rgba(0,0,0,0.4)`
      : 'inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -3px 4px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.5)'};
  cursor: pointer;
  position: relative;
  padding: 0;

  &::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 50%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    transform: translateX(-50%);
    background: ${({ $on }) => (($on) ? palette.amber : '#5a3d1f')};
    box-shadow: ${({ $on }) => ($on ? `0 0 8px 2px ${palette.amber}` : 'none')};
    transition: background 0.4s ease, box-shadow 0.4s ease;
  }
`;

const Label = styled.span`
  font-family: ${fonts.display};
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  color: ${palette.creamDark};
`;

interface Props {
  on: boolean;
  onToggle: () => void;
}

const PowerButton = ({ on, onToggle }: Props) => (
  <Wrap>
    <Btn
      $on={on}
      onClick={onToggle}
      whileTap={{ scale: 0.9 }}
      aria-pressed={on}
      aria-label={on ? 'Power off the radio' : 'Power on the radio'}
    />
    <Label>{on ? 'ON AIR' : 'POWER'}</Label>
  </Wrap>
);

export default PowerButton;
