import {useEffect, useState} from 'react';
import useFetchData from './useFetchData';

/**
 * hook that returns the converted value or null
 * it triggers after 
 * 
 * @param {number} amount 
 * @param {string} from 
 * @param {string} to 
 */
export default function useConverter(amount, from, to) {
  // hook composition for fetching data
  const {rates} = useFetchData('latest');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (rates && amount && from && to) {
      setResult((amount * rates[to] / rates[from]).toFixed(2));
    } else {
      setResult(null);
    }
  }, [rates, amount, from, to])

  return result;
}