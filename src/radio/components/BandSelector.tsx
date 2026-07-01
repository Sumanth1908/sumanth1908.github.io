import styled from '@emotion/styled';
import { fonts, palette } from '../palette';
import { bands } from '../stations';
import type { BandId } from '../types';

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const Btn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 8px 4px;
  border-radius: 4px;
  border: 1px solid ${({ $active }) => ($active ? palette.amber : palette.brassDark)};
  background: ${({ $active }) =>
    $active ? `linear-gradient(180deg, ${palette.amber}, ${palette.brassDark})` : 'rgba(0,0,0,0.25)'};
  color: ${({ $active }) => ($active ? palette.walnutDark : palette.creamDark)};
  font-family: ${fonts.display};
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  box-shadow: ${({ $active }) => ($active ? `0 0 10px ${palette.amberSoft}` : 'inset 0 1px 3px rgba(0,0,0,0.5)')};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${palette.amber};
  }
`;

interface Props {
  active: BandId;
  onSelect: (id: BandId) => void;
}

const BandSelector = ({ active, onSelect }: Props) => (
  <Row role="tablist" aria-label="Frequency band">
    {bands.map((b) => (
      <Btn
        key={b.id}
        type="button"
        role="tab"
        aria-selected={active === b.id}
        $active={active === b.id}
        onClick={() => onSelect(b.id)}
      >
        {b.dialLabel}
      </Btn>
    ))}
  </Row>
);

export default BandSelector;
