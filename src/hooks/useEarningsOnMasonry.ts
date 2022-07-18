import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useZombFinance from './useZombFinance';
import useRefresh from './useRefresh';

const useEarningsOnMasonry = () => {
  const { slowRefresh } = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const zombFinance = useZombFinance();
  const isUnlocked = zombFinance?.isUnlocked;

  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await zombFinance.getEarningsOnMasonry());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [isUnlocked, zombFinance, slowRefresh]);

  return balance;
};

export default useEarningsOnMasonry;
