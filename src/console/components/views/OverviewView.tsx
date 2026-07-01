import styled from '@emotion/styled';
import { Clock, Server, Rocket, Activity, ExternalLink } from 'lucide-react';
import { fonts, palette } from '../../palette';
import { contactInfo, experiences, projects, skills } from '../../../data/resume';
import { useUptime } from '../../useUptime';
import Panel from '../Panel';
import Grid from '../Grid';
import StatCard from '../StatCard';
import ServiceTopology from '../ServiceTopology';
import BarGauge from '../BarGauge';
import DeploymentsTable from '../DeploymentsTable';
import LogsPanel from '../LogsPanel';
import StatusPill from '../StatusPill';
import type { ViewId } from '../../types';

const ViewAll = styled.button`
  background: none;
  border: none;
  color: ${palette.blue};
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

const ProfileMeta = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 180px;
`;

const Name = styled.h1`
  margin: 0;
  font-family: ${fonts.sans};
  font-size: 1.3rem;
  font-weight: 700;
  color: ${palette.text};
`;

const Role = styled.span`
  font-family: ${fonts.mono};
  font-size: 0.76rem;
  color: ${palette.textMuted};
`;

const Tagline = styled.p`
  flex: 1 1 360px;
  margin: 0;
  font-family: ${fonts.sans};
  font-size: 0.92rem;
  line-height: 1.65;
  color: ${palette.textMuted};
`;

interface Props {
  onSelectService: (id: string) => void;
  onSelectProject: (id: string) => void;
  onNavigate: (view: ViewId) => void;
}

const OverviewView = ({ onSelectService, onSelectProject, onNavigate }: Props) => {
  const { formatted } = useUptime();
  const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 6);
  const recentDeploys = projects.slice(0, 5);
  const current = experiences.find((e) => e.current);

  return (
    <Grid>
      <Panel title="sumanth-jillepally" subtitle="service description" span={12}>
        <ProfileRow>
          <ProfileMeta>
            <Name>{contactInfo.name}</Name>
            {current && (
              <Role>
                {current.position} @ {current.company}
              </Role>
            )}
          </ProfileMeta>
          <Tagline>{contactInfo.tagline}</Tagline>
        </ProfileRow>
      </Panel>

      <StatCard label="uptime" value={formatted.split(' ').slice(0, 2).join(' ')} icon={<Clock size={12} />} color={palette.green} />
      <StatCard label="services" value={experiences.length} icon={<Server size={12} />} onClick={() => onNavigate('services')} />
      <StatCard label="deployments" value={projects.length} icon={<Rocket size={12} />} onClick={() => onNavigate('deployments')} />
      <StatCard label="metrics tracked" value={skills.length} icon={<Activity size={12} />} onClick={() => onNavigate('metrics')} />

      <Panel title="service-mesh" subtitle="career.topology" span={8}>
        <ServiceTopology onSelect={onSelectService} />
      </Panel>

      <Panel title="top metrics" subtitle="highest signal" span={4}>
        <ViewAll type="button" onClick={() => onNavigate('metrics')}>
          view all <ExternalLink size={11} />
        </ViewAll>
        {topSkills.map((s) => (
          <BarGauge key={s.id} name={s.name} level={s.level} />
        ))}
      </Panel>

      <Panel title="recent deployments" subtitle={`showing 5 of ${projects.length}`} span={8} bodyPadding={false}>
        <DeploymentsTable onSelectProject={onSelectProject} data={recentDeploys} />
      </Panel>

      <Panel title="alerts" subtitle="1 firing" span={4}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <StatusPill tone="orange" label="FIRING" />
            <span style={{ fontFamily: fonts.sans, fontSize: '0.82rem', color: palette.text, fontWeight: 600 }}>
              Extra Mile Award
            </span>
          </div>
          <ViewAll type="button" onClick={() => onNavigate('alerts')}>
            view all <ExternalLink size={11} />
          </ViewAll>
        </div>
      </Panel>

      <Panel title="logs" subtitle="tail -f service.log" span={12} bodyPadding={false}>
        <div style={{ padding: 14 }}>
          <LogsPanel />
        </div>
      </Panel>
    </Grid>
  );
};

export default OverviewView;
