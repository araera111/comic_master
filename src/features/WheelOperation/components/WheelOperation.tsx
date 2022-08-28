import { ReactNode } from 'react';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';

type WheelOperationProps = {
  children: ReactNode;
};
export const WheelOperation = ({ children }: WheelOperationProps) => {
  const up = () => {
    console.log('scroll up');
  };

  const down = () => {
    console.log('scroll down');
  };
  return (
    <ReactScrollWheelHandler upHandler={() => up()} downHandler={() => down()}>
      {children}
    </ReactScrollWheelHandler>
  );
};
