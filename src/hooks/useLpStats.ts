import { useEffect, useState } from 'react';
import useZombFinance from './useZombFinance';
import { LPStat } from '../zomb-finance/types';
import useRefresh from './useRefresh';

const useLpStats = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const { slowRefresh } = useRefresh();
  const zombFinance = useZombFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try{
        setStat(await zombFinance.getLPStat(lpTicker));
      }
      catch(err){
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, zombFinance, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStats;
