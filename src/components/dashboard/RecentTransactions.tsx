
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const transactions = [
  {
    id: 1,
    member: "John Kamau",
    type: "deposit",
    amount: "KES 25,000",
    date: "Today, 2:45 PM",
  },
  {
    id: 2,
    member: "Mary Wanjiku",
    type: "withdrawal",
    amount: "KES 15,000",
    date: "Today, 1:30 PM",
  },
  {
    id: 3,
    member: "Peter Njoroge",
    type: "deposit",
    amount: "KES 50,000",
    date: "Today, 11:20 AM",
  },
  {
    id: 4,
    member: "Sarah Muthoni",
    type: "withdrawal",
    amount: "KES 10,000",
    date: "Today, 10:15 AM",
  },
];

export function RecentTransactions() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 animate-fade-in">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-sacco-900">
          Recent Transactions
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-sacco-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-lg ${
                    transaction.type === "deposit"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {transaction.type === "deposit" ? (
                    <ArrowUpRight
                      className="w-4 h-4 text-green-600"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <ArrowDownRight
                      className="w-4 h-4 text-red-600"
                      strokeWidth={2.5}
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sacco-900">
                    {transaction.member}
                  </p>
                  <p className="text-sm text-sacco-500">{transaction.date}</p>
                </div>
              </div>
              <p
                className={`font-medium ${
                  transaction.type === "deposit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "deposit" ? "+" : "-"} {transaction.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
