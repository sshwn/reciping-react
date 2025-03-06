import { useMemo, useState } from "react";
import { useDragControls } from "framer-motion";

import useMeasure from "react-use-measure";

import {
  BackgroundOverlay,
  SheetBackground,
  BottomHeader,
  HandleBar,
  SheetContentWrapper,
  SheetContent,
} from "./styled";

const BottomSheet = ({ children, viewport = "100dvh" }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [contentRef, contentBounds] = useMeasure();
  const dragControls = useDragControls();

  const animateState = isOpened ? "opened" : "closed";

  const expandedHeight = useMemo(
    () => Math.min(contentBounds.height + 50, window.innerHeight - 50),
    [contentBounds.height]
  );

  return (
    <>
      <BackgroundOverlay
        initial={false}
        animate={animateState}
        variants={{
          opened: {
            backdropFilter: "blur(1px)",
            pointerEvents: "all",
            opacity: 0.7,
          },
          closed: {
            backdropFilter: "blur(0px)",
            pointerEvents: "none",
            opacity: 0,
          },
        }}
        onTap={() => setIsOpened(false)}
      />

      <SheetBackground
        initial="closed"
        animate={animateState}
        variants={{
          opened: { top: `calc(${viewport} - ${expandedHeight}px)` },
          closed: { top: `calc(${viewport} - 60px)` },
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        // dragMomentum={false}
        // dragTransition={{ min: 0, max: 1, bounceStiffness: 200, bounceDamping: 20 }}
        onDragEnd={(event, info) => {
          // y가 음수이면 위로, 양수이면 아래로
          const offsetThreshold = 150;
          const deltaThreshold = 5;

          const isOverOffsetThreshold =
            Math.abs(info.offset.y) > offsetThreshold;
          const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;

          const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;

          if (!isOverThreshold) return;

          const newIsOpened = info.offset.y < 0;

          setIsOpened(newIsOpened);
        }}
      >
        <BottomHeader onPointerDown={(e) => dragControls.start(e)}>
          <HandleBar style={{ borderRadius: 9999 }} />
        </BottomHeader>
        <SheetContentWrapper style={{ height: 500 }} ref={contentRef}>
          <SheetContent>{children}</SheetContent>
        </SheetContentWrapper>
      </SheetBackground>
    </>
  );
};

export default BottomSheet;
