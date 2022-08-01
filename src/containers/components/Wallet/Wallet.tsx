import { css } from '@emotion/css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import PixIcon from '@mui/icons-material/Pix';
import { Box, Button } from '@mui/material';
import { memo } from 'react';
import { formatAddress } from '../../../utils';
import { useWallet } from './useWallet';

export const Wallet = memo(() => {
  const { connectWallet, account, disconnectWallet, balance } = useWallet();

  return (
    <>
      {account ? (
        <Box className={walletStyle}>
          <Box
            style={{
              background: '#fff',
              borderRadius: '5px',
              boxSizing: 'border-box',
              width: '100%',
              textAlign: 'left'
            }}
          >
            <Button
              startIcon={<LogoutIcon />}
              onClick={disconnectWallet}
              variant="contained"
              className={buttonStyle}
              size="large"
            >
              Disconnect {formatAddress(account)}
            </Button>
            {Object.entries(balance || {}).map(([key, value]) => (
              <div
                key={key}
                style={{
                  padding: '15px 20px'
                }}
              >
                <PixIcon
                  style={{
                    width: '20px',
                    position: 'relative',
                    top: '5px',
                    color: '#1976d2',
                    marginRight: '5px'
                  }}
                />
                <b>{key}</b>: {value}
              </div>
            ))}
          </Box>
        </Box>
      ) : (
        <Button
          onClick={connectWallet}
          variant="contained"
          size="large"
          className={buttonStyle}
          startIcon={<AccountBalanceWalletIcon />}
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
});
Wallet.displayName = nameof(Wallet);

const walletStyle = css`
  display: flex;
  margin-left: 40px;

  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 0px;
    margin-bottom: 40px;
  }
`;

const buttonStyle = css`
  @media (max-width: 600px) {
    width: 100%;
    justify-content: flex-start;
  }
`;
