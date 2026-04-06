import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { TransactionModal } from '../components/transactions/TransactionModal';
import type { Transaction } from '../types';
import { Plus } from 'lucide-react';

export const Transactions = () => {
  const { role } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleEdit = (t: Transaction) => {
    setEditingTransaction(t);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Manage and view your financial activity.</p>
        </div>
        {role === 'ADMIN' && (
          <button 
            onClick={handleAdd}
            className="flex items-center px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Transaction
          </button>
        )}
      </div>

      <TransactionTable onEdit={handleEdit} />
      <TransactionModal isOpen={isModalOpen} onClose={closeModal} transactionToEdit={editingTransaction} />
    </div>
  );
};
