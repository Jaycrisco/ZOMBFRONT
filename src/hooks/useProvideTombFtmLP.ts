import { useCallback } from 'react';
import useZombFinance from './useZombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';
import { TAX_OFFICE_ADDR } from './../utils/constants'

const useProvideZombFtmLP = () => {
  const zombFinance = useZombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideZombFtmLP = useCallback(
    (ftmAmount: string, zombAmount: string) => {
      const zombAmountBn = parseUnits(zombAmount);
      handleTransactionReceipt(
        zombFinance.provideZombFtmLP(ftmAmount, zombAmountBn),
        `Provide Zomb-ZSP LP ${zombAmount} ${ftmAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [zombFinance, handleTransactionReceipt],
  );
  return { onProvideZombFtmLP: handleProvideZombFtmLP };
};

export default useProvideZombFtmLP;
