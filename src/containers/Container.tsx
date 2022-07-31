import { Box } from '@mui/material';
import { useAccount } from '../context';
import { Results, Search, Wallet } from './components';
import { useSearch } from './useSearch';

export const NFTContainer = () => {
  const { account } = useAccount();
  const { search, setSearch, searchResults, isLoading } = useSearch(account);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100vh'
      }}
    >
      <Box
        style={{
          display: 'flex',
          width: 'calc(100% - 80px)',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          paddingTop: '40px',
          margin: '0 40px'
        }}
      >
        {account ? <Search search={search} setSearch={setSearch} /> : <div />}
        <Wallet />
      </Box>

      {account && search ? (
        <Box
          style={{
            width: 'calc(100% - 80px)',
            margin: '40px',
            overflow: 'auto',
            background: '#fff',
            borderRadius: '5px',
            boxSizing: 'border-box'
          }}
        >
          <Results result={searchResults} isLoading={isLoading} />
        </Box>
      ) : (
        <div />
      )}
    </Box>
  );
};
