import { css } from '@emotion/css';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { memo, ReactNode } from 'react';
import { NFTItem } from '../../types';

type ResultsProps = {
  result: Array<NFTItem>;
  isLoading: boolean;
};

export const Results = memo<ResultsProps>(({ result, isLoading }) => {
  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" color="#1976d2">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box style={{ padding: '20px' }}>
      <Typography variant="h4" color="#1976d2">
        Search results
      </Typography>
      <DataGrid
        rows={result}
        columns={columns}
        pageSize={100}
        autoHeight
        getRowHeight={() => 'auto'}
      />
    </Box>
  );
});
Results.displayName = nameof(Results);

const renderImage: (params: GridRenderCellParams) => ReactNode = (params) => {
  const value = params?.value;

  return value ? <img src={value} height="100px" /> : null;
};

const renderDescription: (params: GridRenderCellParams) => ReactNode = (
  params
) => {
  const name = params?.row.name || '';
  const description = params?.row.description || '';

  return (
    <div>
      <b>{name}</b>
      <br />
      <br />
      {description}
    </div>
  );
};

const headerStyle = css`
  color: rebeccapurple;
  background-color: #1976d2;
  color: #fff;
  text-transform: uppercase;
`;

const columns: GridColDef[] = [
  {
    field: 'token_id',
    headerName: 'ID',
    minWidth: 100,
    flex: 0.1,
    headerClassName: headerStyle
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 0.8,
    headerClassName: headerStyle,
    renderCell: renderDescription
  },
  {
    field: 'image',
    headerName: 'Image',
    flex: 0.1,
    minWidth: 120,
    headerClassName: headerStyle,
    renderCell: renderImage
  }
];
