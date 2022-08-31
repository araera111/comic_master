import { useKey } from 'rooks';
import { useViewerStore } from '../../Viewer/stores/viewerStore';
import { thumbnailMode, toggleFullScreen } from '../utils/keyOperationUtil';

export const KeyOperation = () => {
  const next = useViewerStore((state) => state.nextPage);
  const nextOne = useViewerStore((state) => state.nextOnePage);
  const prev = useViewerStore((state) => state.prevPage);
  const prevOne = useViewerStore((state) => state.prevOnePage);
  const { mode, setThumbnailPageList, pageItems, changeShowFileName, changeShowRange, changeMode } = useViewerStore(
    (state) => state
  );

  useKey(['ArrowRight'], () => prev());
  useKey(['ArrowLeft'], () => next());
  useKey(['z'], () => changeMode(mode === 'single' ? 'spreadStartRight' : 'single'));
  useKey(['a'], () => nextOne());
  useKey(['q'], () => prevOne());
  useKey(['r'], () => changeShowRange());
  useKey(['f'], () => toggleFullScreen());
  useKey(['t'], () => thumbnailMode(changeMode, setThumbnailPageList, pageItems));
  useKey(['e'], () => changeMode(mode === 'escape' ? 'spreadStartRight' : 'escape'));
  useKey(['n'], () => changeShowFileName());
  return null;
};
