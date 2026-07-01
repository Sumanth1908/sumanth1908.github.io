import Panel from '../Panel';
import Grid from '../Grid';
import DeploymentsTable from '../DeploymentsTable';
import { projects } from '../../../data/resume';

interface Props {
  onSelectProject: (id: string) => void;
}

const DeploymentsView = ({ onSelectProject }: Props) => (
  <Grid>
    <Panel title="deployments" subtitle={`${projects.length} total · all succeeded`} span={12} bodyPadding={false}>
      <DeploymentsTable onSelectProject={onSelectProject} />
    </Panel>
  </Grid>
);

export default DeploymentsView;
