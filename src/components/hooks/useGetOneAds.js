import axios from "axios";
import { useQuery } from "react-query";

const useGetOneAds = (adsId) => {
  const getAds = async () => {
    const response = await axios.get(`/get-one-ads/${adsId}`);
    console.log(response.data.data.result[0]);
    return response.data.data.result[0];
  };

  const { data, status } = useQuery("getOneAds", getAds);
  console.log(data);
  console.log(status);
  return { data, status };
};

export default useGetOneAds;
