export type ViewMode = 'single' | 'spreadStartRight' | 'thumbnail' | 'escape';

export type PageItem = {
  url: string;
  fileName: string;
};

export type ViewerState = {
  page: number;
  setPage: (num: number) => void;
  mode: ViewMode;
  changeMode: (mode: ViewMode) => void;
  prevPage: () => void;
  prevOnePage: () => void;
  nextPage: () => void;
  nextOnePage: () => void;
  resetPage: () => void;
  pageItems: PageItem[];
  setPageItems: (list: PageItem[]) => void;
  isShowRange: boolean;
  isShowFileName: boolean;
  changeShowRange: () => void;
  changeShowFileName: () => void;
  isLoading: boolean;
  changeLoading: (bool: boolean) => void;
  thumbnailPage: number;
  thumbnailPageList: PageItem[][];
  setThumbnailpage: (num: number) => void;
  setThumbnailPageList: (pages: PageItem[][]) => void;
};
