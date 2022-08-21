import create from 'zustand';

type ViewerState = {
  page: number;
  nextPage: (by: number) => void;
  prevPage: (by: number) => void;
  pageUrlList: string[];
  setPageUrlList: (list: string[]) => void;
};
const testStrings: string[] = [
  'C:\\Users\\minus\\Desktop\\saki\\[竹嶋えく] ささやくように恋を唄う 第01巻/0001.jpg',
  'C:\\Users\\minus\\Desktop\\saki\\[竹嶋えく] ささやくように恋を唄う 第01巻/0002.jpg',
  'C:\\Users\\minus\\Desktop\\saki\\[竹嶋えく] ささやくように恋を唄う 第01巻/0003.jpg',
  'C:\\Users\\minus\\Desktop\\saki\\[竹嶋えく] ささやくように恋を唄う 第01巻/0004.jpg',
  'C:\\Users\\minus\\Desktop\\saki\\[竹嶋えく] ささやくように恋を唄う 第01巻/0005.jpg'
];
export const useViewerStore = create<ViewerState>()((set) => ({
  page: 0,
  pageUrlList: [...testStrings],
  nextPage: (by) =>
    set((state) => {
      /* ページ数がmaxのときは最初のページに飛ばす */
      if (state.page === state.pageUrlList.length - 1) return { page: 0 };
      return { page: state.page + by };
    }),
  prevPage: (by) => {
    set((state) => {
      /* ページ数-1のときは最後のページへ飛ばす */
      if (state.page === 0) return { page: state.pageUrlList.length - 1 };
      return { page: state.page - by };
    });
  },
  setPageUrlList: (list: string[]) => set(() => ({ pageUrlList: list }))
}));
