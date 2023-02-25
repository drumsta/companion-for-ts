const fetchedData: Record<string, Record<string, Record<string, unknown>[]>> = {};

const fetchData = async function fetchData(source: string): Promise<void> {
  const request = new Request(source);
  const response = await fetch(request);
  if (!response.body) return;

  const data = (await response.json()) as Record<string, Record<string, unknown>[]>;
  fetchedData[source] = data;
};

export const useData = async function useData<T>(source: string): Promise<T[]> {
  if (!fetchedData[source]) await fetchData(source);

  const data = fetchedData[source] ?? {};
  const items = (data["items"] ?? []) as T[];

  return items;
};
