import { useState, useEffect } from "react";

export const useAsync = (
  fn,
  {
    resolve = false,
    defaultData = null,
    resolveCondition = [],
    defaultLoading = resolve,
  } = {}
) => {
  const [error, setError] = useState();
  const [data, setData] = useState(defaultData);
  const [lastUpdated, setLastUpdated] = useState();
  const [isLoading, setLoading] = useState(defaultLoading);

  const request = async (...args) => {
    if (typeof fn !== "function") {
      console.error("Invalid function provided to useAsync");
      return;
    }

    setLoading(true);

    try {
      const result = await fn(...args);
      setData(result);
      setLastUpdated(Date.now());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resolve) {
      request();
    }
  }, resolveCondition);

  return {
    request,
    data,
    isLoading,
    lastUpdated,
    error,
  };
};
