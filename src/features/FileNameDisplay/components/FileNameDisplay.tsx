import { isEmpty } from 'rambda';
import { match } from 'ts-pattern';
import { useViewerStore } from '../../Viewer/stores/viewerStore';

export const FileNameDisplay = () => {
  const pageItems = useViewerStore((state) => state.pageItems);
  const page = useViewerStore((state) => state.page);
  const mode = useViewerStore((state) => state.mode);
  const isShowFileName = useViewerStore((state) => state.isShowFileName);
  return match(mode)
    .with('single', () =>
      isShowFileName && !isEmpty(pageItems) ? (
        <div className="z-50 absolute bottom-0 bg-slate-400 opacity-70">{pageItems[page].fileName}</div>
      ) : null
    )
    .with('spreadStartRight', () =>
      isShowFileName && !isEmpty(pageItems) ? (
        <>
          <div className="z-50 text-sm absolute bottom-6 bg-slate-400 opacity-70">{pageItems[page + 1].fileName}</div>
          <div className="z-50 text-sm absolute bottom-0 bg-slate-400 opacity-70">{pageItems[page].fileName}</div>
        </>
      ) : null
    )
    .otherwise(() => null);
};
