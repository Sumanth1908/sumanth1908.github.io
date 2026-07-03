import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { ChevronRight } from 'lucide-react';
import { fonts, palette } from '../palette';

const Wrap = styled.div<{ $clickable: boolean }>`
  background: ${palette.panel};
  border: 1px solid ${palette.border};
  border-radius: 6px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: span 3;
  text-align: left;
  width: 100%;
  font: inherit;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: border-color 0.15s ease;
  position: relative;

  &:hover {
    border-color: ${({ $clickable }) => ($clickable ? palette.blue : palette.border)};
  }

  @media (max-width: 860px) {
    grid-column: span 6;
  }
`;

const Arrow = styled(ChevronRight)`
  position: absolute;
  top: 14px;
  right: 12px;
  color: ${palette.textDim};
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${palette.textDim};
`;

const Value = styled.div<{ $color?: string }>`
  font-family: ${fonts.mono};
  font-size: 1.7rem;
  font-weight: 700;
  color: ${({ $color }) => $color ?? palette.text};
`;

interface Props {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  color?: string;
  onClick?: () => void;
}

const StatCard = ({ label, value, icon, color, onClick }: Props) => (
  <Wrap
    $clickable={!!onClick}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={
      onClick
        ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick();
            }
          }
        : undefined
    }
  >
    <Label>
      {icon}
      {label}
    </Label>
    <Value $color={color}>{value}</Value>
    {onClick && <Arrow size={14} />}
  </Wrap>
);

export default StatCard;
