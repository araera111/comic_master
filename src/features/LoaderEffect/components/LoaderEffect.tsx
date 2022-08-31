import { RotatingSquare } from 'react-loader-spinner';

export const LoadingEffect = () => {
  const a = '';
  return (
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
  );
};
