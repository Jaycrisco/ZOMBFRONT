import { useEffect, useState } from 'react';
import useZombFinance from './useZombFinance';
import { TokenStat } from '../zomb-finance/types';
import useRefresh from './useRefresh';

const useZombStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { fastRefresh } = useRefresh();
  const zombFinance = useZombFinance();

  useEffect(() => {
    async function fetchZombPrice(){
      try {
        setStat(await zombFinance.getZombStat());
      }
      catch(err){
        console.error(err)
      }
    }
    fetchZombPrice();
  }, [setStat, zombFinance, fastRefresh]);

  return stat;
};

export default useZombStats;
