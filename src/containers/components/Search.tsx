import { Box, TextField } from '@mui/material';
import { ChangeEventHandler, memo, useCallback } from 'react';

type SearchParams = {
  search: string;
  setSearch: (search: string) => void;
};
export const Search = memo<SearchParams>(({ search, setSearch }) => {
  const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setSearch(event.target.value);
    },
    [setSearch]
  );

  return (
    <Box
      style={{
        background: '#fff',
        borderRadius: '5px',
        padding: '20px',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '50%'
      }}
    >
      <TextField
        onChange={handleSearch}
        value={search}
        placeholder="Search for NFT"
        fullWidth={true}
      />
    </Box>
  );
});
Search.displayName = nameof(Search);
