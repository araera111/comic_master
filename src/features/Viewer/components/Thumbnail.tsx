import { isEmpty } from 'rambda';
import { useViewerStore } from '../stores/viewerStore';
import { getThumbnailIndex } from '../utils/viewerUtil';

export const Thumbnail = () => {
  const { setPage, changeMode, pageItems, thumbnailPageList, thumbnailPage, page } = useViewerStore((state) => state);
  return (
    <div className="mx-auto bg-slate-800 text-white overflow-hidden h-screen w-screen inset-0 flex items-center justify-center">
      {isEmpty(pageItems) ? (
        <div className="h-screen w-screen">&nbsp;</div>
      ) : (
        <div className="grid grid-cols-6 gap-4">
          {thumbnailPageList[thumbnailPage].map(({ url, fileName }) => (
            <button
              type="button"
              onClick={() => {
                changeMode('single');
                setPage(getThumbnailIndex(fileName, pageItems));
              }}
              key={url}
            >
              <div style={{ width: '15vmin', height: '15vmin' }}>
                <img
                  src={`${url}`}
                  alt=""
                  className={`object-cover w-full h-full ${
                    getThumbnailIndex(fileName, pageItems) === page ? 'border-4 border-amber-400' : ''
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
