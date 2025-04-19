/** @tossdocs-ignore */
import { useCallback, useMemo, useRef, useState } from 'react';

export function useLoading(): [boolean, <T>(promise: Promise<T>) => Promise<T>] {
  const [loading, setLoading] = useState(false);
  const ref = useRef(false);

  const startTransition = useCallback(async <T>(promise: Promise<T>) => {
    try {
      setLoading(true);
      const data = await promise;
      return data;
    } finally {
      if (ref.current) {
        setLoading(false);
      }
    }
  }, []);

  return useMemo(() => [loading, startTransition], [loading, startTransition]);
}
