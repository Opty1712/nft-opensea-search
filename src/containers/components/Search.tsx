import { css } from '@emotion/css';
import { Box, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ChangeEventHandler, memo, useCallback } from 'react';

type SearchParams = {
  search: string;
  setSearch: (search: string) => void;
  fromDate: Date;
  setFromDate: (fromDate: Date) => void;
  toDate: Date;
  setToDate: (toDate: Date) => void;
};
export const Search = memo<SearchParams>(
  ({ search, setSearch, fromDate, setFromDate, setToDate, toDate }) => {
    const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (event) => {
        setSearch(event.target.value);
      },
      [setSearch]
    );

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box className={searchStyle}>
          <TextField
            label="Name"
            onChange={handleSearch}
            value={search}
            placeholder="Search for NFT"
            fullWidth={true}
            style={{
              marginBottom: '20px'
            }}
          />
          <div style={{ display: ' flex', justifyContent: 'space-between' }}>
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(newValue) => {
                setFromDate(newValue || new Date());
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <div style={{ width: '20px' }} />
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(newValue) => {
                setToDate(newValue || new Date());
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </Box>
      </LocalizationProvider>
    );
  }
);
Search.displayName = nameof(Search);

const searchStyle = css`
  background: #fff;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  max-width: 50%;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: flex-start;
    max-width: 100%;
  }
`;
