import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Search, Calendar, Download, Upload, SendHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { SendMoneyDialog } from "@/components/transactions/SendMoneyDialog";
import { DepositMoneyDialog } from "@/components/transactions/DepositMoneyDialog";
import { WithdrawMoneyDialog } from "@/components/transactions/WithdrawMoneyDialog";
import { DateRangeFilter } from "@/components/transactions/DateRangeFilter";

// Sample transaction data for demonstration
const transactions = [
  {
    id: 1,
    type: "deposit",
    amount: "KES 25,000",
    date: "May 15, 2024",
    time: "2:45 PM",
    description: "Monthly contribution",
    reference: "SCO001-DEP-12345",
    status: "completed"
  },
  {
    id: 2,
    type: "withdrawal",
    amount: "KES 15,000",
    date: "May 12, 2024",
    time: "1:30 PM",
    description: "Emergency funds",
    reference: "SCO001-WDR-12346",
    status: "completed"
  },
  {
    id: 3,
    type: "loan-repayment",
    amount: "KES 5,000",
    date: "May 10, 2024",
    time: "11:20 AM",
    description: "Loan installment",
    reference: "SCO001-LNR-12347",
    status: "completed"
  },
  {
    id: 4,
    type: "dividend",
    amount: "KES 8,500",
    date: "May 5, 2024",
    time: "10:15 AM",
    description: "Annual dividend payout",
    reference: "SCO001-DIV-12348",
    status: "completed"
  },
  {
    id: 5,
    type: "deposit",
    amount: "KES 10,000",
    date: "May 1, 2024",
    time: "9:30 AM",
    description: "Additional savings",
    reference: "SCO001-DEP-12349",
    status: "completed"
  },
  {
    id: 6,
    type: "fee",
    amount: "KES 500",
    date: "April 30, 2024",
    time: "3:45 PM",
    description: "Transaction fee",
    reference: "SCO001-FEE-12350",
    status: "completed"
  },
];

// Helper function to get appropriate icon and color based on transaction type
const getTransactionTypeDetails = (type: string) => {
  switch (type) {
    case "deposit":
      return { 
        icon: "↑", 
        color: "text-green-600", 
        bgColor: "bg-green-100",
        label: "Deposit"
      };
    case "withdrawal":
      return { 
        icon: "↓", 
        color: "text-red-600", 
        bgColor: "bg-red-100",
        label: "Withdrawal"
      };
    case "loan-repayment":
      return { 
        icon: "↑", 
        color: "text-blue-600", 
        bgColor: "bg-blue-100",
        label: "Loan Repayment"
      };
    case "dividend":
      return { 
        icon: "↑", 
        color: "text-purple-600", 
        bgColor: "bg-purple-100",
        label: "Dividend"
      };
    case "fee":
      return { 
        icon: "↓", 
        color: "text-orange-600", 
        bgColor: "bg-orange-100",
        label: "Fee"
      };
    default:
      return { 
        icon: "•", 
        color: "text-gray-600", 
        bgColor: "bg-gray-100",
        label: "Other"
      };
  }
};

// Helper to parse date string to Date object
const parseTransactionDate = (dateStr: string): Date => {
  const months: Record<string, number> = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  
  const [month, day, year] = dateStr.split(' ');
  return new Date(parseInt(year), months[month], parseInt(day.replace(',', '')));
};

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSendMoneyOpen, setIsSendMoneyOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ start?: Date, end?: Date }>({});
  
  // Filter transactions based on search term and date range
  const filteredTransactions = transactions.filter(transaction => {
    // Text search filter
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getTransactionTypeDetails(transaction.type).label.toLowerCase().includes(searchTerm.toLowerCase());
    
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
    
    return matchesSearch && matchesDateRange;
  });

  // Handle date range change
  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setDateRange({ start, end });
  };

  // Clear date filter
  const clearDateFilter = () => {
    setDateRange({});
  };

  // Calculate summary statistics
  const totalDeposits = filteredTransactions
    .filter(t => t.type === "deposit" || t.type === "dividend")
    .reduce((sum, t) => sum + parseInt(t.amount.replace("KES ", "").replace(",", "")), 0);
  
  const totalWithdrawals = filteredTransactions
    .filter(t => t.type === "withdrawal" || t.type === "fee")
    .reduce((sum, t) => sum + parseInt(t.amount.replace("KES ", "").replace(",", "")), 0);

  const netBalance = totalDeposits - totalWithdrawals;

  return (
    <div className="min-h-screen bg-sacco-50 flex">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-sacco-900">My Transactions</h1>
              <p className="text-sacco-500 mt-1">
                View and manage your recent transactions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="default" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setIsDepositOpen(true)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Deposit Money
              </Button>
              <Button 
                variant="default"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsSendMoneyOpen(true)}
              >
                <SendHorizontal className="w-4 h-4 mr-2" />
                Send Money
              </Button>
              <Button 
                variant="default"
                className="bg-red-600 hover:bg-red-700"
                onClick={() => setIsWithdrawOpen(true)}
              >
                <Download className="w-4 h-4 mr-2" />
                Withdraw Money
              </Button>
              <Button variant="outline" className="border-sacco-200 text-sacco-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-sacco-600">Total Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">KES {totalDeposits.toLocaleString()}</div>
                <p className="text-sm text-sacco-500 mt-1">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-sacco-600">Total Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">KES {totalWithdrawals.toLocaleString()}</div>
                <p className="text-sm text-sacco-500 mt-1">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-sacco-600">Net Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  KES {netBalance.toLocaleString()}
                </div>
                <p className="text-sm text-sacco-500 mt-1">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-sacco-500" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <DateRangeFilter
                  onDateRangeChange={handleDateRangeChange}
                  onClearFilter={clearDateFilter}
                />
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-sacco-50">
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Type</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Description</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Reference</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Date</th>
                    <th className="text-right p-4 text-sm font-medium text-sacco-600">Amount</th>
                    <th className="text-center p-4 text-sm font-medium text-sacco-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => {
                    const typeDetails = getTransactionTypeDetails(transaction.type);
                    
                    return (
                      <tr
                        key={transaction.id}
                        className="border-b border-gray-200 hover:bg-sacco-50 transition-colors cursor-pointer"
                      >
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full ${typeDetails.bgColor} flex items-center justify-center ${typeDetails.color} font-bold mr-3`}>
                              {typeDetails.icon}
                            </div>
                            <span className="font-medium text-sacco-900">{typeDetails.label}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sacco-600">{transaction.description}</td>
                        <td className="p-4 text-sacco-500 text-sm">{transaction.reference}</td>
                        <td className="p-4 text-sacco-600">
                          <div>{transaction.date}</div>
                          <div className="text-sm text-sacco-500">{transaction.time}</div>
                        </td>
                        <td className="p-4 text-right font-medium">
                          <span className={
                            transaction.type === "deposit" || transaction.type === "dividend" || transaction.type === "loan-repayment"
                              ? "text-green-600"
                              : "text-red-600"
                          }>
                            {transaction.type === "deposit" || transaction.type === "dividend" || transaction.type === "loan-repayment"
                              ? "+" : "-"} {transaction.amount}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${transaction.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : transaction.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                            }`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      {/* Dialogs */}
      <SendMoneyDialog 
        isOpen={isSendMoneyOpen} 
        onClose={() => setIsSendMoneyOpen(false)} 
      />
      
      <DepositMoneyDialog 
        isOpen={isDepositOpen} 
        onClose={() => setIsDepositOpen(false)} 
      />
      
      <WithdrawMoneyDialog 
        isOpen={isWithdrawOpen} 
        onClose={() => setIsWithdrawOpen(false)} 
      />
    </div>
  );
};

export default Transactions;
