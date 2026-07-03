import { AnimatePresence, motion } from 'framer-motion';
import type { DrawerSpec, FolderSpec } from '../caseFiles';
import { playDrawer, playFolder } from '../sound';

interface CabinetProps {
  drawers: DrawerSpec[];
  openDrawerId: string | null;
  onToggleDrawer: (id: string) => void;
  onOpenFolder: (drawerId: string, folder: FolderSpec) => void;
  onLegacy: () => void;
}

function FolderTabs({
  drawer,
  onOpenFolder,
  onLegacy,
}: {
  drawer: DrawerSpec;
  onOpenFolder: (drawerId: string, folder: FolderSpec) => void;
  onLegacy: () => void;
}) {
  const isLegacy = drawer.action === 'legacy';
  const tabs: { key: string; label: string; sub?: string; onClick: () => void }[] = isLegacy
    ? [
        {
          key: 'legacy',
          label: 'Cosmic Edition',
          sub: '2025 site — click to load',
          onClick: onLegacy,
        },
      ]
    : drawer.folders.map((f) => ({
        key: f.id,
        label: f.tabShort ?? f.tab,
        sub: f.tabSub,
        onClick: () => {
          playFolder();
          onOpenFolder(drawer.id, f);
        },
      }));

  return (
    <motion.div
      className="drawer-hangers"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 26 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {tabs.map((t, i) => (
        <motion.button
          key={t.key}
          type="button"
          className={`folder-hanger ${isLegacy ? 'folder-hanger--legacy' : ''}`}
          style={{ zIndex: tabs.length - i }}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.06 + i * 0.05, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -7 }}
          onClick={t.onClick}
          aria-label={`Open folder: ${t.label}`}
        >
          <span className="folder-hanger-tab">
            <span className="folder-hanger-label">{t.label}</span>
          </span>
          <span className="folder-hanger-body">{t.sub && <em>{t.sub}</em>}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}

export default function Cabinet({
  drawers,
  openDrawerId,
  onToggleDrawer,
  onOpenFolder,
  onLegacy,
}: CabinetProps) {
  return (
    <div className="cabinet" role="navigation" aria-label="Case file cabinet">
      <div className="cabinet-plate">STEELCASE · REGISTRY №4</div>
      {drawers.map((d) => {
        const open = openDrawerId === d.id;
        return (
          <div key={d.id} className={`drawer ${open ? 'drawer--open' : ''}`}>
            <AnimatePresence>{open && (
              <FolderTabs drawer={d} onOpenFolder={onOpenFolder} onLegacy={onLegacy} />
            )}</AnimatePresence>

            <motion.button
              type="button"
              className="drawer-front"
              onClick={() => {
                playDrawer();
                onToggleDrawer(d.id);
              }}
              animate={
                open
                  ? { y: 10, scale: 1.045, boxShadow: '0 26px 34px -18px rgba(0,0,0,0.75)' }
                  : { y: 0, scale: 1, boxShadow: '0 0 0 0 rgba(0,0,0,0)' }
              }
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              aria-expanded={open}
              aria-label={`Drawer ${d.code}: ${d.label} — ${d.sub}`}
            >
              <span className="drawer-label-holder">
                <span className="drawer-label">
                  <span className="drawer-code">{d.code}</span>
                  <span className="drawer-name">{d.label}</span>
                  <span className="drawer-sub">{d.sub}</span>
                </span>
              </span>
              <span className="drawer-handle" aria-hidden="true" />
            </motion.button>
          </div>
        );
      })}
      <div className="cabinet-feet" aria-hidden="true" />
    </div>
  );
}
