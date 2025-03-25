
import { Wallet, Settings, LogOut, FileText, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: FileText, label: "Transactions", href: "/transactions" },
  { icon: Wallet, label: "Loans", href: "/loans" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col animate-slide-in">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-sacco-900">Member Portal</h2>
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
        <a href="/admin" className="flex items-center w-full p-3 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors mb-2">
          <Shield className="w-5 h-5 mr-3" />
          <span className="font-medium">Admin Panel</span>
        </a>
        <button className="flex items-center w-full p-3 text-sacco-600 rounded-lg hover:bg-sacco-50 transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
