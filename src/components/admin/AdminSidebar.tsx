
import { Shield, Users, Settings, LogOut, PieChart, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const adminMenuItems = [
  { icon: Shield, label: "Admin Dashboard", href: "/admin" },
  { icon: Users, label: "Manage Members", href: "/admin/members" },
  { icon: FileText, label: "Manage Loans", href: "/admin/loans" },
  { icon: PieChart, label: "Reports", href: "/admin/reports" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  return (
    <aside className="h-screen w-64 bg-slate-900 text-white border-r border-slate-800 flex flex-col animate-slide-in">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-semibold text-white">Admin Panel</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {adminMenuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="flex items-center p-3 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors group"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center w-full p-3 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
