import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const sendRequest = useCallback(async (url, method, body, cb) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: method,
        body: body !== null ? JSON.stringify(body) : null
      });
      const data = await response.json();
      if (!data.status) {
        throw new Error('Error happened');
      }
      cb !== null && cb(data.data);
    } catch (err) {
      setIsLoading(false);
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
  });
  return {
    isLoading,
    isError,
    sendRequest
  };
};

export default useHttp;
