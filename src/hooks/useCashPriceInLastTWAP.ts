import { useCallback, useEffect, useState } from 'react';
import useZombFinance from './useZombFinance';
import config from '../config';
import { BigNumber } from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const zombFinance = useZombFinance();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await zombFinance.getZombPriceInLastTWAP());
  }, [zombFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch ZOMB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, zombFinance, fetchCashPrice]);

  return price;
};

export default useCashPriceInLastTWAP;
