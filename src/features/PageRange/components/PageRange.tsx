import { isEmpty } from 'rambda';
import { useViewerStore } from '../../Viewer/stores/viewerStore';

export const PageRange = () => {
  const page = useViewerStore((state) => state.page);
  const pageItems = useViewerStore((state) => state.pageItems);
  const isShowRange = useViewerStore((state) => state.isShowRange);
  return isShowRange && !isEmpty(pageItems) ? (
    <div className="z-50 absolute top-0 left-0 bg-slate-400 opacity-70">
      {page + 1}/{pageItems.length}
    </div>
  ) : null;
};
