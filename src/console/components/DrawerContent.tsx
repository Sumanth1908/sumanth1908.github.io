import styled from '@emotion/styled';
import { fonts, palette } from '../palette';

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  font-family: ${fonts.mono};
  font-size: 0.74rem;
  color: ${palette.textMuted};
  margin-bottom: 18px;

  span strong {
    color: ${palette.text};
    font-weight: 600;
  }
`;

export const Description = styled.p`
  font-family: ${fonts.sans};
  font-size: 0.95rem;
  line-height: 1.65;
  color: ${palette.text};
  margin: 0 0 18px;
`;

export const SectionLabel = styled.div`
  font-family: ${fonts.mono};
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${palette.textDim};
  margin: 0 0 8px;
`;

export const Changelog = styled.ul`
  list-style: none;
  margin: 0 0 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    gap: 10px;
    font-family: ${fonts.sans};
    font-size: 0.88rem;
    line-height: 1.55;
    color: ${palette.text};
  }

  li::before {
    content: '+';
    color: ${palette.green};
    font-family: ${fonts.mono};
    font-weight: 700;
    flex: 0 0 auto;
  }
`;

export const LabelRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

export const Label = styled.span`
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  color: ${palette.blue};
  background: ${palette.blueDim};
  border: 1px solid rgba(87, 148, 242, 0.3);
  padding: 3px 8px;
  border-radius: 3px;
`;
