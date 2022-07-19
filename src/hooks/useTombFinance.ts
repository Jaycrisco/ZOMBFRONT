import { useContext } from 'react';
import { Context } from '../contexts/ZombFinanceProvider';

const useZombFinance = () => {
  const { zombFinance } = useContext(Context);
  return zombFinance;
};

export default useZombFinance;
