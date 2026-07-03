import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import type { FolderSpec, PageSpec } from '../caseFiles';
import { playPage } from '../sound';
import { useMediaQuery } from '../useMediaQuery';

interface DossierProps {
  folder: FolderSpec;
  onClose: () => void;
}

function PaperPage({ page, pageNo, total, jump }: {
  page: PageSpec;
  pageNo: number;
  total: number;
  jump: (p: number) => void;
}) {
  const body = typeof page.body === 'function' ? page.body(jump) : page.body;
  return (
    <div className="paper-page">
      <div className="pp-brad" aria-hidden="true" />
      <div className="pp-letterhead">
        <span className="pp-form">{page.form}</span>
        <span className="pp-agency">Bureau of Engineering Personnel</span>
      </div>
      <h3 className="pp-title">{page.title}</h3>
      <div className="pp-content">{body}</div>
      <div className="pp-footer">
        <span>CASE SJ-1908</span>
        <span>
          SHEET {pageNo} OF {total}
        </span>
      </div>
    </div>
  );
}

const flipVariants = {
  enter: (dir: number) =>
    dir > 0
      ? { rotateY: 0, zIndex: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' }
      : { rotateY: -100, zIndex: 3, boxShadow: '-30px 10px 40px rgba(0,0,0,0.35)' },
  center: { rotateY: 0, zIndex: 2, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  exit: (dir: number) =>
    dir > 0
      ? { rotateY: -100, zIndex: 3, boxShadow: '-30px 10px 40px rgba(0,0,0,0.35)' }
      : { rotateY: 0, zIndex: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' },
};

export default function Dossier({ folder, onClose }: DossierProps) {
  const compact = useMediaQuery('(max-width: 860px)');
  // On compact screens the memo becomes sheet 0 of the stack.
  const pages: (PageSpec | 'memo')[] = compact ? ['memo', ...folder.pages] : folder.pages;
  const [[pageIdx, dir], setPage] = useState<[number, number]>([0, 0]);

  const clampedIdx = Math.min(pageIdx, pages.length - 1);

  const go = useCallback(
    (next: number) => {
      setPage(([cur]) => {
        const target = Math.max(0, Math.min(pages.length - 1, next));
        if (target !== cur) playPage();
        return [target, target > cur ? 1 : -1];
      });
    },
    [pages.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(clampedIdx + 1);
      if (e.key === 'ArrowLeft') go(clampedIdx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [clampedIdx, go, onClose]);

  const current = pages[clampedIdx];
  const sheetNo = compact ? clampedIdx : clampedIdx + 1;
  const sheetTotal = compact ? pages.length - 1 : pages.length;

  return (
    <motion.div
      className="dossier-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="dossier"
        role="dialog"
        aria-modal="true"
        aria-label={`Dossier: ${folder.tab}`}
        initial={{ x: '-30vw', y: '18vh', scale: 0.5, rotate: -8, opacity: 0 }}
        animate={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
        exit={{ y: '16vh', scale: 0.72, rotate: 5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dossier-tab">
          <span>{folder.tab}</span>
        </div>

        <button type="button" className="dossier-close" onClick={onClose} aria-label="Close file">
          ✕ CLOSE FILE
        </button>

        {!compact && <div className="dossier-left">{folder.memo}<div className="memo-clip" aria-hidden="true" /></div>}

        <div className="dossier-right">
          <div className="page-understack" aria-hidden="true" />
          <div className="page-stage">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={clampedIdx}
                className="page-flipper"
                custom={dir}
                variants={flipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                {current === 'memo' ? (
                  <div className="paper-page paper-page--memo">
                    <div className="pp-content">{folder.memo}</div>
                    <div className="pp-footer">
                      <span>CASE SJ-1908</span>
                      <span>FILE COVER</span>
                    </div>
                  </div>
                ) : (
                  <PaperPage
                    page={current}
                    pageNo={sheetNo}
                    total={sheetTotal}
                    jump={(p) => go(compact ? p + 1 : p)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="page-nav">
            <button
              type="button"
              className="page-nav-btn"
              onClick={() => go(clampedIdx - 1)}
              disabled={clampedIdx === 0}
              aria-label="Previous sheet"
            >
              ← PREV
            </button>
            <span className="page-nav-count">
              {clampedIdx + 1} / {pages.length}
            </span>
            <button
              type="button"
              className="page-nav-btn"
              onClick={() => go(clampedIdx + 1)}
              disabled={clampedIdx === pages.length - 1}
              aria-label="Next sheet"
            >
              TURN →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
