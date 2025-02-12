import React, { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

const UseData = (url, customUrl, deps) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);
      apiClient
        .get(url, customUrl)
        .then((res) => {
          if (
            url === "/products" &&
            data &&
            data.products &&
            customUrl.params.page !== 1
          ) {
            setData((prev) => ({
              ...prev,
              products: [...prev.products, ...res.data.products],
            }));
          } else {
            setData(res.data);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    },
    deps ? deps : []
  );

  return { data, error, isLoading };
};

export default UseData;
