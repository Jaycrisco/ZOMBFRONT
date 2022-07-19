import { useEffect, useState } from 'react';
import useZombFinance from '../useTombFinance';
import { ZShareSwapperStat } from '../../tomb-finance/types';
import useRefresh from '../useRefresh';

const useZShareSwapperStats = (account: string) => {
  const [stat, setStat] = useState<ZShareSwapperStat>();
  const { fastRefresh/*, slowRefresh*/ } = useRefresh();
  const zombFinance = useZombFinance();

  useEffect(() => {
    async function fetchZShareSwapperStat() {
      try{
        if(zombFinance.myAccount) {
          setStat(await zombFinance.getZShareSwapperStat(account));
        }
      }
      catch(err){
        console.error(err);
      }
    }
    fetchZShareSwapperStat();
  }, [setStat, zombFinance, fastRefresh, account]);

  return stat;
};

export default useZShareSwapperStats;