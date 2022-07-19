import { useCallback, useEffect, useState } from 'react';
import useZombFinance from '../useZombFinance';
import { useWallet } from 'use-wallet';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

const useEstimateZShare = (tbondAmount: string) => {
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const { account } = useWallet();
  const zombFinance = useZombFinance();

  const estimateAmountOfZShare = useCallback(async () => {
    const tbondAmountBn = parseUnits(tbondAmount);
    const amount = await zombFinance.estimateAmountOfZShare(tbondAmountBn.toString());
    setEstimateAmount(amount);
  }, [account]);

  useEffect(() => {
    if (account) {
      estimateAmountOfZShare().catch((err) => console.error(`Failed to get estimateAmountOfZShare: ${err.stack}`));
    }
  }, [account, estimateAmountOfZShare]);

  return estimateAmount;
};

export default useEstimateZShare;