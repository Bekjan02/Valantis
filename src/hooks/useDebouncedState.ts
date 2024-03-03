import { useEffect, useMemo, useRef, useState } from 'react';

export const useDebouncedState = (initialValue = '', delay = 1000): [string, (value: string) => void, string] => {
  const [value, setValue] = useState<string>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);
  const prevValue = useRef<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      prevValue.current = debouncedValue;
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue]);

  return useMemo(() => [debouncedValue, setValue, prevValue.current], [debouncedValue]);
};
