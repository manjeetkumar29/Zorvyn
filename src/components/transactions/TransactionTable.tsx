import { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import type { Transaction } from '../../types';
import { CATEGORIES } from '../../data/mockData';
import { Edit2, Trash2, ArrowUpDown, Filter } from 'lucide-react';

export const TransactionTable: React.FC<{ onEdit: (t: Transaction) => void }> = ({ onEdit }) => {
  const { transactions, role, deleteTransaction } = useFinance();
  const [filterType, setFilterType] = useState('ALL');
  const [filterCat, setFilterCat] = useState('ALL');
  const [sortOrder, setSortOrder] = useState<'desc'|'asc'>('desc');

  const filteredData = useMemo(() => {
    let data = [...transactions];
    if (filterType !== 'ALL') data = data.filter(t => t.type === filterType);
    if (filterCat !== 'ALL') data = data.filter(t => t.category === filterCat);
    data.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    return data;
  }, [transactions, filterType, filterCat, sortOrder]);

  return (
    <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border-white/5 relative z-10 w-full mb-6">
      <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/5 dark:bg-white/5 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-transparent border border-input rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="ALL" className="bg-background text-foreground">All Types</option>
            <option value="INCOME" className="bg-background text-foreground">Income</option>
            <option value="EXPENSE" className="bg-background text-foreground">Expense</option>
          </select>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="bg-transparent border border-input rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="ALL" className="bg-background text-foreground">All Categories</option>
            {[...CATEGORIES.INCOME, ...CATEGORIES.EXPENSE].map(c => <option key={c} value={c} className="bg-background text-foreground">{c}</option>)}
          </select>
        </div>
        <button onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
          <span>Sort by Date</span>
          <ArrowUpDown className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/10 dark:bg-black/20 text-muted-foreground text-sm font-semibold uppercase tracking-widest text-xs">
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Amount</th>
              {role === 'ADMIN' && <th className="p-4 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">No transactions found.</td>
              </tr>
            ) : filteredData.map((t) => (
              <tr key={t.id} className="border-t border-border hover:bg-secondary/10 transition-colors">
                <td className="p-4 whitespace-nowrap text-sm text-muted-foreground">{t.date}</td>
                <td className="p-4"><span className="font-medium text-foreground">{t.description}</span></td>
                <td className="p-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">{t.category}</span></td>
                <td className="p-4">
                  <span className={`font-semibold ${t.type === 'INCOME' ? 'text-emerald-500' : 'text-foreground'}`}>
                    {t.type === 'INCOME' ? '+' : '-'}${t.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </span>
                </td>
                {role === 'ADMIN' && (
                  <td className="p-4 text-right whitespace-nowrap">
                    <button onClick={() => onEdit(t)} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => deleteTransaction(t.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
