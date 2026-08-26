import { useQuery } from '@tanstack/react-query';

export type FetchStatus = 'LOADING' | 'ERROR' | 'EMPTY' | 'DATA';

export interface FetchState<T> {
  status: FetchStatus;
  response: T | null;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const { data, error, isPending, isError } = useQuery<T, Error>({
    queryKey: ['fetchData', url],
    queryFn: async () => {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!url,
  });

  const getStatus = (): FetchStatus => {
    if (!url) return 'EMPTY';
    if (isPending) return 'LOADING';
    if (isError) return 'ERROR';
    if (!data) return 'EMPTY';

    if (Array.isArray(data) && data.length === 0) return 'EMPTY';

    const nestedData = (data as { data?: unknown }).data;
    if (Array.isArray(nestedData) && nestedData.length === 0) return 'EMPTY';

    return 'DATA';
  };

  return {
    status: getStatus(),
    response: data || null,
    error: error ? error.message : null,
  };
}
