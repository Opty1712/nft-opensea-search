import { MetaMaskInpageProvider } from '@metamask/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import { WebsocketProvider } from 'web3-core/types';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import Web3Modal from 'web3modal';
import ERC20ABI from '../../config/ERC20ABI.json';
import { useAccount } from '../../context';
import { bnToDec, decToHexString, getKeys, isClientSide } from '../../utils';

type Web3Provider = WebsocketProvider & MetaMaskInpageProvider;

export const useWallet = () => {
  const { account, setAccount } = useAccount();
  const [provider, setProvider] = useState<null | WebsocketProvider>(null);
  const [web3Modal, setWeb3Modal] = useState<null | Web3Modal>(null);
  const [web3Library, setWeb3Library] = useState<null | Web3>(null);
  const [networkId, setNetworkId] = useState<null | number>(null);
  const [balance, setBalance] = useState<null | Record<TokenKeys, number>>(
    null
  );

  const resetState = useCallback(() => {
    setWeb3Modal(null);
    setWeb3Library(null);
    setAccount(null);
  }, [setAccount]);

  const connectWallet = useCallback(async () => {
    if (!isClientSide) {
      return;
    }

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: 'd86b828f14ed4244b73b1d8a2c3c1848'
        }
      }
    };

    try {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions
      });

      setWeb3Modal(web3Modal);

      const provider = await web3Modal.connect();
      setProvider(provider);

      const web3 = new Web3(provider);
      setWeb3Library(web3);

      const networkId = await web3?.eth.net.getId();
      setNetworkId(networkId || null);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    web3Modal?.clearCachedProvider();
    resetState();
  }, [resetState, web3Modal]);

  const switchNetworkToEthereum = useCallback(async () => {
    try {
      const provider = web3Library?.currentProvider as Web3Provider;

      await provider?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: decToHexString(ethereumNetworkId) }]
      });

      connectWallet();
    } catch (error) {
      console.error(error);
    }
  }, [connectWallet, web3Library?.currentProvider]);

  const getData = useCallback(async () => {
    const accounts = await web3Library?.eth.getAccounts();
    setAccount(accounts?.[0] || null);

    const balance = await getBalance(web3Library, account, tokens);
    setBalance(balance);
  }, [account, setAccount, web3Library]);

  useEffect(() => {
    if (!networkId) {
      return;
    }

    if (networkId === ethereumNetworkId) {
      getData();
    } else {
      switchNetworkToEthereum();
    }
  }, [getData, networkId, switchNetworkToEthereum]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts) {
          setAccount(accounts[0]);
        }
      };

      const handleChainChanged = (hexChainId: string) => {
        setNetworkId(parseInt(hexChainId, 16));
        setTimeout(() => switchNetworkToEthereum);
      };

      provider.on('accountsChanged', handleAccountsChanged as () => void);
      provider.on('chainChanged', handleChainChanged as () => void);
      provider.on('disconnect', resetState);

      return () => {
        provider.removeListener(
          'accountsChanged',
          handleAccountsChanged as () => void
        );
        provider.removeListener(
          'chainChanged',
          handleChainChanged as () => void
        );
        provider.removeListener('disconnect', resetState);
      };
    }
  }, [provider, resetState, setAccount, switchNetworkToEthereum]);

  return { account, connectWallet, disconnectWallet, balance };
};

const ethereumNetworkId = 1;

const tokens = {
  ETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
};

type Tokens = typeof tokens;
type TokenKeys = keyof Tokens;
type TokensBalance = Record<TokenKeys, number>;

const makeContract = (
  web3Library: Web3 | null,
  tokenAddress: string
): Contract | null => {
  if (!web3Library) {
    return null;
  }

  return new web3Library.eth.Contract(ERC20ABI as AbiItem[], tokenAddress);
};

const getBalance = async (
  web3Library: Web3 | null,
  account: string | null,
  tokens: Tokens
): Promise<TokensBalance> => {
  const balanceInitial = { ETH: 0, USDC: 0 };

  if (!web3Library || !account) {
    return balanceInitial;
  }

  const keys = getKeys(tokens);

  const balanceRequests = keys.map(async (item) => {
    const contract = makeContract(web3Library, tokens[item]);
    if (!contract) {
      return null;
    }

    const decimals = await contract.methods.decimals().call();
    const balance = await contract.methods.balanceOf(account).call();

    return bnToDec(balance, decimals);
  });

  const result = await Promise.all(balanceRequests);

  const balance = keys.reduce<TokensBalance>((accumulator, current, index) => {
    accumulator[current] = result[index] || 0;

    return accumulator;
  }, balanceInitial);

  return balance;
};
