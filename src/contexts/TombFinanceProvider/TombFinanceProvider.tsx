import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import ZombFinance from '../../zomb-finance';
import config from '../../config';

export interface ZombFinanceContext {
  zombFinance?: ZombFinance;
}

export const Context = createContext<ZombFinanceContext>({ zombFinance: null });

export const ZombFinanceProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [zombFinance, setZombFinance] = useState<ZombFinance>();

  useEffect(() => {
    if (!zombFinance) {
      const zomb = new ZombFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        zomb.unlockWallet(ethereum, account);
      }
      setZombFinance(zomb);
    } else if (account) {
      zombFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, zombFinance]);

  return <Context.Provider value={{ zombFinance }}>{children}</Context.Provider>;
};
