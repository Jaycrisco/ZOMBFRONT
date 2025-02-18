import { useCallback } from 'react';
import useZombFinance from './useTombFinance';
import { Bank } from '../tomb-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const zombFinance = useZombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(zombFinance.exit(bank.contract, bank.poolId), `Redeem ${bank.contract}`);
  }, [bank, zombFinance, handleTransactionReceipt]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
