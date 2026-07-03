import styled from '@emotion/styled';
import { fonts, palette } from '../palette';
import { projects } from '../../data/resume';
import type { ProjectEntry } from '../../data/resume';
import StatusPill from './StatusPill';

const ScrollWrap = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;
`;

const Th = styled.th`
  text-align: left;
  font-family: ${fonts.mono};
  font-size: 0.66rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${palette.textDim};
  padding: 8px 10px;
  border-bottom: 1px solid ${palette.border};
  white-space: nowrap;
`;

const Tr = styled.tr`
  cursor: pointer;

  &:hover td {
    background: rgba(255, 255, 255, 0.03);
  }
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${palette.border};
  font-family: ${fonts.sans};
  font-size: 0.82rem;
  color: ${palette.text};
  vertical-align: top;
`;

const IdCell = styled.span`
  font-family: ${fonts.mono};
  font-size: 0.72rem;
  color: ${palette.textDim};
`;

const StackCell = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  max-width: 260px;
`;

const Tag = styled.span`
  font-family: ${fonts.mono};
  font-size: 0.66rem;
  color: ${palette.purple};
  background: ${palette.purpleDim};
  padding: 2px 6px;
  border-radius: 3px;
  white-space: nowrap;
`;

interface Props {
  onSelectProject: (id: string) => void;
  data?: ProjectEntry[];
}

const DeploymentsTable = ({ onSelectProject, data = projects }: Props) => (
  <ScrollWrap>
    <Table>
      <thead>
        <tr>
          <Th>Deploy ID</Th>
          <Th>Name</Th>
          <Th>Service</Th>
          <Th>Status</Th>
          <Th>Stack</Th>
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <Tr key={p.id} onClick={() => onSelectProject(p.id)}>
            <Td>
              <IdCell>#{p.id}</IdCell>
            </Td>
            <Td>{p.title}</Td>
            <Td>{p.company}</Td>
            <Td>
              <StatusPill tone="green" label="SUCCESS" />
            </Td>
            <Td>
              <StackCell>
                {p.technologies.slice(0, 4).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
                {p.technologies.length > 4 && <Tag>+{p.technologies.length - 4}</Tag>}
              </StackCell>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  </ScrollWrap>
);

export default DeploymentsTable;
