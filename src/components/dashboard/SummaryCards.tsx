import { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export const SummaryCards = () => {
  const { transactions } = useFinance();

  const { income, expense, balance } = useMemo(() => {
    let inc = 0, exp = 0;
    transactions.forEach(t => {
      if (t.type === 'INCOME') inc += t.amount;
      else exp += t.amount;
    });
    return { income: inc, expense: exp, balance: inc - exp };
  }, [transactions]);

  const cards = [
    { title: 'Total Balance', amount: balance, icon: Wallet, color: 'text-primary', bg: 'bg-primary/10', glow: 'shadow-primary/10' },
    { title: 'Total Income', amount: income, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/10' },
    { title: 'Total Expenses', amount: expense, icon: TrendingDown, color: 'text-destructive', bg: 'bg-destructive/10', glow: 'shadow-destructive/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
      {cards.map((c, i) => (
        <div key={i} className="glass-panel p-8 rounded-3xl flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group border border-white/5">
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-${c.color.split('-')[1]} opacity-5 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:opacity-10 transition-opacity`} />
          <div className="flex items-center justify-between mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${c.bg} ${c.color} shadow-lg ${c.glow} transition-transform duration-500 group-hover:scale-110`}>
              <c.icon className="w-7 h-7" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase opacity-80">{c.title}</p>
            <h3 className="text-4xl lg:text-5xl font-extrabold mt-2 tracking-tight">${c.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
