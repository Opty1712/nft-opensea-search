import { memo } from 'react';
import { formatAddress } from '../../utils';
import { useWallet } from './useWallet';

export const Wallet = memo(() => {
  const { connectWallet, account, disconnectWallet, balance } = useWallet();

  return (
    <div>
      {account ? (
        <>
          <button onClick={disconnectWallet}>
            disconnect {formatAddress(account)}
          </button>

          {Object.entries(balance || []).map(([key, value]) => (
            <div key={key}>
              <b>{key}</b>: {value}
            </div>
          ))}
        </>
      ) : (
        <button onClick={connectWallet}>connect</button>
      )}
    </div>
  );
});
Wallet.displayName = nameof(Wallet);
