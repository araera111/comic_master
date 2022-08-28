import { negate, range } from 'rambda';
import { ReactNode } from 'react';
import W from 'react-scroll-wheel-handler';
import { useViewerStore } from '../../Viewer/stores/viewerStore';

// @ts-ignore
const ReactScrollWheelHandler = W.default ?? W;

type WheelOperationProps = {
  children: ReactNode;
};

export const WheelOperation = ({ children }: WheelOperationProps) => {
  const next = useViewerStore((state) => state.nextPage);
  const prev = useViewerStore((state) => state.prevPage);

  const up = (e: WheelEvent) => {
    const { deltaY } = e;
    const moveRange = range(0, negate(deltaY / 100));
    moveRange.forEach(() => {
      prev();
    });
  };
  const down = (e: WheelEvent) => {
    const { deltaY } = e;
    const moveRange = range(0, deltaY / 100);
    moveRange.forEach(() => {
      next();
    });
  };
  return (
    <ReactScrollWheelHandler
      upHandler={(e: WheelEvent) => up(e)}
      downHandler={(e: WheelEvent) => down(e)}
      timeout={0}
      wheelConfig={[7, 100, 0.01, 0]}
    >
      {children}
    </ReactScrollWheelHandler>
  );
};
