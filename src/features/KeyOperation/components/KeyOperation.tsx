import { useCallback, useEffect } from 'react';

export const KeyOperation = () => {
  const keyFunction = useCallback((event: KeyboardEvent) => {
    if (event.key) {
      console.log({ key: event.key });
    }
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', keyFunction, false);
  }, [keyFunction]);
  return null;
};
