import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
import CashImage from '../../assets/img/crypto_tomb_cash.svg';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useZombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usezShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { zomb as zombTesting, zShare as zShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { zomb as zombProd, zShare as zShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';

import MetamaskFox from '../../assets/img/metamask-fox.svg';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useZombFinance from '../../hooks/useTombFinance';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const zombFtmLpStats = useLpStats('ZOMB-ZSP-LP');
  const zShareFtmLpStats = useLpStats('ZSHARE-ZSP-LP');
  const zombStats = useZombStats();
  const zShareStats = usezShareStats();
  const tBondStats = useBondStats();
  const zombFinance = useZombFinance();

  let zomb;
  let zShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    zomb = zombTesting;
    zShare = zShareTesting;
  } else {
    zomb = zombProd;
    zShare = zShareProd;
  }

  const buyZombAddress = 'https://spookyswap.finance/swap?outputCurrency=' + zomb.address;
  const buyZShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + zShare.address;

  const zombLPStats = useMemo(() => (zombFtmLpStats ? zombFtmLpStats : null), [zombFtmLpStats]);
  const zshareLPStats = useMemo(() => (zShareFtmLpStats ? zShareFtmLpStats : null), [zShareFtmLpStats]);
  const zombPriceInDollars = useMemo(
    () => (zombStats ? Number(zombStats.priceInDollars).toFixed(2) : null),
    [zombStats],
  );
  const zombPriceInZSP = useMemo(() => (zombStats ? Number(zombStats.tokenInFtm).toFixed(4) : null), [zombStats]);
  const zombCirculatingSupply = useMemo(() => (zombStats ? String(zombStats.circulatingSupply) : null), [zombStats]);
  const zombTotalSupply = useMemo(() => (zombStats ? String(zombStats.totalSupply) : null), [zombStats]);

  const zSharePriceInDollars = useMemo(
    () => (zShareStats ? Number(zShareStats.priceInDollars).toFixed(2) : null),
    [zShareStats],
  );
  const zSharePriceInZSP = useMemo(
    () => (zShareStats ? Number(zShareStats.tokenInFtm).toFixed(4) : null),
    [zShareStats],
  );
  const zShareCirculatingSupply = useMemo(
    () => (zShareStats ? String(zShareStats.circulatingSupply) : null),
    [zShareStats],
  );
  const zShareTotalSupply = useMemo(() => (zShareStats ? String(zShareStats.totalSupply) : null), [zShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInZSP = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const zombLpZap = useZap({ depositTokenName: 'ZOMB-ZSP-LP' });
  const zshareLpZap = useZap({ depositTokenName: 'ZSHARE-ZSP-LP' });

  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
  `;

  const [onPresentZombZap, onDissmissZombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        zombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissZombZap();
      }}
      tokenName={'ZOMB-ZSP-LP'}
    />,
  );

  const [onPresentZshareZap, onDissmissZshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        zshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissZshareZap();
      }}
      tokenName={'ZSHARE-ZSP-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid container item xs={12} sm={4} justify="center">
          {/* <Paper>xs=6 sm=3</Paper> */}
          <Image color="none" style={{ width: '300px', paddingTop: '0px' }} src={CashImage} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4}>
              <h2>Welcome to Zomb Finance</h2>
              <p>The first algorithmic stablecoin on Fantom Opera, pegged to the price of 1 ZSP via seigniorage.</p>
              <p>
                Stake your ZOMB-ZSP LP in the Cemetery to earn ZSHARE rewards.
                Then stake your earned ZSHARE in the Masonry to earn more ZOMB!
              </p>
            </Box>
          </Paper>



        </Grid>

        <Grid container spacing={3}>
    <Grid item  xs={12} sm={12} justify="center"  style={{ margin: '12px' }}>
            <Alert variant="filled" severity="warning">
              <b>ZOMB is not a taxed token, which means you will not pay a service fee when selling ZOMB.
      Please visit our <StyledLink target="_blank" href="https://docs.zomb.finance">documentation</StyledLink> before purchasing ZOMB or ZSHARE!</b>
            </Alert>
        </Grid>
        </Grid>

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2.5%' }}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button color="primary" href="/masonry" variant="contained" style={{ marginRight: '10px' }}>
                Stake Now
              </Button>
              <Button href="/cemetery" variant="contained" style={{ marginRight: '10px' }}>
                Farm Now
              </Button>
              <Button
                color="primary"
                target="_blank"
                href={buyZombAddress}
                variant="contained"
                style={{ marginRight: '10px' }}
                className={classes.button}
              >
                Buy ZOMB
              </Button>
              <Button variant="contained" target="_blank" href={buyZShareAddress} className={classes.button}>
                Buy ZSHARE
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* ZOMB */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>ZOMB</h2>
              <Button
                onClick={() => {
                  zombFinance.watchAssetInMetamask('ZOMB');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="ZOMB" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{zombPriceInZSP ? zombPriceInZSP : '-.----'} ZSP</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${zombPriceInDollars ? zombPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(zombCirculatingSupply * zombPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {zombCirculatingSupply} <br />
                Total Supply: {zombTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* ZSHARE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>ZSHARE</h2>
              <Button
                onClick={() => {
                  zombFinance.watchAssetInMetamask('ZSHARE');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="ZSHARE" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{zSharePriceInZSP ? zSharePriceInZSP : '-.----'} ZSP</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${zSharePriceInDollars ? zSharePriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(zShareCirculatingSupply * zSharePriceInDollars).toFixed(2)} <br />
                Circulating Supply: {zShareCirculatingSupply} <br />
                Total Supply: {zShareTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TBOND */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>TBOND</h2>
              <Button
                onClick={() => {
                  zombFinance.watchAssetInMetamask('TBOND');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TBOND" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tBondPriceInZSP ? tBondPriceInZSP : '-.----'} ZSP</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tBondCirculatingSupply} <br />
                Total Supply: {tBondTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>ZOMB-ZSP Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="ZOMB-ZSP-LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" disabled={true} onClick={onPresentZombZap} variant="contained">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {zombLPStats?.tokenAmount ? zombLPStats?.tokenAmount : '-.--'} ZOMB /{' '}
                  {zombLPStats?.zspAmount ? zombLPStats?.zspAmount : '-.--'} ZSP
                </span>
              </Box>
              <Box>${zombLPStats?.priceOfOne ? zombLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${zombLPStats?.totalLiquidity ? zombLPStats.totalLiquidity : '-.--'} <br />
                Total supply: {zombLPStats?.totalSupply ? zombLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>ZSHARE-ZSP Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="ZSHARE-ZSP-LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" onClick={onPresentZshareZap} variant="contained">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {zshareLPStats?.tokenAmount ? zshareLPStats?.tokenAmount : '-.--'} ZSHARE /{' '}
                  {zshareLPStats?.zspAmount ? zshareLPStats?.zspAmount : '-.--'} ZSP
                </span>
              </Box>
              <Box>${zshareLPStats?.priceOfOne ? zshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${zshareLPStats?.totalLiquidity ? zshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {zshareLPStats?.totalSupply ? zshareLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
