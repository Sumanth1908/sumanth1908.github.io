import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { fonts, palette } from '../palette';
import { logLines } from '../logLines';

const Wrap = styled.div`
  max-height: 320px;
  overflow-y: auto;
  background: ${palette.bgElevated};
  border-radius: 4px;
  border: 1px solid ${palette.border};
  padding: 10px 0;
`;

const Line = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  row-gap: 2px;
  column-gap: 10px;
  padding: 3px 14px;
  font-family: ${fonts.mono};
  font-size: 0.76rem;
  line-height: 1.6;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;

const Date = styled.span`
  color: ${palette.textDim};
  flex: 0 0 auto;
`;

const Level = styled.span`
  color: ${palette.blue};
  flex: 0 0 auto;
  font-weight: 600;
`;

const Tag = styled.span`
  color: ${palette.purple};
  flex: 0 0 auto;
`;

const Message = styled.span`
  color: ${palette.textMuted};
  flex: 1 1 220px;
  min-width: 220px;
  white-space: normal;
  word-break: break-word;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 7px;
  height: 13px;
  background: ${palette.green};
  margin-left: 14px;
  animation: blink 1s step-end infinite;

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

const LogsPanel = () => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, []);

  return (
    <Wrap>
      {logLines.map((l) => (
        <Line key={l.id}>
          <Date>{l.date}</Date>
          <Level>{l.level}</Level>
          <Tag>[{l.tag}]</Tag>
          <Message>{l.message}</Message>
        </Line>
      ))}
      <Line ref={endRef}>
        <Date>{' '}</Date>
        <Cursor />
      </Line>
    </Wrap>
  );
};

export default LogsPanel;
