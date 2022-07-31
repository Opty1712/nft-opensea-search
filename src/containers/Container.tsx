import { Container } from '@mui/material';
import { useAccount } from '../context';
import { Search, Wallet } from './components';

export const NFTContainer = () => {
  const { account } = useAccount();

  return (
    <Container
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        paddingTop: '20px'
      }}
    >
      {account ? <Search /> : <div />}
      <Wallet />
    </Container>
  );
};
