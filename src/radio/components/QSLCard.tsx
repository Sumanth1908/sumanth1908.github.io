import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Radio as RadioIcon } from 'lucide-react';
import { fonts, palette } from '../palette';
import { contactInfo } from '../../data/resume';
import type { Band, Station } from '../types';

export const Card = styled(motion.div)`
  position: relative;
  background: ${palette.paper};
  color: ${palette.ink};
  border-radius: 4px;
  padding: 26px 28px 22px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45), 0 1px 0 rgba(255, 255, 255, 0.4) inset;
  background-image: radial-gradient(rgba(0, 0, 0, 0.035) 1px, transparent 1px);
  background-size: 3px 3px;

  &::before {
    content: '';
    position: absolute;
    inset: 8px;
    border: 1px solid rgba(42, 33, 24, 0.18);
    pointer-events: none;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-family: ${fonts.type};
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  color: ${palette.inkFaint};
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px dashed ${palette.paperShadow};
`;

const Stamp = styled.div`
  border: 2px dashed ${palette.brassDark};
  border-radius: 3px;
  padding: 6px 9px;
  font-family: ${fonts.display};
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: ${palette.brassDark};
  transform: rotate(3deg);
`;

export const Title = styled.h2`
  font-family: ${fonts.serif};
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 1.15;
  margin: 0 0 4px;
  color: ${palette.ink};
`;

export const Subtitle = styled.p`
  font-family: ${fonts.type};
  font-size: 0.82rem;
  color: ${palette.inkFaint};
  margin: 0 0 16px;
  line-height: 1.5;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  font-family: ${fonts.type};
  font-size: 0.7rem;
  color: ${palette.inkFaint};
  margin-bottom: 14px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: ${palette.needle};
  color: ${palette.paper};
  font-family: ${fonts.display};
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  padding: 3px 8px;
  border-radius: 2px;
`;

const Body = styled.p`
  font-family: ${fonts.serif};
  font-size: 1.05rem;
  line-height: 1.6;
  color: ${palette.ink};
  margin: 0 0 16px;
`;

const List = styled.ul`
  margin: 0 0 16px;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    font-family: ${fonts.serif};
    font-size: 0.98rem;
    line-height: 1.5;
    color: ${palette.ink};
  }
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 6px;
`;

const Chip = styled.span`
  font-family: ${fonts.type};
  font-size: 0.68rem;
  border: 1px solid ${palette.brassDark};
  color: ${palette.brassDark};
  padding: 3px 8px;
  border-radius: 2px;
  background: rgba(201, 162, 75, 0.08);
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 10px;
  border-top: 1px dashed ${palette.paperShadow};
  font-family: ${fonts.type};
  font-size: 0.65rem;
  color: ${palette.inkFaint};
  letter-spacing: 0.04em;
`;

const ContactRow = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${fonts.serif};
  font-size: 1.05rem;
  color: ${palette.ink};
  text-decoration: none;
  padding: 10px 4px;
  border-bottom: 1px dashed ${palette.paperShadow};

  &:hover {
    color: ${palette.needle};
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const cardMotion = {
  initial: { opacity: 0, y: 16, rotate: -0.6 },
  animate: { opacity: 1, y: 0, rotate: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

const fmt = (v: number, decimals: number) => v.toFixed(decimals);

interface Props {
  station: Station;
  band: Band;
}

const QSLCard = ({ station, band }: Props) => {
  const freqLabel = `${fmt(station.freq, band.decimals)} ${band.unit}`;
  const content = station.content;

  return (
    <Card key={station.id} {...cardMotion}>
      <Header>
        <span>
          QSL CONFIRMATION · {band.dialLabel} · {freqLabel}
        </span>
        <span>{station.callSign}</span>
      </Header>

      {content.kind === 'home' && (
        <>
          <Stamp style={{ float: 'right', marginLeft: 12 }}>KSMJ</Stamp>
          <Title>{contactInfo.name}</Title>
          <Subtitle>On air since 2016 · 10+ years of transmissions</Subtitle>
          <Body>{contactInfo.tagline}</Body>
          <Footer>
            <span>Turn the dial — SW1 career · SW2 projects · SW3 skills · AM directory</span>
          </Footer>
        </>
      )}

      {content.kind === 'experience' && (
        <>
          {content.data.current && <Badge>ON AIR NOW</Badge>}
          <Title style={{ marginTop: content.data.current ? 10 : 0 }}>{content.data.company}</Title>
          <Subtitle>{content.data.position}</Subtitle>
          <Meta>
            <span>{content.data.location}</span>
            <span>
              {content.data.startDate} — {content.data.current ? 'Present' : content.data.endDate}
            </span>
          </Meta>
          <Body>{content.data.description}</Body>
          <List>
            {content.data.responsibilities.map((r) => (
              <li key={r.slice(0, 24)}>{r}</li>
            ))}
          </List>
          <Footer>
            <span>Reception report: R5 S9 — clear copy</span>
          </Footer>
        </>
      )}

      {content.kind === 'project' && (
        <>
          <Title>{content.data.title}</Title>
          <Subtitle>{content.data.subtitle}</Subtitle>
          <Meta>
            <span>Broadcast from {content.data.company}</span>
          </Meta>
          <Body>{content.data.description}</Body>
          <List>
            {content.data.responsibilities.map((r) => (
              <li key={r.slice(0, 24)}>{r}</li>
            ))}
          </List>
          <ChipRow>
            {content.data.technologies.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </ChipRow>
        </>
      )}

      {content.kind === 'education' && (
        <>
          <Title>{content.data.institution}</Title>
          <Subtitle>{content.data.degree}</Subtitle>
          <Meta>
            <span>{content.data.location}</span>
            <span>
              {content.data.startDate} — {content.data.endDate}
            </span>
          </Meta>
          <Body>{content.data.description}</Body>
        </>
      )}

      {content.kind === 'award' && (
        <>
          <Badge>SPECIAL BULLETIN</Badge>
          <Title style={{ marginTop: 10 }}>{content.data.title}</Title>
          <Subtitle>
            {content.data.issuer} · {content.data.date}
          </Subtitle>
          <Body>{content.data.description}</Body>
        </>
      )}

      {content.kind === 'contact' && (
        <>
          <Title>Send a Transmission</Title>
          <Subtitle>Reach out on any of the following frequencies</Subtitle>
          <div>
            <ContactRow href={`mailto:${contactInfo.email}`}>
              <Mail size={18} /> {contactInfo.email}
            </ContactRow>
            <ContactRow href={`tel:+${contactInfo.phone}`}>
              <Phone size={18} /> +{contactInfo.phone}
            </ContactRow>
            <ContactRow href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin size={18} /> linkedin.com/in/sumanthjillepally
            </ContactRow>
          </div>
        </>
      )}

      {content.kind === 'skill' && (
        <>
          <RadioIcon size={22} color={palette.brassDark} />
          <Title style={{ marginTop: 10 }}>{content.data.name}</Title>
          <Subtitle>{content.data.category === 'technical' ? 'Core technical signal' : 'Supporting frequency'}</Subtitle>
          <Body>
            Signal strength holds at {content.data.level > 0 ? `${content.data.level}%` : 'calibration pending'} on
            the SW3 band.
          </Body>
        </>
      )}
    </Card>
  );
};

export default QSLCard;
