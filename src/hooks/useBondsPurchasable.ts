import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../tomb-finance/ERC20';
import useZombFinance from './useZombFinance';
import config from '../config';

const useBondsPurchasable = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const zombFinance = useZombFinance();

  useEffect(() => {
    async function fetchBondsPurchasable() {
        try {
            setBalance(await zombFinance.getBondsPurchasable());
        }
        catch(err) {
            console.error(err);
        }
      }
    fetchBondsPurchasable();
  }, [setBalance, zombFinance]);

  return balance;
};

export default useBondsPurchasable;
