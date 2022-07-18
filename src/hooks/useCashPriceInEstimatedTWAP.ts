import { useEffect, useState } from 'react';
import useZombFinance from './useZombFinance';
import { TokenStat } from '../zomb-finance/types';
import useRefresh from './useRefresh';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const zombFinance = useZombFinance();
  const { slowRefresh } = useRefresh(); 

  useEffect(() => {
    async function fetchCashPrice() {
      try {
        setStat(await zombFinance.getZombStatInEstimatedTWAP());
      }catch(err) {
        console.error(err);
      }
    }
    fetchCashPrice();
  }, [setStat, zombFinance, slowRefresh]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
