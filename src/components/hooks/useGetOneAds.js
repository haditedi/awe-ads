import axios from "axios";
import {useEffect} from "React"
import { useQuery } from "react-query";

const useGetOneAds = (adsId) => {
 
  useEffect(() => {
    axios.get(`/get-one-ads/${adsId}`)
    .then(resp => {
      return resp.data.data.result
    })
  },[])


}
export default useGetOneAds;




// const getAds = async () => {
//   const response = await axios.get(`/get-one-ads/${adsId}`);
//   console.log(response.data.data.result[0]);
//   return response.data.data.result[0];
// };

// const { data, status } = useQuery("getOneAds", getAds);

// return { data, status };
// }