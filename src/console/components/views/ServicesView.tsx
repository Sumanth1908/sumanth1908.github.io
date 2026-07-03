import styled from '@emotion/styled';
import { fonts, palette } from '../../palette';
import { experiences } from '../../../data/resume';
import Panel from '../Panel';
import Grid from '../Grid';
import ServiceTopology from '../ServiceTopology';
import StatusPill from '../StatusPill';

const chronological = [...experiences].reverse();

const Card = styled.button`
  width: 100%;
  text-align: left;
  background: ${palette.bgElevated};
  border: 1px solid ${palette.border};
  border-radius: 6px;
  padding: 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:hover {
    border-color: ${palette.blue};
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.span`
  font-family: ${fonts.sans};
  font-weight: 600;
  font-size: 0.92rem;
  color: ${palette.text};
`;

const CardMeta = styled.span`
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  color: ${palette.textMuted};
`;

const CardDesc = styled.p`
  font-family: ${fonts.sans};
  font-size: 0.8rem;
  color: ${palette.textMuted};
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

interface Props {
  onSelectService: (id: string) => void;
}

const ServicesView = ({ onSelectService }: Props) => (
  <Grid>
    <Panel title="service-mesh" subtitle="career.topology · 4 services" span={12}>
      <ServiceTopology onSelect={onSelectService} />
    </Panel>

    <Panel title="services" subtitle="click a service to inspect" span={12} bodyPadding={false}>
      <Grid style={{ padding: 14 }}>
        {chronological.map((exp) => (
          <div key={exp.id} style={{ gridColumn: 'span 6' }}>
            <Card type="button" onClick={() => onSelectService(exp.id)}>
              <CardTop>
                <CardTitle>{exp.company}</CardTitle>
                <StatusPill tone={exp.current ? 'green' : 'gray'} label={exp.current ? 'ACTIVE' : 'ARCHIVED'} />
              </CardTop>
              <CardMeta>
                {exp.position} · {exp.startDate} — {exp.current ? 'present' : exp.endDate}
              </CardMeta>
              <CardDesc>{exp.description}</CardDesc>
            </Card>
          </div>
        ))}
      </Grid>
    </Panel>
  </Grid>
);

export default ServicesView;
