
import { Wallet, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useTransactionStore } from "@/services/transactionService";

interface QuickStatsProps {
  accountNumber: string;
}

export function QuickStats({ accountNumber }: QuickStatsProps) {
  const [balance, setBalance] = useState("0");
  const { transactions } = useTransactionStore();
  
  useEffect(() => {
    if (accountNumber) {
      calculateBalance();
    }
  }, [accountNumber, transactions]);
  
  // Calculate balance from transactions
  const calculateBalance = () => {
    const userTransactions = transactions.filter(
      transaction => transaction.memberId === accountNumber
    );
    
    let totalBalance = 0;
    
    userTransactions.forEach(transaction => {
      const amountStr = transaction.amount.replace(/[^0-9.-]+/g, "");
      const amount = parseFloat(amountStr);
      
      if (!isNaN(amount)) {
        if (transaction.type === "deposit" || transaction.type === "dividend" || transaction.type === "loan-repayment") {
          totalBalance += amount;
        } else {
          totalBalance -= amount;
        }
      }
    });
    
    // Format with thousands separator
    setBalance(totalBalance.toLocaleString('en-KE'));
  };

  const stats = [
    {
      label: "Account Balance",
      value: `KES ${balance}`,
      icon: Wallet,
      trend: "+12.5%",
      trendType: "positive",
    },
    {
      label: "Total Loans",
      value: "KES 123,000",
      icon: TrendingUp,
      trend: "-5.4%",
      trendType: "negative",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
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
