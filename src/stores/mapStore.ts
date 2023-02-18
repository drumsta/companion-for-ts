export interface MapStore<T extends Record<string, unknown>> {
  value: T;
  setKey(key: keyof T, value: T[keyof T]): void;
  listen(listener: (key: keyof T, value: T[keyof T]) => void): void;
}

class MapStoreImpl<T extends Record<string, unknown>> implements MapStore<T> {
  initialValue: T;

  value: T;

  prefix: string;

  listeners: ((key: keyof T, value: T[keyof T]) => void)[] = [];

  constructor(value: T, prefix: string) {
    this.initialValue = { ...value };
    this.value = { ...value };
    this.prefix = prefix;

    for (const key in this.initialValue)
      if (Object.hasOwn(this.value, key)) {
        const storageKey = this.getStorageKey(key);
        const storageValue = localStorage.getItem(storageKey);
        let propertyValue = this.initialValue[key];
        if (storageValue !== null)
          if (typeof propertyValue === "string") propertyValue = storageValue as T[Extract<keyof T, string>];
          else if (typeof propertyValue === "number")
            propertyValue = Number(storageValue) as T[Extract<keyof T, string>];
          else if (typeof propertyValue === "boolean")
            propertyValue = Boolean(storageValue) as T[Extract<keyof T, string>];
          else propertyValue = JSON.parse(storageValue) as typeof propertyValue;

        this.value[key] = propertyValue;
      }
  }

  notify(key: keyof T): void {
    this.listeners.forEach((listener): void => {
      const value = this.value[key];
      listener(key, value);
    });
  }

  setKey(key: keyof T, value: T[keyof T]): void {
    if (typeof key === "number" || typeof key === "symbol") return;

    const storageKey = this.getStorageKey(key);

    if (typeof value === "undefined") {
      if (key in this.value) {
        this.value = { ...this.value };
        delete this.value[key];
        localStorage.removeItem(storageKey);
        this.notify(key);
      }
    } else {
      this.value = {
        ...this.value,
        [key]: value,
      };
      if (typeof value === "string") localStorage.setItem(storageKey, value);
      else localStorage.setItem(storageKey, JSON.stringify(value));
      this.notify(key);
    }
  }

  listen(listener: (key: keyof T, value: T[keyof T]) => void): void {
    this.listeners.push(listener);
  }

  getStorageKey(key: string): string {
    const kebabKey: string = key.replace(/[A-Z]+(?![a-z])|[A-Z]/gu, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());
    const storageKey = `${this.prefix}${kebabKey}`;
    return storageKey;
  }
}

export const defineMapStore = function defineMapStore<T extends Record<string, unknown>>(
  initValue: T,
  prefix: string,
): MapStore<T> {
  const store = new MapStoreImpl(initValue, prefix);
  return store;
};
