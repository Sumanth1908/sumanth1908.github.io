import { motion } from 'framer-motion';
import { contactInfo } from '../../data/resume';

// '919010234192' → '+91 90102 34192'
const phoneDisplay = `+${contactInfo.phone.slice(0, 2)} ${contactInfo.phone.slice(2, 7)} ${contactInfo.phone.slice(7)}`;

export default function MemoSlip({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="dossier-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="memo-slip"
        role="dialog"
        aria-modal="true"
        aria-label="Contact details"
        initial={{ y: '60vh', rotate: 8, opacity: 0 }}
        animate={{ y: 0, rotate: -1.2, opacity: 1 }}
        exit={{ y: '30vh', rotate: 6, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="memo-slip-close" onClick={onClose} aria-label="Close memo">
          ✕
        </button>

        <div className="memo-slip-head">
          <span className="memo-slip-urgent">URGENT</span>
          <h3>WHILE YOU WERE OUT</h3>
        </div>

        <div className="memo-slip-row">
          <span>M</span>
          <strong>{contactInfo.name}</strong>
        </div>
        <div className="memo-slip-row">
          <span>OF</span>
          <strong>Electronic Arts — Software Engineer III</strong>
        </div>
        <div className="memo-slip-row">
          <span>PHONE</span>
          <a href={`tel:+${contactInfo.phone}`}>{phoneDisplay}</a>
        </div>
        <div className="memo-slip-row">
          <span>EMAIL</span>
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </div>
        <div className="memo-slip-row">
          <span>WIRE</span>
          <a href={contactInfo.linkedin} target="_blank" rel="noreferrer">
            linkedin.com/in/sumanthjillepally
          </a>
        </div>

        <div className="memo-slip-checks" aria-hidden="true">
          <span className="checked">☑ TELEPHONED</span>
          <span className="checked">☑ PLEASE CALL BACK</span>
          <span>☐ WILL CALL AGAIN</span>
          <span className="checked">☑ WANTS TO BUILD THINGS</span>
        </div>

        <div className="memo-slip-message">
          <span>MESSAGE</span>
          <p>Open to interesting problems in distributed systems, event-driven architecture &amp; agentic AI. Leave word at the desk.</p>
        </div>

        <div className="memo-slip-sign">
          <span>SIGNED</span>
          <em>S. Jillepally</em>
        </div>
      </motion.div>
    </motion.div>
  );
}
