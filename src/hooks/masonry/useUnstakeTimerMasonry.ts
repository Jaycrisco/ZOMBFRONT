import { useEffect, useState } from 'react';
import useZombFinance from './../useTombFinance';
import { AllocationTime } from '../../tomb-finance/types';

const useUnstakeTimerMasonry = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const zombFinance = useZombFinance();

  useEffect(() => {
    if (zombFinance) {
      zombFinance.getUserUnstakeTime().then(setTime);
    }
  }, [zombFinance]);
  return time;
};

export default useUnstakeTimerMasonry;
