import { useViewerStore } from '../stores/viewerStore';
import { getPageUrlString } from '../utils/viewerUtil';

export const Viewer = () => {
  const url = `C:\\Users\\minus\\Desktop\\save\\[竹嶋えく] ささやくように恋を唄う 第01巻\\`;
  const pageNumber = useViewerStore((state) => state.page);
  const increase = useViewerStore((state) => state.nextPage);
  return (
    <div className="mx-auto bg-slate-800 text-white">
      <button
        type="button"
        onClick={() => {
          increase(1);
        }}
      >
        add
      </button>
      <img src={`${url + getPageUrlString(pageNumber)}.jpg`} alt="" className="object-contain h-screen w-screen" />
    </div>
  );
};
