import { useEffect, useState } from 'react';
import useZombFinance from './../useZombFinance';
import useRefresh from '../useRefresh';

const useWithdrawCheck = () => {
  const [canWithdraw, setCanWithdraw] = useState(false);
  const zombFinance = useZombFinance();
  const { slowRefresh } = useRefresh();
  const isUnlocked = zombFinance?.isUnlocked;

  useEffect(() => {
    async function canUserWithdraw() {
      try {
        setCanWithdraw(await zombFinance.canUserUnstakeFromMasonry());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserWithdraw();
    }
  }, [isUnlocked, zombFinance, slowRefresh]);

  return canWithdraw;
};

export default useWithdrawCheck;
