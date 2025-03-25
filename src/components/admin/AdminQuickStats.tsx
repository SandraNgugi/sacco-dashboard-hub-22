
import { Users, CreditCard, BadgeDollarSign, TrendingUp } from "lucide-react";

const adminStats = [
  {
    label: "Total Members",
    value: "2,543",
    icon: Users,
    trend: "+5.2%",
    trendType: "positive",
  },
  {
    label: "Loan Applications",
    value: "156",
    icon: CreditCard,
    trend: "+12.5%",
    trendType: "positive",
  },
  {
    label: "Revenue",
    value: "KES 2.4M",
    icon: BadgeDollarSign,
    trend: "+8.7%",
    trendType: "positive",
  },
  {
    label: "Growth Rate",
    value: "15.3%",
    icon: TrendingUp,
    trend: "+2.4%",
    trendType: "positive",
  },
];

export function AdminQuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      {adminStats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-semibold text-slate-900 mt-2">
                {stat.value}
              </h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <stat.icon className="w-6 h-6 text-blue-600" />
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
            <span className="text-sm text-slate-500 ml-2">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
