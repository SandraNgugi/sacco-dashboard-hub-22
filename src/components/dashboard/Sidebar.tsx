
import { Wallet, Settings, LogOut, FileText, Shield, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { SaccoLogo } from "./SaccoLogo";
import { useLocation, Link } from "react-router-dom";

const menuItems = [
  { icon: FileText, label: "Transactions", href: "/transactions" },
  { icon: Calendar, label: "Loans", href: "/loans" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col animate-slide-in">
      <div className="p-6 border-b border-gray-200">
        <SaccoLogo />
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center p-3 rounded-lg transition-colors group",
                    isActive
                      ? "bg-sacco-50 text-sacco-600" 
                      : "text-sacco-600 hover:bg-sacco-50"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )}
          )}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link to="/admin" className="flex items-center w-full p-3 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors mb-2">
          <Shield className="w-5 h-5 mr-3" />
          <span className="font-medium">Admin Panel</span>
        </Link>
        <button className="flex items-center w-full p-3 text-sacco-600 rounded-lg hover:bg-sacco-50 transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
