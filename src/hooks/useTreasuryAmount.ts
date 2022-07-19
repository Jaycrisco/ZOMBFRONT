import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useZombFinance from './useZombFinance';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const zombFinance = useZombFinance();

  useEffect(() => {
    if (zombFinance) {
      const { Treasury } = zombFinance.contracts;
      zombFinance.ZOMB.balanceOf(Treasury.address).then(setAmount);
    }
  }, [zombFinance]);
  return amount;
};

export default useTreasuryAmount;
