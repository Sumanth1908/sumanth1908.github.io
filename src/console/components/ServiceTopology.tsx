import { Fragment } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { fonts, palette } from '../palette';
import { experiences } from '../../data/resume';

const chronological = [...experiences].reverse();

const Row = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding: 10px 4px 14px;
  gap: 0;
`;

const Node = styled.button<{ $active: boolean }>`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 16px;
  border-radius: 6px;
  background: ${palette.bgElevated};
  border: 1px solid ${({ $active }) => ($active ? palette.green : palette.border)};
  cursor: pointer;
  text-align: left;
  min-width: 152px;

  &:hover {
    border-color: ${palette.blue};
  }
`;

const NodeTop = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Dot = styled.span<{ $active: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? palette.green : palette.textDim)};
  box-shadow: ${({ $active }) => ($active ? `0 0 6px ${palette.green}` : 'none')};
`;

const NodeName = styled.span`
  font-family: ${fonts.sans};
  font-size: 0.82rem;
  font-weight: 600;
  color: ${palette.text};
`;

const NodeMeta = styled.span`
  font-family: ${fonts.mono};
  font-size: 0.66rem;
  color: ${palette.textDim};
`;

const Edge = styled.div`
  flex: 0 0 56px;
  width: 56px;
  height: 2px;
  background: ${palette.border};
  position: relative;
  align-self: center;

  @media (max-width: 560px) {
    flex-basis: 32px;
    width: 32px;
  }
`;

const Pulse = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${palette.blue};
  box-shadow: 0 0 6px ${palette.blue};
  transform: translateY(-50%);
`;

interface Props {
  onSelect: (id: string) => void;
  activeId?: string | null;
}

const ServiceTopology = ({ onSelect, activeId }: Props) => (
  <Row>
    {chronological.map((exp, i) => (
      <Fragment key={exp.id}>
        <Node
          type="button"
          $active={exp.current}
          onClick={() => onSelect(exp.id)}
          style={{ outline: activeId === exp.id ? `1px solid ${palette.blue}` : undefined }}
        >
          <NodeTop>
            <Dot $active={exp.current} />
            <NodeName>{exp.company}</NodeName>
          </NodeTop>
          <NodeMeta>{exp.current ? 'active' : 'archived'} · {exp.startDate.split(' ')[1]}</NodeMeta>
        </Node>
        {i < chronological.length - 1 && (
          <Edge>
            <Pulse
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
            />
          </Edge>
        )}
      </Fragment>
    ))}
  </Row>
);

export default ServiceTopology;
