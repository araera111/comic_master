import { useKey } from 'rooks';
import { useViewerStore } from '../../Viewer/stores/viewerStore';

export const KeyOperation = () => {
  const next = useViewerStore((state) => state.nextPage);
  const nextOne = useViewerStore((state) => state.nextOnePage);
  const prev = useViewerStore((state) => state.prevPage);
  const prevOne = useViewerStore((state) => state.prevOnePage);
  const changeMode = useViewerStore((state) => state.changeMode);
  const changeShowRange = useViewerStore((state) => state.changeShowRange);
  const mode = useViewerStore((state) => state.mode);
  const toggleFullScreen = () => {
    console.log('full screen');
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  useKey(['ArrowRight'], () => prev());
  useKey(['ArrowLeft'], () => next());
  useKey(['z'], () => changeMode(mode === 'single' ? 'spreadStartRight' : 'single'));
  useKey(['a'], () => nextOne());
  useKey(['q'], () => prevOne());
  useKey(['r'], () => changeShowRange());
  useKey(['f'], () => toggleFullScreen());
  return null;
};
