import styled from '@emotion/styled';
import RotaryKnob from './RotaryKnob';
import { fonts, palette } from '../palette';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const Label = styled.span`
  font-family: ${fonts.display};
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  color: ${palette.creamDark};
`;

interface Props {
  volume: number;
  onChange: (v: number) => void;
}

const VolumeKnob = ({ volume, onChange }: Props) => (
  <Wrap>
    <RotaryKnob value={volume} onChange={onChange} size={44} ariaLabel="Ambient volume" />
    <Label>VOLUME</Label>
  </Wrap>
);

export default VolumeKnob;
