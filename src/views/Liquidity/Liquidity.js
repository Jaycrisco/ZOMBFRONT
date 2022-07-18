import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/home.png';
import useLpStats from '../../hooks/useLpStats';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import useZombStats from '../../hooks/useZombStats';
import TokenInput from '../../components/TokenInput';
import useZombFinance from '../../hooks/useZombFinance';
import { useWallet } from 'use-wallet';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';
import useApproveTaxOffice from '../../hooks/useApproveTaxOffice';
import { ApprovalState } from '../../hooks/useApprove';
import useProvideZombFtmLP from '../../hooks/useProvideZombFtmLP';
import { Alert } from '@material-ui/lab';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const ProvideLiquidity = () => {
  const [zombAmount, setZombAmount] = useState(0);
  const [ftmAmount, setFtmAmount] = useState(0);
  const [lpTokensAmount, setLpTokensAmount] = useState(0);
  const { balance } = useWallet();
  const zombStats = useZombStats();
  const zombFinance = useZombFinance();
  const [approveTaxOfficeStatus, approveTaxOffice] = useApproveTaxOffice();
  const zombBalance = useTokenBalance(zombFinance.ZOMB);
  const ftmBalance = (balance / 1e18).toFixed(4);
  const { onProvideZombFtmLP } = useProvideZombFtmLP();
  const zombFtmLpStats = useLpStats('ZOMB-ZSP-LP');

  const zombLPStats = useMemo(() => (zombFtmLpStats ? zombFtmLpStats : null), [zombFtmLpStats]);
  const zombPriceInZSP = useMemo(() => (zombStats ? Number(zombStats.tokenInFtm).toFixed(2) : null), [zombStats]);
  const ftmPriceInZOMB = useMemo(() => (zombStats ? Number(1 / zombStats.tokenInFtm).toFixed(2) : null), [zombStats]);
  // const classes = useStyles();

  const handleZombChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setZombAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setZombAmount(e.currentTarget.value);
    const quoteFromSpooky = await zombFinance.quoteFromSpooky(e.currentTarget.value, 'ZOMB');
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / zombLPStats.ftmAmount);
  };

  const handleFtmChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setFtmAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setFtmAmount(e.currentTarget.value);
    const quoteFromSpooky = await zombFinance.quoteFromSpooky(e.currentTarget.value, 'ZSP');
    setZombAmount(quoteFromSpooky);

    setLpTokensAmount(quoteFromSpooky / zombLPStats.tokenAmount);
  };
  const handleZombSelectMax = async () => {
    const quoteFromSpooky = await zombFinance.quoteFromSpooky(getDisplayBalance(zombBalance), 'ZOMB');
    setZombAmount(getDisplayBalance(zombBalance));
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / zombLPStats.ftmAmount);
  };
  const handleFtmSelectMax = async () => {
    const quoteFromSpooky = await zombFinance.quoteFromSpooky(ftmBalance, 'ZSP');
    setFtmAmount(ftmBalance);
    setZombAmount(quoteFromSpooky);
    setLpTokensAmount(ftmBalance / zombLPStats.ftmAmount);
  };
  return (
    <Page>
      <BackgroundImage />
      <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
        Provide Liquidity
      </Typography>

      <Grid container justify="center">
        <Box style={{ width: '600px' }}>
          <Alert variant="filled" severity="warning" style={{ marginBottom: '10px' }}>
            <b>This and <a href="https://spookyswap.finance/"  rel="noopener noreferrer" target="_blank">Spookyswap</a> are the only ways to provide Liquidity on ZOMB-ZSP pair without paying tax.</b>
          </Alert>
          <Grid item xs={12} sm={12}>
            <Paper>
              <Box mt={4}>
                <Grid item xs={12} sm={12} style={{ borderRadius: 15 }}>
                  <Box p={4}>
                    <Grid container>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleZombSelectMax}
                          onChange={handleZombChange}
                          value={zombAmount}
                          max={getDisplayBalance(zombBalance)}
                          symbol={'ZOMB'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleFtmSelectMax}
                          onChange={handleFtmChange}
                          value={ftmAmount}
                          max={ftmBalance}
                          symbol={'ZSP'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <p>1 ZOMB = {zombPriceInZSP} ZSP</p>
                        <p>1 ZSP = {ftmPriceInZOMB} ZOMB</p>
                        <p>LP tokens ≈ {lpTokensAmount.toFixed(2)}</p>
                      </Grid>
                      <Grid xs={12} justifyContent="center" style={{ textAlign: 'center' }}>
                        {approveTaxOfficeStatus === ApprovalState.APPROVED ? (
                          <Button
                            variant="contained"
                            onClick={() => onProvideZombFtmLP(ftmAmount.toString(), zombAmount.toString())}
                            color="primary"
                            style={{ margin: '0 10px', color: '#fff' }}
                          >
                            Supply
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => approveTaxOffice()}
                            color="secondary"
                            style={{ margin: '0 10px' }}
                          >
                            Approve
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Grid>
    </Page>
  );
};

export default ProvideLiquidity;
