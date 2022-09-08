import { match } from 'ts-pattern';
import { useViewerStore } from '../stores/viewerStore';
import { EscapeImage } from './EscapeImage';
import { SingleView } from './SingleView';
import { SpreadStartRight } from './SpreadStartRight';
import { Thumbnail } from './Thumbnail';

export const Viewer = () => {
  const mode = useViewerStore((state) => state.mode);
  return match(mode)
    .with('single', () => <SingleView />)
    .with('spreadStartRight', () => <SpreadStartRight />)
    .with('thumbnail', () => <Thumbnail />)
    .with('escape', () => <EscapeImage />)
    .exhaustive();
};
