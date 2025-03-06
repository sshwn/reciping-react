import styled from '@emotion/styled';

import { motion } from 'framer-motion';

const BackgroundOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background: black;
`;

const SheetBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  /* bottom: 0; */
  left: 0;
  width: 100%;
  height: 100lvh;
  background: white;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.5);
  border-radius: 24px 24px 0 0;
  padding: 12px 0 24px 0;
  will-change: transform;
`;

const BottomHeader = styled.div`
  height: 50px;
  cursor: grab;
  user-select: none;
`;

const HandleBar = styled.div`
  width: 58px;
  height: 8px;
  background: #dfdfdf;
  margin: 0 auto;
  /* border: 1px solid red; */
`;

const SheetContentWrapper = styled.div`
  width: 100%;
  color: black;
  padding: 24px;
`;

const SheetContent = styled.div`
  width: 100%;
`;

export {BackgroundOverlay,
    SheetBackground,
    BottomHeader,
    HandleBar,
    SheetContentWrapper,
    SheetContent};