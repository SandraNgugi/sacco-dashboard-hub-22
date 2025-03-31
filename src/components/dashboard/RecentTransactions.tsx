
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState } from "react";
import { DateRangeFilter } from "@/components/transactions/DateRangeFilter";

const transactions = [
  {
    id: 1,
    member: "John Kamau",
    type: "deposit",
    amount: "KES 25,000",
    date: "May 15, 2024",
    time: "2:45 PM",
  },
  {
    id: 2,
    member: "Mary Wanjiku",
    type: "withdrawal",
    amount: "KES 15,000",
    date: "May 12, 2024",
    time: "1:30 PM",
  },
  {
    id: 3,
    member: "Peter Njoroge",
    type: "deposit",
    amount: "KES 50,000",
    date: "May 10, 2024",
    time: "11:20 AM",
  },
  {
    id: 4,
    member: "Sarah Muthoni",
    type: "withdrawal",
    amount: "KES 10,000",
    date: "May 5, 2024",
    time: "10:15 AM",
  },
];

// Helper to parse date string to Date object
const parseTransactionDate = (dateStr: string): Date => {
  const months: Record<string, number> = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  
  const [month, day, year] = dateStr.split(' ');
  return new Date(parseInt(year), months[month], parseInt(day.replace(',', '')));
};

export function RecentTransactions() {
  const [dateRange, setDateRange] = useState<{ start?: Date, end?: Date }>({});

  // Filter transactions based on date range
  const filteredTransactions = transactions.filter(transaction => {
    // Date range filter
    let matchesDateRange = true;
    if (dateRange.start || dateRange.end) {
      const transactionDate = parseTransactionDate(transaction.date);
      
      if (dateRange.start && dateRange.end) {
        // Include transactions between start and end dates (inclusive)
        matchesDateRange = 
          transactionDate >= dateRange.start && 
          transactionDate <= dateRange.end;
      } else if (dateRange.start) {
        // Include transactions on or after start date
        matchesDateRange = transactionDate >= dateRange.start;
      } else if (dateRange.end) {
        // Include transactions on or before end date
        matchesDateRange = transactionDate <= dateRange.end;
      }
    }
    
    return matchesDateRange;
  });

  // Handle date range change
  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setDateRange({ start, end });
  };

  // Clear date filter
  const clearDateFilter = () => {
    setDateRange({});
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 animate-fade-in">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-sacco-900">
          Recent Transactions
        </h2>
        <DateRangeFilter 
          onDateRangeChange={handleDateRangeChange} 
          onClearFilter={clearDateFilter}
          className="scale-90 origin-right"
        />
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
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
                    <p className="text-sm text-sacco-500">{transaction.date}, {transaction.time}</p>
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
            ))
          ) : (
            <div className="text-center py-6 text-sacco-500">
              No transactions found in the selected date range.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
