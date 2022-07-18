import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useZombFinance from './useZombFinance';
import { ContractName } from '../zomb-finance';
import config from '../config';

const useStakedBalance = (poolName: ContractName, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const zombFinance = useZombFinance();
  const isUnlocked = zombFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await zombFinance.stakedBalanceOnBank(poolName, poolId, zombFinance.myAccount);
    setBalance(balance);
  }, [poolName, poolId, zombFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, setBalance, zombFinance, fetchBalance]);

  return balance;
};

export default useStakedBalance;
