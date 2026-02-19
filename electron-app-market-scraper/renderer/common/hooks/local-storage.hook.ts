import { useState } from "react";

type LocalStorageSchema = typeof INIT_LOCAL_STORAGE;

const INIT_LOCAL_STORAGE = {
  "ui-config": {
    isCollapsed: false,
    isSubCollapsed: false,
    theme: "",
  },
} satisfies Record<string, Record<string, unknown>>;

const initLocalStorage = <K extends keyof LocalStorageSchema>(key: K): void => {
  const item = window.localStorage.getItem(key);
  if (item !== null) return;
  window.localStorage.setItem(key, JSON.stringify(INIT_LOCAL_STORAGE[key]));
};

const useLocalStoredValue = <K extends keyof LocalStorageSchema>(key: K) => {
  const [storedValue, setStoredValue] = useState<LocalStorageSchema[K]>(() => {
    const item = window.localStorage.getItem(key);
    if (item === null) throw new Error("Should initialize first.");
    return JSON.parse(item);
  });

  const setValue: React.Dispatch<
    React.SetStateAction<LocalStorageSchema[K]>
  > = (valueOrUpdater) => {
    setStoredValue((prev) => {
      const valueToStore =
        valueOrUpdater instanceof Function
          ? valueOrUpdater(prev)
          : valueOrUpdater;

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    });
  };

  return [storedValue, setValue] as const;
};

export { useLocalStoredValue, initLocalStorage };
