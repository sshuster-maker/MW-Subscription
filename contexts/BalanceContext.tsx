'use client';
import { createContext, useContext, useState } from 'react';

interface BalanceContextType {
  lowBalance: boolean;
  toggleLowBalance: () => void;
}

const BalanceContext = createContext<BalanceContextType>({
  lowBalance: false,
  toggleLowBalance: () => {},
});

export function BalanceProvider({ children }: { children: React.ReactNode }) {
  const [lowBalance, setLowBalance] = useState(false);
  return (
    <BalanceContext.Provider value={{ lowBalance, toggleLowBalance: () => setLowBalance((v) => !v) }}>
      {children}
    </BalanceContext.Provider>
  );
}

export const useBalance = () => useContext(BalanceContext);
