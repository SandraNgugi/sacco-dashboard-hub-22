
import { Home, Wallet, ChartBar, Settings, LogOut, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: FileText, label: "Transactions", href: "/transactions" },
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Wallet, label: "Loans", href: "/loans" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col animate-slide-in">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-sacco-900">Sacco Hub</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="flex items-center p-3 text-sacco-600 rounded-lg hover:bg-sacco-50 transition-colors group"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full p-3 text-sacco-600 rounded-lg hover:bg-sacco-50 transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
