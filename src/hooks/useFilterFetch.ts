import { useCallback, useState } from 'react';

import { fetchItems, filterItems } from 'api/index';
import { IItem } from 'types/index';

interface IProps extends Partial<IItem> {}

export const useFilterFetch = () => {
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const onFilterItems = useCallback(async ({ brand, price, product }: IProps) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await filterItems({ brand, price, product });
      const data = await fetchItems(response.result);
      setFilteredItems(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { filteredItems, isLoading, error, onFilterItems };
};
