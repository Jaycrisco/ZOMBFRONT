import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useZombFinance from './useTombFinance';
import useRefresh from './useRefresh';

const useStakedBalanceOnMasonry = () => {
  const { slowRefresh } = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const zombFinance = useZombFinance();
  const isUnlocked = zombFinance?.isUnlocked;
  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await zombFinance.getStakedSharesOnMasonry());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [slowRefresh, isUnlocked, zombFinance]);
  return balance;
};

export default useStakedBalanceOnMasonry;
