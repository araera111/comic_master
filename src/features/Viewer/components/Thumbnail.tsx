import { isEmpty } from 'rambda';
import { useViewerStore } from '../stores/viewerStore';

export const Thumbnail = () => {
  const mode = useViewerStore((state) => state.mode);
  const page = useViewerStore((state) => state.page);
  const setPage = useViewerStore((state) => state.setPage);
  const changeMode = useViewerStore((state) => state.changeMode);
  const pageUrlList = useViewerStore((state) => state.pageUrlList);
  console.log({ mode });
  return (
    <div className="mx-auto bg-slate-800 text-white overflow-hidden">
      {isEmpty(pageUrlList) ? (
        <div className="h-screen w-screen">&nbsp;</div>
      ) : (
        <div className="grid grid-cols-6 gap-4">
          {pageUrlList.map((url, index) => (
            <button
              type="button"
              onClick={() => {
                changeMode('single');
                setPage(index);
              }}
              key={url}
            >
              <div style={{ width: '15vmin', height: '15vmin' }}>
                <img src={`${url}`} alt="" className="object-cover w-full h-full" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
