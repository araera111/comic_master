import { splitEvery } from 'rambda';
import { PageItem, ViewMode } from '../../Viewer/types/ViewerType';
import { getFileName, getThumbnailPage } from '../../Viewer/utils/viewerUtil';

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
  pages: PageItem[],
  pageIndex: number,
  setThumbnailPage: (num: number) => void
) => {
  const fileName = getFileName(pages, pageIndex);
  const thumbnailpageList = splitEvery(30, pages);
  const thumbnailpage = getThumbnailPage(fileName, thumbnailpageList);
  setThumbnailPage(thumbnailpage);
  setThumbnailPageList(thumbnailpageList);
  changeMode('thumbnail');
};
