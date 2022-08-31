import { isEmpty } from 'rambda';
import { useViewerStore } from '../../Viewer/stores/viewerStore';

export const PageRange = () => {
  const { page, pageItems, isShowRange, mode, thumbnailPage, thumbnailPageList } = useViewerStore((state) => state);
  console.log({ thumbnailPage, thumbnailPageList });
  return isShowRange && !isEmpty(pageItems) ? (
    <div className="z-50 absolute top-0 left-0 bg-slate-400 opacity-70">
      {mode === 'thumbnail' ? (
        <>
          {thumbnailPage + 1}/{thumbnailPageList.length}
        </>
      ) : (
        <>
          {' '}
          {page + 1}/{pageItems.length}
        </>
      )}
    </div>
  ) : null;
};
