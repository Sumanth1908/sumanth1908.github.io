import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { fonts, palette } from '../palette';

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 40;
`;

const Panel = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(520px, 100vw);
  background: ${palette.panel};
  border-left: 1px solid ${palette.border};
  z-index: 41;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 18px 20px;
  border-bottom: 1px solid ${palette.border};
  background: ${palette.panelHeader};
  position: sticky;
  top: 0;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const Eyebrow = styled.span`
  font-family: ${fonts.mono};
  font-size: 0.68rem;
  color: ${palette.textDim};
  letter-spacing: 0.05em;
`;

const Title = styled.h2`
  margin: 0;
  font-family: ${fonts.sans};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${palette.text};
`;

const CloseBtn = styled.button`
  border: none;
  background: transparent;
  color: ${palette.textMuted};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  flex: 0 0 auto;

  &:hover {
    color: ${palette.text};
    background: rgba(255, 255, 255, 0.06);
  }
`;

const Body = styled.div`
  padding: 20px;
`;

interface Props {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  headerRight?: ReactNode;
  children: ReactNode;
}

const Drawer = ({ open, onClose, eyebrow, title, headerRight, children }: Props) => (
  <AnimatePresence>
    {open && (
      <>
        <Backdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
        <Panel
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        >
          <Header>
            <TitleBlock>
              <Eyebrow>{eyebrow}</Eyebrow>
              <Title>{title}</Title>
            </TitleBlock>
            {headerRight}
            <CloseBtn type="button" onClick={onClose} aria-label="Close">
              <X size={18} />
            </CloseBtn>
          </Header>
          <Body>{children}</Body>
        </Panel>
      </>
    )}
  </AnimatePresence>
);

export default Drawer;
