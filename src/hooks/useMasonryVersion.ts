import { useCallback, useEffect, useState } from 'react';
import useZombFinance from './useTombFinance';
import useStakedBalanceOnMasonry from './useStakedBalanceOnMasonry';

const useMasonryVersion = () => {
  const [masonryVersion, setMasonryVersion] = useState('latest');
  const zombFinance = useZombFinance();
  const stakedBalance = useStakedBalanceOnMasonry();

  const updateState = useCallback(async () => {
    setMasonryVersion(await zombFinance.fetchMasonryVersionOfUser());
  }, [zombFinance?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (zombFinance?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [zombFinance?.isUnlocked, stakedBalance]);

  return masonryVersion;
};

export default useMasonryVersion;
