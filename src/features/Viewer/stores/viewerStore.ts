import create from 'zustand';
import { ViewerState, ViewMode } from '../types/ViewerType';
import { fixNextPage, fixPage, fixPrevPage, nextOnePage, prevOnePage } from '../utils/viewerUtil';

const testStrings: string[] = [];

export const useViewerStore = create<ViewerState>()((set) => ({
  page: 0,
  setPage: (num: number) => set(() => ({ page: num })),
  mode: 'spreadStartRight',
  changeMode: (nextMode: ViewMode) =>
    set((state) => ({ mode: nextMode, page: fixPage(state.page, state.pageUrlList.length, nextMode) })),
  pageUrlList: [],
  prevPage: () => set((state) => ({ page: fixPrevPage(state.page, state.pageUrlList.length, state.mode) })),
  nextPage: () => set((state) => ({ page: fixNextPage(state.page, state.pageUrlList.length, state.mode) })),
  nextOnePage: () => set((state) => ({ page: nextOnePage(state.page, state.pageUrlList.length, state.mode) })),
  prevOnePage: () => set((state) => ({ page: prevOnePage(state.page, state.pageUrlList.length, state.mode) })),
  resetPage: () => set(() => ({ page: 0 })),
  setPageUrlList: (list: string[]) => set(() => ({ pageUrlList: list }))
}));
