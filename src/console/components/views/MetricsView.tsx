import { useState } from 'react';
import styled from '@emotion/styled';
import { fonts, palette } from '../../palette';
import { skills } from '../../../data/resume';
import Panel from '../Panel';
import Grid from '../Grid';
import BarGauge from '../BarGauge';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Note = styled.p`
  font-family: ${fonts.mono};
  font-size: 0.72rem;
  color: ${palette.textDim};
  margin: 0 0 12px;
`;

const MetricsView = () => {
  const [active, setActive] = useState<string | null>(null);
  const technical = skills.filter((s) => s.category === 'technical');
  const additional = skills.filter((s) => s.category === 'additional');

  return (
    <Grid>
      <Panel title="metrics · core_technical" subtitle="gauge · percent" span={6}>
        <Note>self-reported proficiency, scraped from ten years of commits</Note>
        <List>
          {technical.map((s) => (
            <BarGauge
              key={s.id}
              name={s.name}
              level={s.level}
              active={active === s.id}
              onClick={() => setActive(active === s.id ? null : s.id)}
            />
          ))}
        </List>
      </Panel>

      <Panel title="metrics · supporting" subtitle="gauge · percent" span={6}>
        <Note>protocols, frameworks, and the rest of the stack</Note>
        <List>
          {additional.map((s) => (
            <BarGauge
              key={s.id}
              name={s.name}
              level={s.level}
              active={active === s.id}
              onClick={() => setActive(active === s.id ? null : s.id)}
            />
          ))}
        </List>
      </Panel>
    </Grid>
  );
};

export default MetricsView;
