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
    prev();
    console.log(e);
    console.log('up');
  };
  const down = (e: WheelEvent) => {
    next();
    console.log(e);

    console.log('down');
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
      wheelConfig={[0, 100, 0.01, 0]}
    >
      {children}
    </ReactScrollWheelHandler>
  );
};
