import { isEmpty } from 'rambda';
import { useViewerStore } from '../../Viewer/stores/viewerStore';

export const PageRange = () => {
  const page = useViewerStore((state) => state.page);
  const pageUrlList = useViewerStore((state) => state.pageUrlList);
  const isShowRange = useViewerStore((state) => state.isShowRange);
  return isShowRange && !isEmpty(pageUrlList) ? (
    <div className="z-50 absolute top-0 left-0 bg-slate-50">
      {page + 1}/{pageUrlList.length}
    </div>
  ) : null;
};
