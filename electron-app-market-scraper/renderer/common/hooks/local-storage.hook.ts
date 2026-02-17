import { useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (valueToStore: T) => {
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  const removeValue = () => {
    setStoredValue(initialValue);
    window.localStorage.removeItem(key);
  };
  return [storedValue, setValue, removeValue];
};

export { useLocalStorage };
