import { negate, range } from 'rambda';
import { ReactNode } from 'react';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import { useViewerStore } from '../../Viewer/stores/viewerStore';

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
      upHandler={(e) => up(e)}
      downHandler={(e) => down(e)}
      timeout={0}
      /*
        stability: number,
        sensitivity: number,
        tolerance: number,
        delay: number
      */
      wheelConfig={[7, 100, 0.01, 0]}
    >
      {children}
    </ReactScrollWheelHandler>
  );
};
