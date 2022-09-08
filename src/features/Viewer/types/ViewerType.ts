export type ViewMode = 'single' | 'spreadStartRight' | 'thumbnail' | 'escape';

export type PageItem = {
  url: string;
  fileName: string;
  mtime: Date;
};

export type SortMode = 'timestamp' | 'fileName' | 'timestampdown';

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
  changeSort: () => void;
  isLoading: boolean;
  changeLoading: (bool: boolean) => void;
  thumbnailPage: number;
  thumbnailPageList: PageItem[][];
  setThumbnailpage: (num: number) => void;
  setThumbnailPageList: (pages: PageItem[][]) => void;
  sortMode: SortMode;
};
