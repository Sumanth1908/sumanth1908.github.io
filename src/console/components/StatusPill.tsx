import styled from '@emotion/styled';
import { fonts, palette } from '../palette';

type Tone = 'green' | 'blue' | 'orange' | 'red' | 'purple' | 'gray';

const toneMap: Record<Tone, { fg: string; bg: string }> = {
  green: { fg: palette.green, bg: palette.greenDim },
  blue: { fg: palette.blue, bg: palette.blueDim },
  orange: { fg: palette.orange, bg: palette.orangeDim },
  red: { fg: palette.red, bg: palette.redDim },
  purple: { fg: palette.purple, bg: palette.purpleDim },
  gray: { fg: palette.textDim, bg: 'rgba(255,255,255,0.05)' },
};

const Pill = styled.span<{ $tone: Tone }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 9px;
  border-radius: 3px;
  font-family: ${fonts.mono};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${({ $tone }) => toneMap[$tone].fg};
  background: ${({ $tone }) => toneMap[$tone].bg};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

interface Props {
  tone: Tone;
  label: string;
}

const StatusPill = ({ tone, label }: Props) => <Pill $tone={tone}>{label}</Pill>;

export default StatusPill;
