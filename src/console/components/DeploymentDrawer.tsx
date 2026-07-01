import Drawer from './Drawer';
import StatusPill from './StatusPill';
import { Meta, Description, SectionLabel, Changelog, LabelRow, Label } from './DrawerContent';
import { projects } from '../../data/resume';

interface Props {
  id: string | null;
  onClose: () => void;
}

const DeploymentDrawer = ({ id, onClose }: Props) => {
  const proj = projects.find((p) => p.id === id) ?? null;

  return (
    <Drawer
      open={proj !== null}
      onClose={onClose}
      eyebrow={`DEPLOYMENT · ${proj?.id.toUpperCase() ?? ''}`}
      title={proj?.title ?? ''}
      headerRight={<StatusPill tone="green" label="SUCCESS" />}
    >
      {proj && (
        <>
          <Meta>
            <span>
              service: <strong>{proj.company}</strong>
            </span>
          </Meta>
          <Description>
            {proj.subtitle}. {proj.description}
          </Description>
          <SectionLabel>Changelog</SectionLabel>
          <Changelog>
            {proj.responsibilities.map((r) => (
              <li key={r.slice(0, 24)}>{r}</li>
            ))}
          </Changelog>
          <SectionLabel>Stack</SectionLabel>
          <LabelRow>
            {proj.technologies.map((t) => (
              <Label key={t}>{t}</Label>
            ))}
          </LabelRow>
        </>
      )}
    </Drawer>
  );
};

export default DeploymentDrawer;
