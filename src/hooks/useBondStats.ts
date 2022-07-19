import { useEffect, useState } from 'react';
import useZombFinance from './useTombFinance';
import { TokenStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { slowRefresh } = useRefresh();
  const zombFinance = useZombFinance();

  useEffect(() => {
    async function fetchBondPrice() {
      try {
        setStat(await zombFinance.getBondStat());
      }
      catch(err){
        console.error(err);
      }
    }
    fetchBondPrice();
  }, [setStat, zombFinance, slowRefresh]);

  return stat;
};

export default useBondStats;
