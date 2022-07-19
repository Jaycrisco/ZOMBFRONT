import { useEffect, useState } from 'react';
import useRefresh from '../useRefresh';
import useZombFinance from './../useZombFinance';

const useClaimRewardCheck = () => {
  const  { slowRefresh } = useRefresh();
  const [canClaimReward, setCanClaimReward] = useState(false);
  const zombFinance = useZombFinance();
  const isUnlocked = zombFinance?.isUnlocked;

  useEffect(() => {
    async function canUserClaimReward() {
      try {
        setCanClaimReward(await zombFinance.canUserClaimRewardFromMasonry());
      } catch(err){
        console.error(err);
      };
    }
    if (isUnlocked) {
      canUserClaimReward();
    }
  }, [isUnlocked, slowRefresh, zombFinance]);

  return canClaimReward;
};

export default useClaimRewardCheck;
