import { useCallback, useEffect } from 'react';
import { useViewerStore } from '../../Viewer/stores/viewerStore';

export const KeyOperation = () => {
  const next = useViewerStore((state) => state.nextPage);
  const prev = useViewerStore((state) => state.prevPage);
  const keyFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        prev(1);
      }

      if (event.key === 'ArrowLeft') {
        next(1);
      }
    },
    [next, prev]
  );
  useEffect(() => {
    document.addEventListener('keydown', keyFunction, false);
  }, [keyFunction]);
  return null;
};
