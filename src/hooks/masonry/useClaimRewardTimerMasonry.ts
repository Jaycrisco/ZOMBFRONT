import { useEffect, useState } from 'react';
import useZombFinance from '../useTombFinance';
import { AllocationTime } from '../../tomb-finance/types';

const useClaimRewardTimerMasonry = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const zombFinance = useZombFinance();

  useEffect(() => {
    if (zombFinance) {
      zombFinance.getUserClaimRewardTime().then(setTime);
    }
  }, [zombFinance]);
  return time;
};

export default useClaimRewardTimerMasonry;
