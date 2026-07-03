import { motion } from 'framer-motion';
import { contact } from '../../data/resume';

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
          <strong>{contact.name}</strong>
        </div>
        <div className="memo-slip-row">
          <span>OF</span>
          <strong>Electronic Arts — Software Engineer III</strong>
        </div>
        <div className="memo-slip-row">
          <span>PHONE</span>
          <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
        </div>
        <div className="memo-slip-row">
          <span>EMAIL</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
        <div className="memo-slip-row">
          <span>WIRE</span>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
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
