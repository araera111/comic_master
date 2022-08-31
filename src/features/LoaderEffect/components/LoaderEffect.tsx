import { RotatingSquare } from 'react-loader-spinner';
import { useViewerStore } from '../../Viewer/stores/viewerStore';

export const LoadingEffect = () => {
  const { isLoading } = useViewerStore((state) => state);
  return isLoading ? (
    <div className="z-50 bg-slate-800 absolute inset-0 flex items-center justify-center">
      <div className="">
        <RotatingSquare
          height="200"
          width="200"
          color="#4fd1c5"
          ariaLabel="rotating-square-loading"
          strokeWidth="4"
          wrapperStyle={{}}
          wrapperClass=""
          visible
        />
      </div>
    </div>
  ) : null;
};
