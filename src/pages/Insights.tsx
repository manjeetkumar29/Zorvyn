import { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

export const Insights = () => {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    if (transactions.length === 0) return [];
    
    const results = [];
    
    // Insight 1: Highest Spending Category
    const expenses = transactions.filter(t => t.type === 'EXPENSE');
    if (expenses.length > 0) {
      const grouped = expenses.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);
      const topCat = Object.entries(grouped).sort((a,b) => b[1] - a[1])[0];
      results.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Top Spending Area',
        desc: `Your highest expense category is ${topCat[0]} with a total of $${topCat[1].toLocaleString()}. Consider reviewing these expenses.`
      });
    }

    // Insight 2: Income vs Expense ratio this month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    let monthInc = 0, monthExp = 0;
    transactions.forEach(t => {
      const d = new Date(t.date);
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        if (t.type === 'INCOME') monthInc += t.amount;
        else monthExp += t.amount;
      }
    });

    if (monthInc > 0 || monthExp > 0) {
      if (monthInc > monthExp) {
        results.push({
          type: 'positive',
          icon: TrendingUp,
          title: 'Great Savings Rate',
          desc: `You have saved $${(monthInc - monthExp).toLocaleString()} this month so far. Keep it up!`
        });
      } else {
        results.push({
          type: 'warning',
          icon: Lightbulb,
          title: 'Deficit Alert',
          desc: `Your expenses ($${monthExp}) exceed your income ($${monthInc}) for the current month.`
        });
      }
    }

    return results;
  }, [transactions]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
        <p className="text-muted-foreground">AI-generated observations based on your activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {insights.length === 0 ? (
          <div className="col-span-2 text-center py-16 text-muted-foreground glass-panel rounded-3xl">
            Not enough data to generate insights. Add some transactions first!
          </div>
        ) : (
          insights.map((insight, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl flex items-start space-x-6 hover:-translate-y-1 transition-all duration-300">
              <div className={`p-3 rounded-full ${insight.type === 'positive' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                <insight.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{insight.title}</h3>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{insight.desc}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
