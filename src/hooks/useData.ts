import { useState, useEffect } from "react";
import { Artwork } from "../utils/types";
import axios from "axios";


const useData = () => {
  const [data, setData] = useState<Artwork[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [];
        for (let i = 1; i <= 10; i++) {
          requests.push(axios.get(`https://api.artic.edu/api/v1/artworks?limit=100&page=${i}`));
        }
        const responses = await Promise.all(requests);
        let data: Artwork[] = [];
        responses.forEach(response => {
            response.data.data.forEach((item: Artwork) => {
                data.push(item);
            });
        });
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useData;