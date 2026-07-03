import { motion } from 'framer-motion';
import { contact } from '../../data/resume';
import { playFolder } from '../sound';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function receivedDate(): string {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export default function CoverIntro({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="cover-backdrop"
      exit={{ opacity: 0, transition: { duration: 0.45, delay: 0.25 } }}
    >
      <motion.div
        className="cover-folder"
        initial={{ y: 40, opacity: 0, rotate: -1.5 }}
        animate={{ y: 0, opacity: 1, rotate: -1.5 }}
        exit={{ y: '-120vh', rotate: -7, transition: { duration: 0.6, ease: [0.5, 0, 0.75, 0] } }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="cover-tab">PERSONNEL</div>

        <div className="cover-head">
          <div className="cover-agency">Bureau of Engineering Personnel</div>
          <div className="cover-agency-sub">Records Division · Hyderabad Station</div>
        </div>

        <div className="cover-rule" />

        <motion.div
          className="stamp stamp-red cover-stamp-conf"
          initial={{ scale: 2.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ delay: 0.55, duration: 0.28, ease: 'easeIn' }}
        >
          CONFIDENTIAL
        </motion.div>

        <h1 className="cover-casefile">
          CASE FILE
          <span className="cover-caseno">№ SJ-1908</span>
        </h1>

        <div className="cover-fields">
          <div className="cover-field">
            <span>SUBJECT</span>
            <strong>{contact.name.toUpperCase()}</strong>
          </div>
          <div className="cover-field">
            <span>OCCUPATION</span>
            <strong>SOFTWARE ENGINEER — 10+ YRS OF SERVICE</strong>
          </div>
          <div className="cover-field">
            <span>SPECIALTY</span>
            <strong>DISTRIBUTED SYSTEMS · AGENTIC AI · CLOUD</strong>
          </div>
        </div>

        <motion.div
          className="cover-stamp-recv-row"
          initial={{ scale: 1.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ delay: 0.85, duration: 0.24, ease: 'easeIn' }}
        >
          <span className="stamp stamp-blue cover-stamp-recv">RECEIVED · {receivedDate()}</span>
        </motion.div>

        <div className="cover-string" aria-hidden="true">
          <span className="cover-button-disc" />
          <span className="cover-button-disc cover-button-disc--lower" />
        </div>

        <motion.button
          type="button"
          className="cover-open-btn"
          onClick={() => {
            playFolder();
            onOpen();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          ¶ UNTIE &amp; OPEN FILE
        </motion.button>

        <div className="cover-footnote">
          Unauthorized review is encouraged. This file self-updates.
        </div>
      </motion.div>
    </motion.div>
  );
}
