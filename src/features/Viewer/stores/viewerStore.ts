import create from 'zustand';
import { ViewerState, ViewMode } from '../types/ViewerType';
import { fixNextPage, fixPage, fixPrevPage, nextOnePage, prevOnePage } from '../utils/viewerUtil';

const testStrings: string[] = [
  'C:\\Users\\minus\\Desktop\\saki\\[竹嶋えく] ささやくように恋を唄う 第01巻/0001.jpg',
  'C:\\Users\\minus\\Desktop\\saki\\[竹嶋えく] ささやくように恋を唄う 第01巻/0002.jpg',
  'C:\\Users\\minus\\Desktop\\saki\\[竹嶋えく] ささやくように恋を唄う 第01巻/0003.jpg',
  'C:\\Users\\minus\\Desktop\\saki\\[竹嶋えく] ささやくように恋を唄う 第01巻/0004.jpg',
  'C:\\Users\\minus\\Desktop\\saki\\[竹嶋えく] ささやくように恋を唄う 第01巻/0005.jpg'
];

export const useViewerStore = create<ViewerState>()((set) => ({
  page: 0,
  mode: 'spreadStartRight',
  changeMode: (nextMode: ViewMode) =>
    set((state) => ({ mode: nextMode, page: fixPage(state.page, state.pageUrlList.length, nextMode) })),
  pageUrlList: [...testStrings],
  prevPage: () => set((state) => ({ page: fixPrevPage(state.page, state.pageUrlList.length, state.mode) })),
  nextPage: () => set((state) => ({ page: fixNextPage(state.page, state.pageUrlList.length, state.mode) })),
  nextOnePage: () => set((state) => ({ page: nextOnePage(state.page, state.pageUrlList.length, state.mode) })),
  prevOnePage: () => set((state) => ({ page: prevOnePage(state.page, state.pageUrlList.length, state.mode) })),
  resetPage: () => set(() => ({ page: 0 })),
  setPageUrlList: (list: string[]) => set(() => ({ pageUrlList: list }))
}));
