import axios from "axios";
import { useState, useEffect } from "react";

const useGetOneAds = (url, adsId) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let result = await axios.get(`${url}/${adsId}`);
        result = result.data.data.result[0];
        console.log(result);
        setData(result);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [url, adsId]);

  return { data, loading, error };
};
export default useGetOneAds;
