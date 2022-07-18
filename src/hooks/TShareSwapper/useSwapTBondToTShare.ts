import { useCallback } from 'react';
import useZombFinance from '../useZombFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
// import { BigNumber } from "ethers";
import { parseUnits } from 'ethers/lib/utils';


const useSwapTBondToTShare = () => {
  const zombFinance = useZombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleSwapTShare = useCallback(
  	(tbondAmount: string) => {
	  	const tbondAmountBn = parseUnits(tbondAmount, 18);
	  	handleTransactionReceipt(
	  		zombFinance.swapTBondToTShare(tbondAmountBn),
	  		`Swap ${tbondAmount} TBond to TShare`
	  	);
  	},
  	[zombFinance, handleTransactionReceipt]
  );
  return { onSwapTShare: handleSwapTShare };
};

export default useSwapTBondToTShare;