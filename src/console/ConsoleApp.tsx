import { useState } from 'react';
import styled from '@emotion/styled';
import { palette } from './palette';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import OverviewView from './components/views/OverviewView';
import ServicesView from './components/views/ServicesView';
import DeploymentsView from './components/views/DeploymentsView';
import MetricsView from './components/views/MetricsView';
import AlertsView from './components/views/AlertsView';
import ConfigView from './components/views/ConfigView';
import ServiceDrawer from './components/ServiceDrawer';
import DeploymentDrawer from './components/DeploymentDrawer';
import type { ViewId } from './types';

const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  background: ${palette.bg};
  color: ${palette.text};

  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

const Main = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export type DrawerState = { kind: 'service'; id: string } | { kind: 'project'; id: string } | null;

const ConsoleApp = () => {
  const [view, setView] = useState<ViewId>('overview');
  const [drawer, setDrawer] = useState<DrawerState>(null);

  const openService = (id: string) => setDrawer({ kind: 'service', id });
  const openProject = (id: string) => setDrawer({ kind: 'project', id });
  const closeDrawer = () => setDrawer(null);

  return (
    <Shell>
      <Sidebar active={view} onSelect={setView} />
      <Main>
        <TopBar view={view} />
        <Content>
          {view === 'overview' && (
            <OverviewView
              onSelectService={openService}
              onSelectProject={openProject}
              onNavigate={setView}
            />
          )}
          {view === 'services' && <ServicesView onSelectService={openService} />}
          {view === 'deployments' && <DeploymentsView onSelectProject={openProject} />}
          {view === 'metrics' && <MetricsView />}
          {view === 'alerts' && <AlertsView />}
          {view === 'config' && <ConfigView />}
        </Content>
      </Main>

      <ServiceDrawer
        id={drawer?.kind === 'service' ? drawer.id : null}
        onClose={closeDrawer}
      />
      <DeploymentDrawer
        id={drawer?.kind === 'project' ? drawer.id : null}
        onClose={closeDrawer}
      />
    </Shell>
  );
};

export default ConsoleApp;
