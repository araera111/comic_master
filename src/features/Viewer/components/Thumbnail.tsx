import { isEmpty } from 'rambda';
import { useViewerStore } from '../stores/viewerStore';

export const Thumbnail = () => {
  const page = useViewerStore((state) => state.page);
  const pageUrlList = useViewerStore((state) => state.pageUrlList);
  return (
    <div className="mx-auto bg-slate-800 text-white overflow-hidden">
      {isEmpty(pageUrlList) ? (
        <div className="h-screen w-screen">&nbsp;</div>
      ) : (
        <img src={`${pageUrlList[page]}`} alt="" className="object-contain h-screen w-screen" />
      )}
    </div>
  );
};
