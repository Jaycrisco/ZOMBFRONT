import { useEffect, useState } from 'react';
import useZombFinance from './useTombFinance';
import { TokenStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { slowRefresh } = useRefresh();
  const zombFinance = useZombFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await zombFinance.gezShareStat());
      } catch(err){
        console.error(err)
      }
    }
    fetchSharePrice();
  }, [setStat, zombFinance, slowRefresh]);

  return stat;
};

export default useShareStats;
