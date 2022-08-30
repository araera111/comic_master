import { isEmpty } from 'rambda';
import { useViewerStore } from '../stores/viewerStore';

export const SpreadStartRight = () => {
  const page = useViewerStore((state) => state.page);
  const pageItems = useViewerStore((state) => state.pageItems);
  return (
    <div className="mx-auto bg-slate-800 text-white overflow-hidden">
      {isEmpty(pageItems) ? (
        <div className="h-screen w-screen text-center">&nbsp;</div>
      ) : (
        <div className="flex justify-center">
          <div>
            <img src={`${pageItems[page + 1]?.url}`} alt="" className="object-contain h-screen w-full" />
          </div>
          <div>
            <img src={`${pageItems[page]?.url}`} alt="" className="object-contain h-screen w-full" />
          </div>
        </div>
      )}
    </div>
  );
};
