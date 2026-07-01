import styled from '@emotion/styled';
import { fonts, palette } from '../../palette';
import { contactInfo, education } from '../../../data/resume';
import Panel from '../Panel';
import Grid from '../Grid';

const Code = styled.pre`
  margin: 0;
  font-family: ${fonts.mono};
  font-size: 0.82rem;
  line-height: 1.75;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Key = styled.span`
  color: ${palette.blue};
`;

const Str = styled.span`
  color: ${palette.green};
`;

const Comment = styled.span`
  color: ${palette.textDim};
`;

const Link = styled.a`
  color: ${palette.green};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ConfigView = () => (
  <Grid>
    <Panel title="service.yaml" subtitle="config · read-only" span={12}>
      <Code>
        <Key>service</Key>: <Str>sumanth-jillepally</Str>
        {'\n'}
        <Key>kind</Key>: <Str>SoftwareDevelopmentEngineer</Str>
        {'\n\n'}
        <Comment># -- education --</Comment>
        {'\n'}
        <Key>education</Key>:{'\n'}
        {education.map((edu) => (
          <span key={edu.id}>
            {'  - '}
            <Key>institution</Key>: <Str>{edu.institution}</Str>
            {'\n    '}
            <Key>degree</Key>: <Str>{edu.degree}</Str>
            {'\n    '}
            <Key>location</Key>: <Str>{edu.location}</Str>
            {'\n    '}
            <Key>period</Key>: <Str>{edu.startDate} — {edu.endDate}</Str>
            {'\n    '}
            <Key>notes</Key>: <Str>"{edu.description}"</Str>
            {'\n'}
          </span>
        ))}
        {'\n'}
        <Comment># -- reach me --</Comment>
        {'\n'}
        <Key>contact</Key>:{'\n'}
        {'  '}
        <Key>email</Key>:{' '}
        <Link href={`mailto:${contactInfo.email}`}>
          <Str>{contactInfo.email}</Str>
        </Link>
        {'\n  '}
        <Key>phone</Key>:{' '}
        <Link href={`tel:+${contactInfo.phone}`}>
          <Str>"+{contactInfo.phone}"</Str>
        </Link>
        {'\n  '}
        <Key>linkedin</Key>:{' '}
        <Link href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
          <Str>{contactInfo.linkedin}</Str>
        </Link>
      </Code>
    </Panel>
  </Grid>
);

export default ConfigView;
