import styled from '@emotion/styled';
import RotaryKnob from './RotaryKnob';
import { fonts, palette } from '../palette';
import type { Band } from '../types';

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
  band: Band;
  freq: number;
  onChange: (freq: number) => void;
}

const TuningKnob = ({ band, freq, onChange }: Props) => {
  const value = (freq - band.freqMin) / (band.freqMax - band.freqMin);

  const handleChange = (v: number) => {
    onChange(band.freqMin + v * (band.freqMax - band.freqMin));
  };

  return (
    <Wrap>
      <RotaryKnob value={value} onChange={handleChange} size={72} ariaLabel="Tuning dial" />
      <Label>TUNING</Label>
    </Wrap>
  );
};

export default TuningKnob;
