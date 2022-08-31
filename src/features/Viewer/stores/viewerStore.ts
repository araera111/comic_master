import create from 'zustand';
import { PageItem, ViewerState, ViewMode } from '../types/ViewerType';
import { fixNextPage, fixPage, fixPrevPage, nextOnePage, prevOnePage } from '../utils/viewerUtil';

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
  changeLoading: (bool: boolean) => set((state) => ({ isLoading: bool }))
}));
