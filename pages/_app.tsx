import { AppProps } from 'next/app';
import Head from 'next/head';
import '../src/global.css';

const NFTApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>NFT app</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default NFTApp;
