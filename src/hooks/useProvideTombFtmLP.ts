import { useCallback } from 'react';
import useZombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';
import { TAX_OFFICE_ADDR } from './../utils/constants'

const useProvideZombFtmLP = () => {
  const zombFinance = useZombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideZombFtmLP = useCallback(
    (zspAmount: string, zombAmount: string) => {
      const zombAmountBn = parseUnits(zombAmount);
      handleTransactionReceipt(
        zombFinance.provideZombFtmLP(zspAmount, zombAmountBn),
        `Provide Zomb-ZSP LP ${zombAmount} ${zspAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [zombFinance, handleTransactionReceipt],
  );
  return { onProvideZombFtmLP: handleProvideZombFtmLP };
};

export default useProvideZombFtmLP;
