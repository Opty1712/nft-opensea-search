import { createContext, memo, ReactNode, useContext, useState } from 'react';

export type AppState = {
  account: null | string;
  setAccount: (account: AppState['account']) => void;
};

const initialValue: AppState = {
  account: null,
  setAccount: () => void 0
};

const AccountContext = createContext<AppState>(initialValue);

type AppInfoProviderProps = {
  children: ReactNode;
};

export const AccountProvider = memo<AppInfoProviderProps>(({ children }) => {
  const [account, setAccount] = useState<AppState['account']>(null);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount
      }}
    >
      {children}
    </AccountContext.Provider>
  );
});
AccountProvider.displayName = nameof(AccountProvider);

export const useAccount = () => useContext(AccountContext);
