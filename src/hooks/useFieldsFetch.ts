import { useCallback, useState } from 'react';

import { getFields } from 'api/index';

export const useFieldsFetch = () => {
  const [fields, setFields] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const onGetFields = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: Awaited<string[]> = await getFields();
      setFields(response);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fields, isLoading, error, onGetFields };
};
