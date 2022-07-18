import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useZombFinance from '../../hooks/useZombFinance';
import { Bank } from '../../zomb-finance';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const zombFinance = useZombFinance();
  const isUnlocked = zombFinance?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!zombFinance.isUnlocked) continue;

        // only show pools staked by user
        const balance = await zombFinance.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          zombFinance.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: zombFinance.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'ZOMB' ? zombFinance.ZOMB : zombFinance.ZSHARE,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [zombFinance, setBanks]);

  useEffect(() => {
    if (zombFinance) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, zombFinance, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
