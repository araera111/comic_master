import { isEmpty } from 'rambda';
import { useViewerStore } from '../../Viewer/stores/viewerStore';

export const FileNameDisplay = () => {
  const pageItems = useViewerStore((state) => state.pageItems);
  const page = useViewerStore((state) => state.page);
  const isShowFileName = useViewerStore((state) => state.isShowFileName);
  return isShowFileName && !isEmpty(pageItems) ? (
    <div className="z-50 absolute bottom-0 bg-slate-400 opacity-70">{pageItems[page].fileName}</div>
  ) : null;
};
