import Drawer from './Drawer';
import StatusPill from './StatusPill';
import { Meta, Description, SectionLabel, Changelog } from './DrawerContent';
import { experiences } from '../../data/resume';

interface Props {
  id: string | null;
  onClose: () => void;
}

const ServiceDrawer = ({ id, onClose }: Props) => {
  const exp = experiences.find((e) => e.id === id) ?? null;

  return (
    <Drawer
      open={exp !== null}
      onClose={onClose}
      eyebrow={`SERVICE · ${exp?.company.toUpperCase().replace(/\s+/g, '-') ?? ''}`}
      title={exp?.company ?? ''}
      headerRight={exp && <StatusPill tone={exp.current ? 'green' : 'gray'} label={exp.current ? 'ACTIVE' : 'ARCHIVED'} />}
    >
      {exp && (
        <>
          <Meta>
            <span>
              role: <strong>{exp.position}</strong>
            </span>
            <span>
              region: <strong>{exp.location}</strong>
            </span>
            <span>
              deployed: <strong>{exp.startDate} → {exp.current ? 'present' : exp.endDate}</strong>
            </span>
          </Meta>
          <Description>{exp.description}</Description>
          <SectionLabel>Changelog</SectionLabel>
          <Changelog>
            {exp.responsibilities.map((r) => (
              <li key={r.slice(0, 24)}>{r}</li>
            ))}
          </Changelog>
        </>
      )}
    </Drawer>
  );
};

export default ServiceDrawer;
