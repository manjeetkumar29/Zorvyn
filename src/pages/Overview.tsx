import { SummaryCards } from '../components/dashboard/SummaryCards';
import { BalanceChart } from '../components/dashboard/BalanceChart';
import { ExpenseChart } from '../components/dashboard/ExpenseChart';

export const Overview = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Your financial summary at a glance.</p>
      </div>
      
      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceChart />
        <ExpenseChart />
      </div>
    </div>
  );
};
