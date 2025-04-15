import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { DateRangeFilter } from "@/components/transactions/DateRangeFilter";
import { useTransactionStore, parseTransactionDate, Transaction } from "@/services/transactionService";

// Helper function to get appropriate icon and color based on transaction type
const getTransactionTypeDetails = (type: Transaction['type']) => {
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

export default function ManageTransactions() {
  const { transactions } = useTransactionStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ start?: Date, end?: Date }>({});
  
  // Get unique members for filtering
  const uniqueMembers = Array.from(
    new Set(transactions.map(t => t.memberId))
  ).map(memberId => {
    const transaction = transactions.find(t => t.memberId === memberId);
    return {
      membershipNumber: memberId,
      name: transaction?.member || ""
    };
  });
  
  // Filter transactions based on search term, member selection, and date range
  const filteredTransactions = transactions.filter(transaction => {
    // Text search filter
    const matchesSearch = 
      (transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      transaction.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getTransactionTypeDetails(transaction.type).label.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Member filter
    const matchesMember = selectedMember ? transaction.memberId === selectedMember : true;
    
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
    
    return matchesSearch && matchesMember && matchesDateRange;
  });

  // Handle date range change
  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setDateRange({ start, end });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedMember(null);
    setDateRange({});
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Manage Transactions</h1>
            <div className="bg-white rounded-full px-4 py-2 text-sm font-medium text-slate-900 border border-slate-200">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1 md:flex-initial">
                <select
                  value={selectedMember || ""}
                  onChange={(e) => setSelectedMember(e.target.value || null)}
                  className="flex h-9 w-full md:w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">All Members</option>
                  {uniqueMembers.map((member) => (
                    <option key={member.membershipNumber} value={member.membershipNumber}>
                      {member.name} ({member.membershipNumber})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 md:flex-initial">
                <DateRangeFilter
                  onDateRangeChange={handleDateRangeChange}
                  onClearFilter={() => setDateRange({})}
                />
              </div>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-medium">Member</TableHead>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Description</TableHead>
                  <TableHead className="font-medium">Reference</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium text-right">Amount</TableHead>
                  <TableHead className="font-medium text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => {
                  const typeDetails = getTransactionTypeDetails(transaction.type);
                  
                  return (
                    <TableRow
                      key={transaction.id}
                      className="hover:bg-slate-50"
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium mr-3">
                            {transaction.member.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.member}</div>
                            <div className="text-xs text-slate-500">{transaction.memberId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full ${typeDetails.bgColor} flex items-center justify-center ${typeDetails.color} font-bold mr-3`}>
                            {typeDetails.icon}
                          </div>
                          <span className="font-medium">{typeDetails.label}</span>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.description || '-'}</TableCell>
                      <TableCell className="text-slate-500 text-sm">{transaction.reference || '-'}</TableCell>
                      <TableCell>
                        <div>{transaction.date}</div>
                        <div className="text-sm text-slate-500">{transaction.time}</div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <span className={
                          transaction.type === "deposit" || transaction.type === "dividend" || transaction.type === "loan-repayment"
                            ? "text-green-600"
                            : "text-red-600"
                        }>
                          {transaction.type === "deposit" || transaction.type === "dividend" || transaction.type === "loan-repayment"
                            ? "+" : "-"} {transaction.amount}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
