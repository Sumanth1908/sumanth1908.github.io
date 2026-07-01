import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { MoreHorizontal } from 'lucide-react';
import { fonts, palette } from '../palette';

const Wrap = styled.section<{ $span?: number }>`
  background: ${palette.panel};
  border: 1px solid ${palette.border};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  grid-column: span ${({ $span }) => $span ?? 4};

  @media (max-width: 860px) {
    grid-column: span 12 !important;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid ${palette.border};
  background: ${palette.panelHeader};
  border-radius: 6px 6px 0 0;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
`;

const Title = styled.h3`
  margin: 0;
  font-family: ${fonts.sans};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${palette.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Subtitle = styled.span`
  font-family: ${fonts.mono};
  font-size: 0.66rem;
  color: ${palette.textDim};
`;

const Body = styled.div`
  padding: 14px;
  flex: 1;
  min-width: 0;
`;

interface Props {
  title: string;
  subtitle?: string;
  span?: number;
  children: ReactNode;
  bodyPadding?: boolean;
}

const Panel = ({ title, subtitle, span, children, bodyPadding = true }: Props) => (
  <Wrap $span={span}>
    <Header>
      <TitleBlock>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleBlock>
      <MoreHorizontal size={15} color={palette.textDim} />
    </Header>
    <Body style={bodyPadding ? undefined : { padding: 0 }}>{children}</Body>
  </Wrap>
);

export default Panel;
