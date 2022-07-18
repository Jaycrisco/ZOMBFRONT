import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useZombFinance from './useZombFinance';
import { ContractName } from '../zomb-finance';
import config from '../config';

const useEarnings = (poolName: ContractName, earnTokenName: String, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const zombFinance = useZombFinance();
  const isUnlocked = zombFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await zombFinance.earnedFromBank(poolName, earnTokenName, poolId, zombFinance.myAccount);
    setBalance(balance);
  }, [poolName, earnTokenName, poolId, zombFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, zombFinance, fetchBalance]);

  return balance;
};

export default useEarnings;
