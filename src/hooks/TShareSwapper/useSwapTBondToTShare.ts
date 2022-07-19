import { useCallback } from 'react';
import useZombFinance from '../useTombFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
// import { BigNumber } from "ethers";
import { parseUnits } from 'ethers/lib/utils';


const useSwapTBondToZShare = () => {
  const zombFinance = useZombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleSwapZShare = useCallback(
  	(tbondAmount: string) => {
	  	const tbondAmountBn = parseUnits(tbondAmount, 18);
	  	handleTransactionReceipt(
	  		zombFinance.swapTBondToZShare(tbondAmountBn),
	  		`Swap ${tbondAmount} TBond to ZShare`
	  	);
  	},
  	[zombFinance, handleTransactionReceipt]
  );
  return { onSwapZShare: handleSwapZShare };
};

export default useSwapTBondToZShare;