export interface MapStore<T extends Record<string, unknown>> {
  value: T;
  setKey(key: keyof T, value: T[keyof T] | undefined, source?: string): void;
  listen(listener: (key: keyof T, value: T[keyof T] | undefined, source?: string) => void): void;
}

class MapStoreImpl<T extends Record<string, unknown>> implements MapStore<T> {
  initialValue: T;

  value: T;

  prefix: string;

  listeners: ((key: keyof T, value: T[keyof T] | undefined, source?: string) => void)[] = [];

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

    window.addEventListener("storage", this.listener);
  }

  notify(key: keyof T, source?: string): void {
    this.listeners.forEach((listener): void => {
      const value = this.value[key];
      listener(key, value, source);
    });
  }

  setKey(key: keyof T, value: T[keyof T] | undefined, source?: string): void {
    if (typeof key === "number" || typeof key === "symbol") return;

    const storageKey = this.getStorageKey(key);

    if (typeof value === "undefined") {
      if (key in this.value) {
        this.value = { ...this.value };
        delete this.value[key];
        localStorage.removeItem(storageKey);
        this.notify(key, source);
      }
    } else {
      this.value = {
        ...this.value,
        [key]: value,
      };
      if (typeof value === "string") localStorage.setItem(storageKey, value);
      else localStorage.setItem(storageKey, JSON.stringify(value));
      this.notify(key, source);
    }
  }

  listen(listener: (key: keyof T, value: T[keyof T] | undefined, source?: string) => void): void {
    this.listeners.push(listener);
  }

  listener = (event: StorageEvent) => {
    if (!event.key?.startsWith(this.prefix)) return;

    const key = this.getPropertyKey(event.key);

    if (Object.hasOwn(this.value, key)) {
      const storageValue = event.newValue;
      let propertyValue = this.value[key] as T[keyof T];
      if (storageValue === null) this.setKey(key, undefined, "Storage");
      else if (typeof propertyValue === "string") propertyValue = storageValue as T[keyof T];
      else if (typeof propertyValue === "number") propertyValue = Number(storageValue) as T[keyof T];
      else if (typeof propertyValue === "boolean") propertyValue = Boolean(storageValue) as T[keyof T];
      else propertyValue = JSON.parse(storageValue) as typeof propertyValue;

      this.setKey(key, propertyValue, "storage");
    }
  };

  getStorageKey(propertyKey: string): string {
    // Camel case to kebab case
    const kebabKey = propertyKey.replace(/[A-Z]+(?![a-z])|[A-Z]/gu, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());
    const storageKey = `${this.prefix}${kebabKey}`;
    return storageKey;
  }

  getPropertyKey(storageKey: string): string {
    const key = storageKey.slice(this.prefix.length);
    // Kebab case to camel case
    const propertyKey = key.replace(/-./gu, (x) => (x[1] ?? "").toUpperCase());
    return propertyKey;
  }
}

export const defineMapStore = function defineMapStore<T extends Record<string, unknown>>(
  initValue: T,
  prefix: string,
): MapStore<T> {
  const store = new MapStoreImpl(initValue, prefix);
  return store;
};
