import { useFinance } from '../../context/FinanceContext';
import { Moon, Sun, Shield, ShieldAlert, Bell } from 'lucide-react';

export const Header = () => {
  const { role, setRole, theme, toggleTheme } = useFinance();

  return (
    <header className="h-24 bg-transparent flex items-center justify-between px-6 md:px-10 z-20 mt-4 mb-2">
      <div className="hidden md:block">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Overview ✨</h2>
        <p className="text-sm text-muted-foreground font-medium mt-1 tracking-wide">Here is what's happening with your accounts today.</p>
      </div>

      <div className="flex items-center space-x-4 ml-auto">
        <div className="flex items-center bg-white/10 dark:bg-black/20 backdrop-blur-2xl rounded-full p-1.5 border border-border/50 shadow-inner">
          <button
            onClick={() => setRole('VIEWER')}
            className={`flex items-center px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${role === 'VIEWER' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Shield className="w-4 h-4 mr-2" /> Viewer
          </button>
          <button
            onClick={() => setRole('ADMIN')}
            className={`flex items-center px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${role === 'ADMIN' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <ShieldAlert className="w-4 h-4 mr-2" /> Admin
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 transition-all text-muted-foreground hover:text-foreground border border-white/5 shadow-sm backdrop-blur-md"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 transition-all text-muted-foreground hover:text-foreground border border-white/5 shadow-sm backdrop-blur-md"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
