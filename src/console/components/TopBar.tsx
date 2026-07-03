import styled from '@emotion/styled';
import { fonts, palette } from '../palette';
import { navItems } from '../types';
import type { ViewId } from '../types';
import StatusPill from './StatusPill';
import { useUptime } from '../useUptime';

const Wrap = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 20px;
  border-bottom: 1px solid ${palette.border};
  background: ${palette.bgElevated};
  flex-wrap: wrap;
`;

const Breadcrumb = styled.div`
  font-family: ${fonts.mono};
  font-size: 0.82rem;
  color: ${palette.textMuted};

  strong {
    color: ${palette.text};
    font-weight: 600;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  font-family: ${fonts.mono};
  font-size: 0.76rem;
  color: ${palette.textMuted};
`;

const UptimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.3;

  span.label {
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${palette.textDim};
  }

  span.value {
    color: ${palette.green};
    font-weight: 600;
  }
`;

interface Props {
  view: ViewId;
}

const TopBar = ({ view }: Props) => {
  const { formatted } = useUptime();
  const label = navItems.find((n) => n.id === view)?.label ?? 'Overview';

  return (
    <Wrap>
      <Breadcrumb>
        <strong>sumanth-prod</strong> / {label}
      </Breadcrumb>
      <Right>
        <StatusPill tone="green" label="HEALTHY" />
        <UptimeBlock>
          <span className="label">Uptime</span>
          <span className="value">{formatted}</span>
        </UptimeBlock>
        <span>on-call: sumanth.jillepally</span>
      </Right>
    </Wrap>
  );
};

export default TopBar;
