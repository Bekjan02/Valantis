import { useCallback, useState } from 'react';

import { fetchItems } from 'api/index';
import { IItem } from 'types/index';

export const useItemsFetch = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const getItems = useCallback(async (ids: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchItems(ids);
      setItems(data || []);
    } catch (err) {
      setError(err || 'Ошибка при загрузке данных');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { items, isLoading, error, getItems };
};
