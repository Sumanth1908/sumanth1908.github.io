import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';
import { drawers, type FolderSpec } from './caseFiles';
import Cabinet from './components/Cabinet';
import CoverIntro from './components/CoverIntro';
import Dossier from './components/Dossier';
import MemoSlip from './components/MemoSlip';
import {
  AwardFrame,
  BadgeCard,
  BankerLamp,
  Nameplate,
  RotaryPhone,
  StickyNote,
  WallClock,
} from './components/DeskScene';
import { isMuted, setMuted } from './sound';
import './bureau.css';

export default function BureauApp() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'cover' | 'desk'>('cover');
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
  const [openFolder, setOpenFolder] = useState<FolderSpec | null>(null);
  const [memoOpen, setMemoOpen] = useState(false);
  const [lampOn, setLampOn] = useState(true);
  const [muted, setMutedState] = useState(isMuted);

  const toggleMute = () => {
    setMuted(!muted);
    setMutedState(!muted);
  };

  const openCommendations = () => {
    // The framed award on the wall opens the TRAINING folder.
    const training = drawers.find((d) => d.id === 'training');
    if (training?.folders[0]) {
      setOpenDrawerId('training');
      setOpenFolder(training.folders[0]);
    }
  };

  return (
    <div className={`bureau-root ${lampOn ? '' : 'bureau-root--dim'}`}>
      <div className="grain" aria-hidden="true" />

      <AnimatePresence>
        {stage === 'cover' && <CoverIntro onOpen={() => setStage('desk')} />}
      </AnimatePresence>

      {stage === 'desk' && (
        <motion.div
          className="office"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ---- the wall ---- */}
          <div className="wall">
            <header className="wall-sign">
              <h1>Bureau of Engineering Personnel</h1>
              <p>CASE FILE SJ-1908 · SUBJECT: SUMANTH JILLEPALLY · STANDING: EXEMPLARY</p>
            </header>
            <WallClock />
            <AwardFrame onClick={openCommendations} />
            <div className="lamp-halo" aria-hidden="true" />
          </div>

          {/* ---- the floor & furniture ---- */}
          <div className="floor" aria-hidden="true" />

          <div className="furniture">
            <div className="cabinet-zone">
              <StickyNote className="sticky-note--cabinet" text="New here? Start with drawer 01 ↓" />
              <Cabinet
                drawers={drawers}
                openDrawerId={openDrawerId}
                onToggleDrawer={(id) => setOpenDrawerId((cur) => (cur === id ? null : id))}
                onOpenFolder={(_, folder) => setOpenFolder(folder)}
                onNavigate={(path) => navigate(path)}
              />
            </div>

            <div className="desk-zone">
              <div className="desk-props">
                <RotaryPhone onClick={() => setMemoOpen(true)} />
                <div className="desk-center">
                  <BadgeCard />
                  <Nameplate />
                </div>
                <BankerLamp on={lampOn} onToggle={() => setLampOn((v) => !v)} />
              </div>
              <div className="desk-slab">
                <div className="desk-edge" />
                <div className="desk-drawerline" aria-hidden="true">
                  <span className="desk-knob" />
                  <span className="desk-knob" />
                </div>
              </div>
            </div>
          </div>

          {/* ---- corner utilities ---- */}
          <div className="corner-utils">
            <button
              type="button"
              className="util-btn"
              onClick={toggleMute}
              aria-label={muted ? 'Unmute office sounds' : 'Mute office sounds'}
              title={muted ? 'Unmute office sounds' : 'Mute office sounds'}
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <button
              type="button"
              className="util-link"
              onClick={() => setOpenDrawerId('archive')}
            >
              PRIOR EDITIONS →
            </button>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {openFolder && (
          <Dossier key={openFolder.id} folder={openFolder} onClose={() => setOpenFolder(null)} />
        )}
        {memoOpen && <MemoSlip key="memo-slip" onClose={() => setMemoOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
