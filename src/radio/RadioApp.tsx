import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Linkedin, Mail } from 'lucide-react';
import RadioCabinet from './components/RadioCabinet';
import TransmissionPanel from './components/TransmissionPanel';
import RoomBackdrop from './components/RoomBackdrop';
import { bandById, closestStation, snapThreshold, stationsForBand } from './stations';
import { fonts, palette } from './palette';
import { useRadioAudio } from './useRadioAudio';
import type { BandId } from './types';
import { contactInfo } from '../data/resume';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px 60px;
  gap: 26px;
`;

const TopBar = styled.div`
  width: 100%;
  max-width: 1180px;
  display: flex;
  justify-content: flex-end;
  gap: 22px;
  font-family: ${fonts.type};
  font-size: 0.7rem;
  letter-spacing: 0.05em;
`;

const TopLink = styled.a`
  color: ${palette.creamDark};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  opacity: 0.7;
  transition: opacity 0.2s, color 0.2s;

  &:hover {
    opacity: 1;
    color: ${palette.amber};
  }
`;

const Stage = styled.div`
  width: 100%;
  max-width: 1180px;
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

const defaultFreqForBand = (id: BandId): number => {
  if (id === 'skills') {
    const b = bandById(id);
    return (b.freqMin + b.freqMax) / 2;
  }
  const list = stationsForBand(id);
  return list[0]?.freq ?? bandById(id).freqMin;
};

const RadioApp = () => {
  const [poweredOn, setPoweredOn] = useState(false);
  const [bandId, setBandId] = useState<BandId>('home');
  const [freq, setFreq] = useState<number>(defaultFreqForBand('home'));
  const [volume, setVolume] = useState(0.6);

  const band = bandById(bandId);
  const bandStations = useMemo(
    () => stationsForBand(bandId).slice().sort((a, b) => a.freq - b.freq),
    [bandId],
  );
  const { station: nearest, distance } = closestStation(bandId, freq);
  const threshold = snapThreshold(band);
  const locked = nearest !== null && distance <= threshold;
  const lockedStationId = locked && nearest ? nearest.id : null;

  useRadioAudio(poweredOn, locked || bandId === 'skills', volume);

  const handleBandSelect = (id: BandId) => {
    setBandId(id);
    setFreq(defaultFreqForBand(id));
  };

  const handleScrub = (v: number) => {
    setFreq(Math.min(band.freqMax, Math.max(band.freqMin, v)));
  };

  const seekNext = () => {
    if (!bandStations.length) return;
    const next = bandStations.find((s) => s.freq > freq + 0.001) ?? bandStations[0];
    setFreq(next.freq);
  };

  const seekPrev = () => {
    if (!bandStations.length) return;
    const before = bandStations.filter((s) => s.freq < freq - 0.001);
    const prev = before.length ? before[before.length - 1] : bandStations[bandStations.length - 1];
    setFreq(prev.freq);
  };

  const handleSelectSkill = (skillId: string) => {
    const target = bandStations.find((s) => s.content.kind === 'skill' && s.content.data.id === skillId);
    if (target) setFreq(target.freq);
  };

  const currentLabel = locked && nearest ? `${nearest.callSign} — ${nearest.label}` : '';

  return (
    <>
      <RoomBackdrop />
      <Page>
        <TopBar>
          <TopLink href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={14} /> LinkedIn
          </TopLink>
          <TopLink href={`mailto:${contactInfo.email}`}>
            <Mail size={14} /> Email
          </TopLink>
          <TopLink href="/legacy">Archived transmission (v1) →</TopLink>
        </TopBar>

        <Stage>
          <RadioCabinet
            poweredOn={poweredOn}
            onPowerToggle={() => setPoweredOn((v) => !v)}
            band={band}
            bandId={bandId}
            onBandSelect={handleBandSelect}
            stations={bandStations}
            freq={freq}
            onScrub={handleScrub}
            onSeekPrev={seekPrev}
            onSeekNext={seekNext}
            lockedStationId={lockedStationId}
            locked={locked}
            currentLabel={currentLabel}
            volume={volume}
            onVolumeChange={setVolume}
          />
          <TransmissionPanel
            poweredOn={poweredOn}
            bandId={bandId}
            band={band}
            lockedStation={nearest}
            locked={locked}
            onSelectSkill={handleSelectSkill}
          />
        </Stage>
      </Page>
    </>
  );
};

export default RadioApp;
