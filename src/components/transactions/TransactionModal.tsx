import { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import type { Transaction, TransactionType } from '../../types';
import { CATEGORIES } from '../../data/mockData';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  transactionToEdit?: Transaction | null;
}

export const TransactionModal: React.FC<Props> = ({ isOpen, onClose, transactionToEdit }) => {
  const { addTransaction, editTransaction } = useFinance();
  const [type, setType] = useState<TransactionType>('EXPENSE');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (transactionToEdit) {
      setType(transactionToEdit.type);
      setAmount(transactionToEdit.amount.toString());
      setDate(transactionToEdit.date);
      setCategory(transactionToEdit.category);
      setDesc(transactionToEdit.description);
    } else {
      setType('EXPENSE');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setCategory(CATEGORIES['EXPENSE'][0]);
      setDesc('');
    }
  }, [transactionToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      amount: parseFloat(amount),
      date,
      category,
      type,
      description: desc
    };
    if (transactionToEdit) {
      editTransaction({ ...transactionToEdit, ...payload });
    } else {
      addTransaction(payload);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl border border-border p-6 relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-6">{transactionToEdit ? 'Edit Transaction' : 'New Transaction'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => { setType('INCOME'); setCategory(CATEGORIES.INCOME[0]); }} className={`py-2 rounded-xl border ${type === 'INCOME' ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent border-border hover:bg-secondary'}`}>Income</button>
              <button type="button" onClick={() => { setType('EXPENSE'); setCategory(CATEGORIES.EXPENSE[0]); }} className={`py-2 rounded-xl border ${type === 'EXPENSE' ? 'bg-destructive text-destructive-foreground border-destructive' : 'bg-transparent border-border hover:bg-secondary'}`}>Expense</button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input type="number" step="0.01" required value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select required value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary">
              {CATEGORIES[type].map(c => <option key={c} value={c} className="bg-background text-foreground">{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input type="text" required value={desc} onChange={e => setDesc(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <button type="submit" className="w-full py-3 mt-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
            {transactionToEdit ? 'Save Changes' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};
