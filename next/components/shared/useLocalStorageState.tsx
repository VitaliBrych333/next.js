import { useState, useEffect } from 'react';

export default function useLocalStorageState(key: string, defaultValue: string) {
  const [state, setState] = useState(() => {
    let value;
    try {
      value = window.localStorage.getItem(key) || String(defaultValue);
    } catch (e) {
      value = defaultValue;
    }

    return value;
  });

  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState] as const;
}
