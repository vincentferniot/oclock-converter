import {useEffect, useState} from 'react';
import axios from 'axios';

const api = {
  url: 'http://data.fixer.io/api',
  key: process.env.REACT_APP_API_KEY
};

/**
 * hook to fetch data from fixer.io
 * api key is stored in .env file
 * 
 * @param {string} endpoint 
 */
export default function useFetchData(endpoint) {
  const [data, setData] = useState({});
  
  useEffect(() => {
    if (endpoint) {
      async function fetchData() {
        const result = await axios(`${api.url}/${endpoint}?access_key=${api.key}`);

        setData(result.data);
      }
    
      fetchData();
    }
  }, [endpoint]);

    return data;
}