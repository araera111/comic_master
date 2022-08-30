import { match } from 'ts-pattern';
import { useViewerStore } from '../stores/viewerStore';
import { SingleView } from './SingleView';
import { SpreadStartRight } from './SpreadStartRight';
import { Thumbnail } from './Thumbnail';

export const Viewer = () => {
  const mode = useViewerStore((state) => state.mode);
  return match(mode)
    .with('single', () => <SingleView></SingleView>)
    .with('spreadStartRight', () => <SpreadStartRight></SpreadStartRight>)
    .with('thumbnail', () => <Thumbnail></Thumbnail>)
    .exhaustive();
};
