import { useKey } from 'rooks';
import { nextOne, prevOne, useViewerStore } from '../../Viewer/stores/viewerStore';
import { thumbnailMode, toggleFullScreen } from '../utils/keyOperationUtil';

export const KeyOperation = () => {
  const {
    mode,
    setThumbnailPageList,
    thumbnailPage,
    thumbnailPageList,
    setThumbnailpage,
    pageItems,
    changeShowFileName,
    changeShowRange,
    changeMode,
    prevPage,
    nextPage,
    nextOnePage,
    prevOnePage
  } = useViewerStore((state) => state);

  useKey(['ArrowRight'], () => {
    if (mode === 'thumbnail') {
      setThumbnailpage(nextOne(thumbnailPage, thumbnailPageList.length, 'thumbnail'));
      return;
    }
    prevPage();
  });
  useKey(['ArrowLeft'], () => {
    if (mode === 'thumbnail') {
      setThumbnailpage(prevOne(thumbnailPage, thumbnailPageList.length, 'thumbnail'));
      return;
    }
    nextPage();
  });
  useKey(['z'], () => changeMode(mode === 'single' ? 'spreadStartRight' : 'single'));
  useKey(['a'], () => nextOnePage());
  useKey(['q'], () => prevOnePage());
  useKey(['r'], () => changeShowRange());
  useKey(['f'], () => toggleFullScreen());
  useKey(['t'], () => thumbnailMode(changeMode, setThumbnailPageList, pageItems));
  useKey(['e'], () => changeMode(mode === 'escape' ? 'spreadStartRight' : 'escape'));
  useKey(['n'], () => changeShowFileName());
  return null;
};
