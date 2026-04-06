import { LayoutDashboard, Receipt, Settings, PieChart } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const navItems = [
  { name: 'Overview', path: 'overview', icon: LayoutDashboard },
  { name: 'Transactions', path: 'transactions', icon: Receipt },
  { name: 'Insights', path: 'insights', icon: PieChart },
  { name: 'Settings', path: 'settings', icon: Settings },
];

export const Sidebar = ({ currentPath, onNavigate }: SidebarProps) => {
  return (
    <aside className="w-64 glass-panel m-4 rounded-[2rem] flex flex-col transition-colors duration-200 z-20">
      <div className="p-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-accent shadow-lg shadow-primary/20 flex items-center justify-center">
             <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">FinDash</h1>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={cn(
              "w-full flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
              currentPath === item.path
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            )}
          >
            <item.icon className={cn("w-5 h-5 transition-transform duration-300", currentPath !== item.path && "group-hover:scale-110")} />
            <span className="font-semibold tracking-wide">{item.name}</span>
          </button>
        ))}
      </nav>
      <div className="p-6 mt-auto">
        <div className="flex items-center space-x-4 p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-bold shadow-md shadow-primary/20">
            US
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold">User</span>
            <span className="text-xs text-muted-foreground font-medium">My Account</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
