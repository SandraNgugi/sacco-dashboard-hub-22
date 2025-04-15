
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState, useEffect } from "react";
import { DateRangeFilter } from "@/components/transactions/DateRangeFilter";
import { useTransactionStore, parseTransactionDate } from "@/services/transactionService";

interface RecentTransactionsProps {
  accountNumber: string;
}

export function RecentTransactions({ accountNumber }: RecentTransactionsProps) {
  const [dateRange, setDateRange] = useState<{ start?: Date, end?: Date }>({});
  const { transactions } = useTransactionStore();

  // Get only the current user's transactions
  const currentUserTransactions = transactions.filter(
    transaction => transaction.memberId === accountNumber
  );

  // Filter transactions based on date range
  const filteredTransactions = currentUserTransactions.filter(transaction => {
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
          Your Recent Transactions
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
                      transaction.type === "deposit" || transaction.type === "dividend" || transaction.type === "loan-repayment" 
                        ? "bg-green-100" 
                        : "bg-red-100"
                    }`}
                  >
                    {transaction.type === "deposit" || transaction.type === "dividend" || transaction.type === "loan-repayment" ? (
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
                      {transaction.description}
                    </p>
                    <p className="text-sm text-sacco-500">{transaction.date}, {transaction.time}</p>
                  </div>
                </div>
                <p
                  className={`font-medium ${
                    transaction.type === "deposit" || transaction.type === "dividend" || transaction.type === "loan-repayment"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "deposit" || transaction.type === "dividend" || transaction.type === "loan-repayment" ? "+" : "-"} {transaction.amount}
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
