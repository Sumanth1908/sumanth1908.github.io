import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { contactInfo } from '../../data/resume';
import { playClick } from '../sound';

/* ---------------------------------------------------------------- */
/* Wall clock — keeps real time                                       */
/* ---------------------------------------------------------------- */

export function WallClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const s = now.getSeconds() * 6;
  const m = now.getMinutes() * 6 + now.getSeconds() * 0.1;
  const h = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;

  return (
    <div className="wall-clock" aria-hidden="true" title="Bureau standard time">
      <div className="wall-clock-face">
        {Array.from({ length: 12 }, (_, i) => (
          <span className="wall-clock-tick" key={i} style={{ transform: `rotate(${i * 30}deg)` }} />
        ))}
        <span className="wall-clock-hand wall-clock-hand--h" style={{ transform: `rotate(${h}deg)` }} />
        <span className="wall-clock-hand wall-clock-hand--m" style={{ transform: `rotate(${m}deg)` }} />
        <span className="wall-clock-hand wall-clock-hand--s" style={{ transform: `rotate(${s}deg)` }} />
        <span className="wall-clock-pin" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Framed commendation on the wall                                    */
/* ---------------------------------------------------------------- */

export function AwardFrame({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      className="award-frame"
      onClick={onClick}
      whileHover={{ rotate: 0.8, scale: 1.03 }}
      aria-label="Extra Mile Award — view commendations"
      title="Extra Mile Award — Amazon, 2023"
    >
      <span className="award-frame-inner">
        <span className="award-laurel" aria-hidden="true">❦</span>
        <span className="award-frame-title">EXTRA MILE AWARD</span>
        <span className="award-frame-sub">AMAZON · MMXXIII</span>
        <span className="award-frame-seal" aria-hidden="true">★</span>
      </span>
    </motion.button>
  );
}

/* ---------------------------------------------------------------- */
/* Bureau ID badge — flips over on click                              */
/* ---------------------------------------------------------------- */

export function BadgeCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      className={`badge-card ${flipped ? 'badge-card--flipped' : ''}`}
      onClick={() => {
        playClick();
        setFlipped((f) => !f);
      }}
      aria-label="Bureau identification badge — click to flip"
    >
      <span className="badge-inner">
        <span className="badge-face badge-front">
          <span className="badge-header">BUREAU I.D.</span>
          <span className="badge-photo" aria-hidden="true">
            SJ
          </span>
          <span className="badge-name">{contactInfo.name}</span>
          <span className="badge-role">SOFTWARE ENGINEER III · ELECTRONIC ARTS</span>
          <span className="badge-meta">SERVICE: 10+ YRS &nbsp;·&nbsp; CLEARANCE: FULL-STACK</span>
          <span className="badge-barcode" aria-hidden="true" />
        </span>
        <span className="badge-face badge-back">
          <span className="badge-header">SUBJECT PROFILE</span>
          <span className="badge-back-text">
            Builds intelligent, AI-driven systems that enhance performance, reliability and
            scalability. Cloud-native architectures, distributed computing, and a strong focus on
            Agentic AI.
          </span>
          <span className="badge-back-sign">
            <em>S. Jillepally</em>
            <span>AUTHORIZED SIGNATURE</span>
          </span>
        </span>
      </span>
    </button>
  );
}

/* ---------------------------------------------------------------- */
/* Rotary phone — opens the contact memo                              */
/* ---------------------------------------------------------------- */

export function RotaryPhone({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      className="rotary-phone"
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      aria-label="Telephone — contact Sumanth"
      title="Ring the desk — contact"
    >
      <svg viewBox="0 0 200 150" width="100%" height="100%" aria-hidden="true">
        <defs>
          <linearGradient id="phoneBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a3d45" />
            <stop offset="0.5" stopColor="#22242a" />
            <stop offset="1" stopColor="#14161a" />
          </linearGradient>
          <linearGradient id="phoneHandset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#484c56" />
            <stop offset="1" stopColor="#1b1d22" />
          </linearGradient>
        </defs>
        {/* handset */}
        <g className="phone-handset">
          <rect x="30" y="18" width="140" height="16" rx="8" fill="url(#phoneHandset)" />
          <ellipse cx="38" cy="34" rx="22" ry="18" fill="url(#phoneHandset)" />
          <ellipse cx="162" cy="34" rx="22" ry="18" fill="url(#phoneHandset)" />
        </g>
        {/* cradle + body */}
        <path d="M45 52 L155 52 L178 128 Q180 140 166 140 L34 140 Q20 140 22 128 Z" fill="url(#phoneBody)" />
        <rect x="52" y="46" width="14" height="14" rx="3" fill="#2c2f36" />
        <rect x="134" y="46" width="14" height="14" rx="3" fill="#2c2f36" />
        {/* dial */}
        <circle cx="100" cy="100" r="30" fill="#0e0f12" />
        <circle cx="100" cy="100" r="27" fill="#d8d3c3" />
        {Array.from({ length: 9 }, (_, i) => {
          const a = (i * 32 - 60) * (Math.PI / 180);
          return <circle key={i} cx={100 + Math.cos(a) * 18.5} cy={100 + Math.sin(a) * 18.5} r="4.6" fill="#14161a" />;
        })}
        <circle cx="100" cy="100" r="7" fill="#b3aa8e" />
      </svg>
      <span className="phone-note">RING FOR CONTACT</span>
    </motion.button>
  );
}

/* ---------------------------------------------------------------- */
/* Banker's lamp — dims the room                                      */
/* ---------------------------------------------------------------- */

export function BankerLamp({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={`banker-lamp ${on ? 'banker-lamp--on' : ''}`}
      onClick={() => {
        playClick();
        onToggle();
      }}
      aria-pressed={on}
      aria-label={on ? 'Turn desk lamp off' : 'Turn desk lamp on'}
      title="Pull the chain"
    >
      <svg viewBox="0 0 160 190" width="100%" height="100%" aria-hidden="true">
        <defs>
          <linearGradient id="lampShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2e7d5b" />
            <stop offset="0.55" stopColor="#1d5c41" />
            <stop offset="1" stopColor="#0f3d2a" />
          </linearGradient>
          <linearGradient id="lampBrass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e8c877" />
            <stop offset="0.5" stopColor="#b58f3e" />
            <stop offset="1" stopColor="#8a681f" />
          </linearGradient>
        </defs>
        {/* glow under the shade */}
        <ellipse className="lamp-glow" cx="80" cy="72" rx="62" ry="26" fill="#ffe9a8" />
        {/* shade */}
        <path d="M20 66 Q20 34 80 34 Q140 34 140 66 L132 74 L28 74 Z" fill="url(#lampShade)" />
        <rect x="26" y="70" width="108" height="7" rx="3" fill="url(#lampBrass)" />
        {/* stem */}
        <rect x="76" y="77" width="8" height="62" fill="url(#lampBrass)" />
        <circle cx="80" cy="34" r="6" fill="url(#lampBrass)" />
        {/* pull chain */}
        <line x1="118" y1="77" x2="118" y2="106" stroke="#d9c98d" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="118" cy="110" r="4" fill="#d9c98d" />
        {/* base */}
        <rect x="48" y="139" width="64" height="10" rx="5" fill="url(#lampBrass)" />
        <ellipse cx="80" cy="156" rx="46" ry="10" fill="url(#lampBrass)" />
      </svg>
    </button>
  );
}

/* ---------------------------------------------------------------- */
/* Sticky note hint                                                   */
/* ---------------------------------------------------------------- */

export function StickyNote({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`sticky-note ${className ?? ''}`} aria-hidden="true">
      {text}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Brass nameplate                                                    */
/* ---------------------------------------------------------------- */

export function Nameplate() {
  return (
    <div className="nameplate">
      <span className="nameplate-name">S. JILLEPALLY</span>
      <span className="nameplate-role">ENGINEERING DIVISION</span>
    </div>
  );
}
