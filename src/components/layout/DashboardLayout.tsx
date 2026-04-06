import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Overview } from '../../pages/Overview';
import { Transactions } from '../../pages/Transactions';
import { Insights } from '../../pages/Insights';

export const DashboardLayout = () => {
  const [currentPath, setCurrentPath] = useState('overview');

  const renderContent = () => {
    switch (currentPath) {
      case 'overview': return <Overview />;
      case 'transactions': return <Transactions />;
      case 'insights': return <Insights />;
      default: return <div className="p-8 text-center text-muted-foreground mt-20">Page coming soon.</div>;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground relative selection:bg-primary/30 z-0">
      <div className="glow-effect top-left" />
      <div className="glow-effect bottom-right" />
      
      <Sidebar currentPath={currentPath} onNavigate={setCurrentPath} />
      <div className="flex-1 flex flex-col relative w-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 w-full">
          <div className="max-w-6xl mx-auto w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};
