import { isEmpty } from 'rambda';
import { useViewerStore } from '../stores/viewerStore';

export const Thumbnail = () => {
  const mode = useViewerStore((state) => state.mode);
  const page = useViewerStore((state) => state.page);
  const pageUrlList = useViewerStore((state) => state.pageUrlList);
  console.log({ mode });
  return (
    <div className="mx-auto bg-slate-800 text-white overflow-hidden">
      {isEmpty(pageUrlList) ? (
        <div className="h-screen w-screen">&nbsp;</div>
      ) : (
        <div className="grid grid-cols-6 gap-4">
          {pageUrlList.map((url, index) => (
            <div style={{ width: '15vmin', height: '15vmin' }} key={url}>
              <img src={`${url}`} alt="" className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
