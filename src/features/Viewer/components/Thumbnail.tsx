import { isEmpty } from 'rambda';
import { useViewerStore } from '../stores/viewerStore';

export const Thumbnail = () => {
  const setPage = useViewerStore((state) => state.setPage);
  const changeMode = useViewerStore((state) => state.changeMode);
  const pageItems = useViewerStore((state) => state.pageItems);
  return (
    <div className="mx-auto bg-slate-800 text-white overflow-hidden">
      {isEmpty(pageItems) ? (
        <div className="h-screen w-screen">&nbsp;</div>
      ) : (
        <div className="grid grid-cols-6 gap-4">
          {pageItems.map(({ url }, index) => (
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
