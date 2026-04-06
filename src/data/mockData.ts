import type { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-01', amount: 5000, category: 'Salary', type: 'INCOME', description: 'Monthly Salary' },
  { id: '2', date: '2023-10-02', amount: 1500, category: 'Housing', type: 'EXPENSE', description: 'Rent' },
  { id: '3', date: '2023-10-05', amount: 200, category: 'Utilities', type: 'EXPENSE', description: 'Electric Bill' },
  { id: '4', date: '2023-10-10', amount: 300, category: 'Food', type: 'EXPENSE', description: 'Groceries' },
  { id: '5', date: '2023-10-15', amount: 100, category: 'Entertainment', type: 'EXPENSE', description: 'Movies' },
  { id: '6', date: '2023-11-01', amount: 5000, category: 'Salary', type: 'INCOME', description: 'Monthly Salary' },
  { id: '7', date: '2023-11-03', amount: 1550, category: 'Housing', type: 'EXPENSE', description: 'Rent + Water' },
  { id: '8', date: '2023-11-08', amount: 400, category: 'Food', type: 'EXPENSE', description: 'Groceries' },
  { id: '9', date: '2023-11-12', amount: 250, category: 'Shopping', type: 'EXPENSE', description: 'New Shoes' },
  { id: '10', date: '2023-11-20', amount: 150, category: 'Entertainment', type: 'EXPENSE', description: 'Concert Ticket' },
];

export const CATEGORIES = {
  INCOME: ['Salary', 'Freelance', 'Investments', 'Other'],
  EXPENSE: ['Housing', 'Food', 'Utilities', 'Transportation', 'Entertainment', 'Shopping', 'Healthcare', 'Other']
};
