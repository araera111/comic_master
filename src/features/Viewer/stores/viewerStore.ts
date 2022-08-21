import create from 'zustand';

type ViewerState = {
  page: number;
  nextPage: (by: number) => void;
};

export const useViewerStore = create<ViewerState>()((set) => ({
  page: 1,
  nextPage: (by) => set((state) => ({ page: state.page + by }))
}));
