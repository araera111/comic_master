import { useViewerStore } from '../../Viewer/stores/viewerStore';

export const FileNameDisplay = () => {
  const a = '';
  const pageItems = useViewerStore((state) => state.pageItems);
  const page = useViewerStore((state) => state.page);
  return <div className="z-50 absolute bottom-0 bg-slate-400 opacity-70">{pageItems[page].fileName}</div>;
};
