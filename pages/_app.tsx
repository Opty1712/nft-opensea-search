import { AppProps } from 'next/app';
import Head from 'next/head';
import '../src/global.css';

const NFTApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>NFT app</title>
        <style jsx global>{`
          body {
            padding: 0;
            margin: 0;
            height: 100%;
          }
        `}</style>
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default NFTApp;
