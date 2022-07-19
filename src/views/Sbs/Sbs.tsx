import React, { /*useCallback, useEffect, */useMemo, useState } from 'react';
import Page from '../../components/Page';
import PitImage from '../../assets/img/pit.png';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import { Box,/* Paper, Typography,*/ Button, Grid } from '@material-ui/core';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useZombFinance from '../../hooks/useZombFinance';
import { getDisplayBalance/*, getBalance*/ } from '../../utils/formatBalance';
import { BigNumber/*, ethers*/ } from 'ethers';
import useSwapTBondToZShare from '../../hooks/TShareSwapper/useSwapTBondToTShare';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import useZShareSwapperStats from '../../hooks/TShareSwapper/useTShareSwapperStats';
import TokenInput from '../../components/TokenInput';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import TokenSymbol from '../../components/TokenSymbol';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${PitImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const Sbs: React.FC = () => {
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const zombFinance = useZombFinance();
  const [tbondAmount, setTbondAmount] = useState('');
  const [zshareAmount, setZshareAmount] = useState('');

  const [approveStatus, approve] = useApprove(zombFinance.TBOND, zombFinance.contracts.ZShareSwapper.address);
  const { onSwapZShare } = useSwapTBondToZShare();
  const zshareSwapperStat = useZShareSwapperStats(account);

  const zshareBalance = useMemo(() => (zshareSwapperStat ? Number(zshareSwapperStat.zshareBalance) : 0), [zshareSwapperStat]);
  const bondBalance = useMemo(() => (zshareSwapperStat ? Number(zshareSwapperStat.tbondBalance) : 0), [zshareSwapperStat]);

  const handleTBondChange = async (e: any) => {
    if (e.currentTarget.value === '') {
      setTbondAmount('');
      setZshareAmount('');
      return
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setTbondAmount(e.currentTarget.value);
    const updateZShareAmount = await zombFinance.estimateAmountOfZShare(e.currentTarget.value);
    setZshareAmount(updateZShareAmount);  
  };

  const handleTBondSelectMax = async () => {
    setTbondAmount(String(bondBalance));
    const updateZShareAmount = await zombFinance.estimateAmountOfZShare(String(bondBalance));
    setZshareAmount(updateZShareAmount); 
  };

  const handleZShareSelectMax = async () => {
    setZshareAmount(String(zshareBalance));
    const rateZSharePerZomb = (await zombFinance.getZShareSwapperStat(account)).rateZSharePerZomb;
    const updateTBondAmount = ((BigNumber.from(10).pow(30)).div(BigNumber.from(rateZSharePerZomb))).mul(Number(zshareBalance) * 1e6);
    setTbondAmount(getDisplayBalance(updateTBondAmount, 18, 6));
  };

  const handleZShareChange = async (e: any) => {
    const inputData = e.currentTarget.value;
    if (inputData === '') {
      setZshareAmount('');
      setTbondAmount('');
      return
    }
    if (!isNumeric(inputData)) return;
    setZshareAmount(inputData);
    const rateZSharePerZomb = (await zombFinance.getZShareSwapperStat(account)).rateZSharePerZomb;
    const updateTBondAmount = ((BigNumber.from(10).pow(30)).div(BigNumber.from(rateZSharePerZomb))).mul(Number(inputData) * 1e6);
    setTbondAmount(getDisplayBalance(updateTBondAmount, 18, 6));
  }

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="TBond -> ZShare Swap" subtitle="Swap TBond to ZShare" />
            </Route>
            <Box mt={5}>
              <Grid container justify="center" spacing={6}>
                <StyledBoardroom>
                  <StyledCardsWrapper>
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>TBonds</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={zombFinance.TBOND.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleTBondSelectMax}
                                onChange={handleTBondChange}
                                value={tbondAmount}
                                max={bondBalance}
                                symbol="TBond"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${bondBalance} TBOND Available in Wallet`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
                    </StyledCardWrapper>
                    <Spacer size="lg"/>
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>ZShare</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={zombFinance.ZSHARE.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleZShareSelectMax}
                                onChange={handleZShareChange}
                                value={zshareAmount}
                                max={zshareBalance}
                                symbol="ZShare"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${zshareBalance} ZSHARE Available in Swapper`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
              
                    </StyledCardWrapper>
                  </StyledCardsWrapper>
                </StyledBoardroom>
              </Grid>
            </Box>

            <Box mt={5}>
              <Grid container justify="center">
                <Grid item xs={8}>
                  <Card>
                    <CardContent>
                      <StyledApproveWrapper>
                      {approveStatus !== ApprovalState.APPROVED ? (
                        <Button
                          disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                          color="primary"
                          variant="contained"
                          onClick={approve}
                          size="medium"
                        >
                          Approve TBOND
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => onSwapZShare(tbondAmount.toString())}
                          size="medium"
                        >
                          Swap
                        </Button>
                      )}
                      </StyledApproveWrapper>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledApproveWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
const StyledCardTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  height: 64px;
  justify-content: center;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledDesc = styled.span``;

export default Sbs;
