import styled from '@emotion/styled';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { palette } from '../palette';

const Btn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid ${palette.brassDark};
  background: linear-gradient(180deg, #2f2013, #1a1109);
  color: ${palette.brassLight};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.15), 0 2px 3px rgba(0, 0, 0, 0.5);

  &:hover {
    color: ${palette.amber};
    border-color: ${palette.amber};
  }

  &:active {
    transform: translateY(1px);
  }
`;

interface Props {
  direction: 'prev' | 'next';
  onClick: () => void;
  label: string;
}

const SeekButton = ({ direction, onClick, label }: Props) => (
  <Btn type="button" onClick={onClick} aria-label={label}>
    {direction === 'prev' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
  </Btn>
);

export default SeekButton;
