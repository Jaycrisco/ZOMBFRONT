import { useEffect, useState } from 'react';
import useZombFinance from './useTombFinance';
import useRefresh from './useRefresh';

const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const { slowRefresh } = useRefresh();
  const zombFinance = useZombFinance();

  useEffect(() => {
    async function fetchTVL() {
      try {
        setTotalValueLocked(await zombFinance.getTotalValueLocked());
      }
      catch(err){
        console.error(err);
      }
    }
    fetchTVL();
  }, [setTotalValueLocked, zombFinance, slowRefresh]);

  return totalValueLocked;
};

export default useTotalValueLocked;
