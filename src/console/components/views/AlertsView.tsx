import styled from '@emotion/styled';
import { Trophy } from 'lucide-react';
import { fonts, palette } from '../../palette';
import { awards } from '../../../data/resume';
import Panel from '../Panel';
import Grid from '../Grid';
import StatusPill from '../StatusPill';
import { LabelRow, Label } from '../DrawerContent';

const AlertCard = styled.div`
  display: flex;
  gap: 14px;
  padding: 16px;
  border: 1px solid ${palette.border};
  border-left: 3px solid ${palette.orange};
  border-radius: 6px;
  background: ${palette.bgElevated};
`;

const IconWrap = styled.div`
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  background: ${palette.orangeDim};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.orange};
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

const AlertName = styled.span`
  font-family: ${fonts.sans};
  font-weight: 700;
  font-size: 0.95rem;
  color: ${palette.text};
`;

const Since = styled.span`
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  color: ${palette.textDim};
  margin-bottom: 10px;
  display: block;
`;

const Desc = styled.p`
  font-family: ${fonts.sans};
  font-size: 0.86rem;
  line-height: 1.6;
  color: ${palette.textMuted};
  margin: 0 0 12px;
`;

const AlertsView = () => (
  <Grid>
    <Panel title="alerts" subtitle={`${awards.length} firing · 0 acknowledged needed`} span={12}>
      {awards.length === 0 ? (
        <Desc>No alerts firing.</Desc>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {awards.map((a) => (
            <AlertCard key={a.id}>
              <IconWrap>
                <Trophy size={17} />
              </IconWrap>
              <Body>
                <Top>
                  <AlertName>{a.title}</AlertName>
                  <StatusPill tone="orange" label="FIRING" />
                  <StatusPill tone="blue" label="INFO" />
                </Top>
                <Since>firing since {a.date} · issuer: {a.issuer}</Since>
                <Desc>{a.description}</Desc>
                <LabelRow>
                  <Label>type=recognition</Label>
                  <Label>issuer={a.issuer.toLowerCase()}</Label>
                </LabelRow>
              </Body>
            </AlertCard>
          ))}
        </div>
      )}
    </Panel>
  </Grid>
);

export default AlertsView;
