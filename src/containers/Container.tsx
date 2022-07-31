import { css } from '@emotion/css';
import { Box } from '@mui/material';
import { useAccount } from '../context';
import { Results, Search, Wallet } from './components';
import { useSearch } from './useSearch';

export const NFTContainer = () => {
  const { account } = useAccount();
  const {
    search,
    setSearch,
    searchResults,
    isLoading,
    fromDate,
    setFromDate,
    setToDate,
    toDate
  } = useSearch(account);

  return (
    <Box className={rootStyle}>
      <Box className={headerStyle}>
        {account ? (
          <Search
            search={search}
            setSearch={setSearch}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        ) : (
          <div />
        )}
        <Wallet />
      </Box>

      {account && search.length > 2 ? (
        <Box className={resultStyle}>
          <Results result={searchResults} isLoading={isLoading} />
        </Box>
      ) : (
        <div />
      )}
    </Box>
  );
};

const headerStyle = css`
  display: flex;
  width: calc(100% - 80px);
  justify-content: space-between;
  align-items: stretch;
  padding-top: 40px;
  margin: 0 40px;

  @media (max-width: 600px) {
    display: block;
  }
`;

const rootStyle = css`
  display: flex;
  flex-direction: column;
  max-height: 100vh;

  @media (max-width: 600px) {
    max-height: inherit;
  }
`;

const resultStyle = css`
  width: calc(100% - 80px);
  margin: 40px;
  overflow: auto;
  background: #fff;
  border-radius: 5px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    overflow: inherit;
  }
`;
