import create from 'zustand';
import { PageItem, ViewerState, ViewMode } from '../types/ViewerType';
import {
  fixNextPage,
  fixPage,
  fixPrevPage,
  getNextSortMode,
  nextOnePage,
  prevOnePage,
  setSort
} from '../utils/viewerUtil';

export const prevOne = prevOnePage;
export const nextOne = nextOnePage;

export const useViewerStore = create<ViewerState>()((set) => ({
  page: 0,
  setPage: (num: number) => set(() => ({ page: num })),
  mode: 'spreadStartRight',
  changeMode: (nextMode: ViewMode) =>
    set((state) => ({ mode: nextMode, page: fixPage(state.page, state.pageItems.length, nextMode) })),
  pageItems: [],
  prevPage: () => set((state) => ({ page: fixPrevPage(state.page, state.pageItems.length, state.mode) })),
  nextPage: () => set((state) => ({ page: fixNextPage(state.page, state.pageItems.length, state.mode) })),
  nextOnePage: () => set((state) => ({ page: nextOnePage(state.page, state.pageItems.length, state.mode) })),
  prevOnePage: () => set((state) => ({ page: prevOnePage(state.page, state.pageItems.length, state.mode) })),
  resetPage: () => set(() => ({ page: 0 })),
  setPageItems: (list: PageItem[]) => set(() => ({ pageItems: list })),
  isShowRange: true,
  isShowFileName: true,
  isLoading: false,
  changeShowRange: () => set((state) => ({ isShowRange: !state.isShowRange })),
  changeShowFileName: () => set((state) => ({ isShowFileName: !state.isShowFileName })),
  changeLoading: (bool: boolean) => set(() => ({ isLoading: bool })),
  thumbnailPage: 0,
  thumbnailPageList: [],
  setThumbnailpage: (num: number) => set(() => ({ thumbnailPage: num })),
  setThumbnailPageList: (pages: PageItem[][]) => set(() => ({ thumbnailPageList: pages })),
  sortMode: 'fileName',
  changeSort: () => {
    set((state) => ({ sortMode: getNextSortMode(state.sortMode) }));
    set((state) => ({ pageItems: setSort(state.pageItems, state.sortMode) }));
  }
}));
