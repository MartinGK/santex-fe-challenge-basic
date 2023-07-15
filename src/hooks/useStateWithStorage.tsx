import { useState, useEffect } from 'react';

interface StorageValue {
  key: string;
  defaultValue: unknown;
}

export default function useStateWithStorage({
  key,
  defaultValue,
}: StorageValue) {
  const storedValue = localStorage.getItem(key);
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
