import { createContext, useContext, useState, useEffect } from 'react';
import type { Transaction, Role, Theme } from '../types';
import { mockTransactions } from '../data/mockData';

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  theme: Theme;
  setRole: (role: Role) => void;
  toggleTheme: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });
  
  const [role, setRole] = useState<Role>('VIEWER');
  
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    if (role !== 'ADMIN') return;
    const newTransaction = { ...t, id: Math.random().toString(36).substr(2, 9) };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const editTransaction = (t: Transaction) => {
    if (role !== 'ADMIN') return;
    setTransactions(prev => prev.map(tr => tr.id === t.id ? t : tr));
  };

  const deleteTransaction = (id: string) => {
    if (role !== 'ADMIN') return;
    setTransactions(prev => prev.filter(tr => tr.id !== id));
  };

  return (
    <FinanceContext.Provider value={{
      transactions, role, setRole, theme, toggleTheme,
      addTransaction, editTransaction, deleteTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within FinanceProvider');
  return context;
};
