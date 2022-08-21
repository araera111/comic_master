import { useViewerStore } from '../stores/viewerStore';
import { SingleView } from './SingleView';
import { SpreadStartRight } from './SpreadStartRight';

export const Viewer = () => {
  const mode = useViewerStore((state) => state.mode);
  return mode === 'single' ? <SingleView /> : <SpreadStartRight />;
};
