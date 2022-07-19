import { useCallback } from 'react';
import useZombFinance from './useZombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Bank } from '../tomb-finance';

const useHarvest = (bank: Bank) => {
  const zombFinance = useZombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      zombFinance.harvest(bank.contract, bank.poolId),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, zombFinance, handleTransactionReceipt]);

  return { onReward: handleReward };
};

export default useHarvest;
