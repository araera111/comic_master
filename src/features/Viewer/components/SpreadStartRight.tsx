import { isEmpty } from 'rambda';
import { useViewerStore } from '../stores/viewerStore';

export const SpreadStartRight = () => {
  const page = useViewerStore((state) => state.page);
  const pageUrlList = useViewerStore((state) => state.pageUrlList);
  return (
    <div className="mx-auto bg-slate-800 text-white overflow-hidden">
      {isEmpty(pageUrlList) ? (
        <div className="h-screen w-screen text-center">&nbsp;</div>
      ) : (
        <div className="flex justify-center">
          <div>
            <img src={`${pageUrlList[page + 1]}`} alt="" className="object-contain h-screen w-full" />
          </div>
          <div>
            <img src={`${pageUrlList[page]}`} alt="" className="object-contain h-screen w-full" />
          </div>
        </div>
      )}
    </div>
  );
};
