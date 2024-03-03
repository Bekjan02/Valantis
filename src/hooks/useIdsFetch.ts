import { useCallback, useState } from 'react';

import { fetchIds } from 'api/index';

export const useGetIds = () => {
  const [items, setItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const getIds = useCallback(async ({ limit, offset }: { offset?: number; limit?: number } = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchIds({ limit, offset });
      setItems(response.result);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { items, isLoading, error, getIds };
};
