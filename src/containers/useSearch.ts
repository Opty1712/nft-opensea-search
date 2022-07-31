import { useCallback, useEffect, useState } from 'react';
import { getKeys, useSwitcher } from '../utils';
import { APIItem, MetaDataJSON, NFTItem } from './types';

export const useSearch = (account: string | null) => {
  const [search, setSearch] = useState('');

  const [fromDate, setFromDate] = useState<Date>(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);

    return date;
  });

  const [toDate, setToDate] = useState<Date>(new Date());
  const { isSwitchedOn, switchOff, switchOn } = useSwitcher();
  const [searchResults, setSearchResults] = useState<Array<NFTItem>>([]);

  const handleFetch = useCallback(async () => {
    if (search.length < 3) {
      return;
    }

    switchOn();

    fetchTokens({
      q: search,
      from_date: fromDate.toISOString(),
      to_date: toDate.toISOString()
    })
      .then((result) => {
        setSearchResults(extractTokens(result.result));
      })
      .catch((error) => console.error(error))
      .finally(switchOff);
  }, [fromDate, search, switchOff, switchOn, toDate]);

  useEffect(() => {
    if (!account) {
      return;
    }

    handleFetch();
  }, [search, account, handleFetch]);

  return {
    search,
    setSearch,
    searchResults,
    isLoading: isSwitchedOn,
    fromDate,
    toDate,
    setFromDate,
    setToDate
  };
};

type APIAnswer = {
  page: number;
  page_size: number;
  result: Array<APIItem>;
  total: number;
};

type FetchTokensParams = {
  q: string;
  from_date?: string;
  to_date?: string;
};
async function fetchTokens<T = APIAnswer>(
  params: FetchTokensParams
): Promise<T> {
  const response = await fetch(
    `https://deep-index.moralis.io/api/v2/nft/search?chain=eth&format=decimal&filter=name&${buildQuery(
      params
    )}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key':
          'jbWrgmADlNz72pcGr6o1MUIqakKZUsUrrap4kiliJsYpwIvcZ7J8025hqSZBcgUW'
      }
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await (response.json() as Promise<T>);
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

        token[item] = convertIPFSToURL(value);
      });
    }

    return token;
  });
};

const convertIPFSToURL = (url: string) => {
  if (url.startsWith('')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }

  return url;
};

const buildQuery = (args: FetchTokensParams): string => {
  const queryArray = getKeys(args).reduce<Array<string | number>>(
    (accumulator, key) => {
      const value = args[key];

      if (typeof value === 'string' || typeof value === 'number') {
        accumulator.push(`${key}=${value}`);
      }

      return accumulator;
    },
    []
  );

  return queryArray.join('&');
};
