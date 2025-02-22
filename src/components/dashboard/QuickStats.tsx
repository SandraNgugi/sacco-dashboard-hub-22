
import { Wallet, Users, TrendingUp, PiggyBank } from "lucide-react";

const stats = [
  {
    label: "Total Savings",
    value: "KES 12.5M",
    icon: Wallet,
    trend: "+12.5%",
    trendType: "positive",
  },
  {
    label: "Active Members",
    value: "2,345",
    icon: Users,
    trend: "+3.2%",
    trendType: "positive",
  },
  {
    label: "Total Loans",
    value: "KES 8.3M",
    icon: TrendingUp,
    trend: "+5.4%",
    trendType: "positive",
  },
  {
    label: "Available Funds",
    value: "KES 4.2M",
    icon: PiggyBank,
    trend: "+2.1%",
    trendType: "positive",
  },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-6 rounded-xl border border-gray-200 hover:border-sacco-300 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-sacco-500">{stat.label}</p>
              <h3 className="text-2xl font-semibold text-sacco-900 mt-2">
                {stat.value}
              </h3>
            </div>
            <div className="p-2 bg-sacco-50 rounded-lg">
              <stat.icon className="w-6 h-6 text-sacco-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span
              className={`text-sm font-medium ${
                stat.trendType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.trend}
            </span>
            <span className="text-sm text-sacco-500 ml-2">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
