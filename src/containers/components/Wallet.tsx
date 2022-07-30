import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import PixIcon from '@mui/icons-material/Pix';
import { Box, Button } from '@mui/material';
import { memo } from 'react';
import { formatAddress } from '../../utils';
import { useWallet } from './useWallet';

export const Wallet = memo(() => {
  const { connectWallet, account, disconnectWallet, balance } = useWallet();

  return (
    <Box
      style={{
        position: 'absolute',
        right: '20px',
        top: '20px',
        width: 'calc(100% - 60px)',
        textAlign: 'right'
      }}
    >
      {account ? (
        <Box style={{ display: 'inline-block' }}>
          <Button
            startIcon={<LogoutIcon />}
            onClick={disconnectWallet}
            variant="contained"
          >
            Disconnect {formatAddress(account)}
          </Button>

          <Box
            style={{
              background: '#fff',
              borderRadius: '5px',
              padding: '10px 13px',
              boxSizing: 'border-box',
              width: '100%',
              marginTop: '20px',
              textAlign: 'left'
            }}
          >
            {Object.entries(balance || []).map(([key, value]) => (
              <div key={key}>
                <PixIcon
                  style={{
                    width: '20px',
                    position: 'relative',
                    top: '5px',
                    color: '#1976d2'
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
          startIcon={<AccountBalanceWalletIcon />}
        >
          Connect Wallet
        </Button>
      )}
    </Box>
  );
});
Wallet.displayName = nameof(Wallet);
