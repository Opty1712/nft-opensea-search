import { Box, TextField } from '@mui/material';
import { ChangeEventHandler, memo, useCallback, useState } from 'react';

export const Search = memo(() => {
  const [search, setSearch] = useState('');

  const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setSearch(event.target.value);
    },
    []
  );

  return (
    <Box
      style={{
        background: '#fff',
        borderRadius: '5px',
        padding: '10px 13px',
        boxSizing: 'border-box'
      }}
    >
      <TextField
        onChange={handleSearch}
        value={search}
        placeholder="Search for NFT"
      />
    </Box>
  );
});
Search.displayName = nameof(Search);
