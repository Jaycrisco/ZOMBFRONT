import { useContext } from 'react';
import { Context } from '../contexts/TombFinanceProvider';

const useZombFinance = () => {
  const { zombFinance } = useContext(Context);
  return zombFinance;
};

export default useZombFinance;
