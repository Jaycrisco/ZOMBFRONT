import { useEffect, useState } from 'react';
import useZombFinance from './useZombFinance';
import { AllocationTime } from '../tomb-finance/types';
import useRefresh from './useRefresh';


const useTreasuryAllocationTimes = () => {
  const { slowRefresh } = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const zombFinance = useZombFinance();
  useEffect(() => {
    if (zombFinance) {
      zombFinance.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [zombFinance, slowRefresh]);
  return time;
};

export default useTreasuryAllocationTimes;
