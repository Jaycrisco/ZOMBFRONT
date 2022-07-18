import { useEffect, useState } from 'react';
import useZombFinance from '../useZombFinance';
import { TShareSwapperStat } from '../../zomb-finance/types';
import useRefresh from '../useRefresh';

const useTShareSwapperStats = (account: string) => {
  const [stat, setStat] = useState<TShareSwapperStat>();
  const { fastRefresh/*, slowRefresh*/ } = useRefresh();
  const zombFinance = useZombFinance();

  useEffect(() => {
    async function fetchTShareSwapperStat() {
      try{
        if(zombFinance.myAccount) {
          setStat(await zombFinance.getTShareSwapperStat(account));
        }
      }
      catch(err){
        console.error(err);
      }
    }
    fetchTShareSwapperStat();
  }, [setStat, zombFinance, fastRefresh, account]);

  return stat;
};

export default useTShareSwapperStats;