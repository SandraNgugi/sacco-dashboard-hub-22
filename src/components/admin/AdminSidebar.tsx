
import { Shield, Users, Settings, LogOut, PieChart, FileText, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

const adminMenuItems = [
  { icon: Shield, label: "Admin Dashboard", href: "/admin" },
  { icon: Users, label: "Manage Members", href: "/admin/members" },
  { icon: FileText, label: "Manage Transactions", href: "/admin/transactions" },
  { icon: Wallet, label: "Manage Loans", href: "/admin/loans" },
  { icon: PieChart, label: "Reports", href: "/admin/reports" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const location = useLocation();
  
  return (
    <aside className="h-screen w-64 bg-slate-900 text-white border-r border-slate-800 flex flex-col animate-slide-in">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-semibold text-white">Admin Panel</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {adminMenuItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center p-3 rounded-lg transition-colors group",
                    isActive 
                      ? "bg-slate-800 text-white" 
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link 
          to="/"
          className="flex items-center w-full p-3 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Back to Main App</span>
        </Link>
      </div>
    </aside>
  );
}
