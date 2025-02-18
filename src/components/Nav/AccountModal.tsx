import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';

import Label from '../Label';
import Modal, { ModalProps } from '../Modal';
import ModalTitle from '../ModalTitle';
import useZombFinance from '../../hooks/useTombFinance';
import TokenSymbol from '../TokenSymbol';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const zombFinance = useZombFinance();

  const zombBalance = useTokenBalance(zombFinance.ZOMB);
  const displayZombBalance = useMemo(() => getDisplayBalance(zombBalance), [zombBalance]);

  const zshareBalance = useTokenBalance(zombFinance.ZSHARE);
  const displayZshareBalance = useMemo(() => getDisplayBalance(zshareBalance), [zshareBalance]);

  const tbondBalance = useTokenBalance(zombFinance.TBOND);
  const displayTbondBalance = useMemo(() => getDisplayBalance(tbondBalance), [tbondBalance]);

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="ZOMB" />
          <StyledBalance>
            <StyledValue>{displayZombBalance}</StyledValue>
            <Label text="ZOMB Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="ZSHARE" />
          <StyledBalance>
            <StyledValue>{displayZshareBalance}</StyledValue>
            <Label text="ZSHARE Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="TBOND" />
          <StyledBalance>
            <StyledValue>{displayTbondBalance}</StyledValue>
            <Label text="TBOND Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  //color: ${(props) => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;
