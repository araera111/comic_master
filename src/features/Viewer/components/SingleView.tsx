import { isEmpty } from 'rambda';
import { useViewerStore } from '../stores/viewerStore';

export const SingleView = () => {
  const page = useViewerStore((state) => state.page);
  const pageItems = useViewerStore((state) => state.pageItems);
  return (
    <div className="mx-auto bg-slate-800 text-white overflow-hidden">
      {isEmpty(pageItems) ? (
        <div className="h-screen w-screen">&nbsp;</div>
      ) : (
        <img src={`${pageItems[page].url}`} alt="" className="object-contain h-screen w-screen" />
      )}
    </div>
  );
};
