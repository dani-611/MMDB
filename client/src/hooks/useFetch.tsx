import { useState, useEffect } from 'react';
import { ApiStatus } from '../constants/ApiStatus';

export interface FetchState<T> {
  status: string;
  response: T | null;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    status: ApiStatus.LOADING,
    response: null,
    error: null,
  });

  useEffect(() => {
    let isCurrent = true;

    async function fetchData() {
      if (isCurrent) {
        setState({ status: ApiStatus.LOADING, response: null, error: null });
      }

      try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          if (response.status === 404) {
            if (isCurrent)
              setState({
                status: ApiStatus.EMPTY,
                response: null,
                error: null,
              });
            return;
          }
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        if (!isCurrent) return;

        if (!result || (Array.isArray(result) && result.length === 0)) {
          setState({ status: ApiStatus.EMPTY, response: null, error: null });
        } else {
          setState({ status: ApiStatus.DATA, response: result, error: null });
        }
      } catch (err) {
        if (isCurrent) {
          setState({
            status: ApiStatus.ERROR,
            response: null,
            error: (err as Error).message,
          });
        }
      }
    }

    fetchData();

    return () => {
      isCurrent = false;
    };
  }, [url]);

  return state;
}
