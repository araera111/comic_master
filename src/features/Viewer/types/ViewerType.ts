export type ViewMode = 'single' | 'spreadStartRight' | 'thumbnail' | 'escape';
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
  pageUrlList: string[];
  setPageUrlList: (list: string[]) => void;
  isShowRange: boolean;
  changeShowRange: () => void;
};
