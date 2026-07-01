import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { palette } from '../palette';

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse 60% 45% at 50% 38%, ${palette.amberSoft} 0%, transparent 70%),
    linear-gradient(180deg, ${palette.roomTop} 0%, ${palette.roomBottom} 60%, #0a0705 100%);
  overflow: hidden;
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.55) 100%);
  pointer-events: none;
`;

const Grain = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
`;

const MOTES = Array.from({ length: 14 }, (_, i) => i);

const RoomBackdrop = () => (
  <Wrap>
    <Vignette />
    <Grain />
    {MOTES.map((i) => {
      const left = (i * 37) % 100;
      const size = 1.5 + (i % 4) * 0.7;
      const duration = 14 + (i % 6) * 3;
      const delay = -(i * 1.3);
      return (
        <motion.div
          key={i}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.5, 0.5, 0] }}
          transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: `${left}%`,
            width: size,
            height: size,
            borderRadius: '50%',
            background: palette.amber,
            filter: 'blur(0.5px)',
          }}
        />
      );
    })}
  </Wrap>
);

export default RoomBackdrop;
