import { AppProps } from 'next/app';
import Head from 'next/head';
import { AccountProvider } from '../src/context';
import '../src/global.css';

const NFTApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>NFT app</title>
      </Head>
      <AccountProvider>
        <Component {...pageProps} />
      </AccountProvider>
    </>
  );
};

export default NFTApp;
