import { useEffect, useState } from 'react';
import useZombFinance from './useTombFinance';
import useRefresh from './useRefresh';

const useFetchMasonryAPR = () => {
  const [apr, setApr] = useState<number>(0);
  const zombFinance = useZombFinance();
  const { slowRefresh } = useRefresh(); 

  useEffect(() => {
    async function fetchMasonryAPR() {
      try {
        setApr(await zombFinance.getMasonryAPR());
      } catch(err){
        console.error(err);
      }
    }
   fetchMasonryAPR();
  }, [setApr, zombFinance, slowRefresh]);

  return apr;
};

export default useFetchMasonryAPR;
