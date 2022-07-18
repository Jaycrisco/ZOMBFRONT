import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useZombFinance from './useZombFinance';
import useRefresh from './useRefresh';

const useTotalStakedOnMasonry = () => {
  const [totalStaked, setTotalStaked] = useState(BigNumber.from(0));
  const zombFinance = useZombFinance();
  const { slowRefresh } = useRefresh();
  const isUnlocked = zombFinance?.isUnlocked;

  useEffect(() => {
    async function fetchTotalStaked() {
      try {
        setTotalStaked(await zombFinance.getTotalStakedInMasonry());
      } catch(err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
     fetchTotalStaked();
    }
  }, [isUnlocked, slowRefresh, zombFinance]);

  return totalStaked;
};

export default useTotalStakedOnMasonry;
