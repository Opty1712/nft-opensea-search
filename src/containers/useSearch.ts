import { useCallback, useEffect, useState } from 'react';
import { getKeys, useSwitcher } from '../utils';
import { APIItem, MetaDataJSON, NFTItem } from './types';

export const useSearch = (account: string | null) => {
  const [search, setSearch] = useState('');
  const { isSwitchedOn, switchOff, switchOn } = useSwitcher();
  const [searchResults, setSearchResults] = useState<Array<NFTItem>>([]);

  const handleFetch = useCallback(async () => {
    switchOn();

    await fetchTokens()
      .then((result) => {
        setSearchResults(extractTokens(result.result));
      })
      .catch((error) => console.error(error))
      .finally(switchOff);
  }, [switchOff, switchOn]);

  useEffect(() => {
    if (!account) {
      return;
    }

    handleFetch();
  }, [search, account, handleFetch]);

  return { search, setSearch, searchResults, isLoading: isSwitchedOn };
};

type APIAnswer = {
  page: number;
  page_size: number;
  result: Array<APIItem>;
  total: number;
};

function fetchTokens<T = APIAnswer>(): Promise<T> {
  return fetch(
    'https://deep-index.moralis.io/api/v2/nft/search?chain=eth&format=decimal&filter=name&q=star',
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key':
          'jbWrgmADlNz72pcGr6o1MUIqakKZUsUrrap4kiliJsYpwIvcZ7J8025hqSZBcgUW'
      }
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as Promise<T>;
  });
}

const checkIsMetaDataExists = (value: unknown): value is MetaDataJSON =>
  Boolean(value) && typeof value === 'object';

const extractTokens = (tokens: Array<APIItem>): Array<NFTItem> => {
  return tokens.map<NFTItem>(({ metadata, token_id, token_uri }) => {
    const metadataJSON = JSON.parse(metadata);
    const token: NFTItem = {
      token_id: token_id,
      token_uri: token_uri,
      id: token_id
    };

    if (checkIsMetaDataExists(metadataJSON)) {
      const keys = getKeys(metadataJSON);
      keys.forEach((item) => {
        const value =
          typeof metadataJSON[item] === 'string'
            ? metadataJSON[item] || ''
            : '';

        token[item] = convertIPFSURL(value);
      });
    }

    return token;
  });
};

const convertIPFSURL = (url: string) => {
  if (url.startsWith('')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }

  return url;
};
