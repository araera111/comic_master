import { aperture } from 'ramda';
import { PageItem, ViewMode } from '../../Viewer/types/ViewerType';

export const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

export const thumbnailMode = (
  changeMode: (mode: ViewMode) => void,
  setThumbnailPageList: (list: PageItem[][]) => void,
  pages: PageItem[]
) => {
  const thumbnailpageList = aperture(30, pages);
  setThumbnailPageList(thumbnailpageList);
  changeMode('thumbnail');
};
