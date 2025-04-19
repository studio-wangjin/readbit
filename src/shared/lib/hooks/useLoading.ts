import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function useLoading(): [boolean, <T>(promise: Promise<T>) => Promise<T>] {
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const startTransition = useCallback(async <T>(promise: Promise<T>) => {
    if (!mounted.current) return promise;

    try {
      setLoading(true);
      const data = await promise;
      return data;
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, []);

  return useMemo(() => [loading, startTransition], [loading, startTransition]);
}
