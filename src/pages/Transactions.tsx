
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserGreeting } from "@/components/dashboard/UserGreeting";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Button } from "@/components/ui/button";
import { DateRangeFilter } from "@/components/transactions/DateRangeFilter";
import { DepositMoneyDialog } from "@/components/transactions/DepositMoneyDialog";
import { WithdrawMoneyDialog } from "@/components/transactions/WithdrawMoneyDialog";
import { Banknote, Wallet, Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function Transactions() {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ start?: Date, end?: Date }>({});

  // Mock account number - would come from user profile or auth context in real app
  const accountNumber = "SCO-1234-5678-9012";
  
  // Handle date range change
  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setDateRange({ start, end });
  };
  
  // Copy account number to clipboard
  const copyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber);
    toast.success("Account number copied to clipboard");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <UserGreeting userName="John Doe" />
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button onClick={() => setIsDepositOpen(true)} className="gap-2">
                <Banknote className="h-4 w-4" />
                Deposit
              </Button>
              <Button onClick={() => setIsWithdrawOpen(true)} variant="outline" className="gap-2">
                <Wallet className="h-4 w-4" />
                Withdraw
              </Button>
            </div>
          </div>
          
          <Card className="mb-6 bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="text-lg font-medium">{accountNumber}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2" 
                  onClick={copyAccountNumber}
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <QuickStats />
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
              <div className="mt-4 sm:mt-0">
                <DateRangeFilter 
                  onDateRangeChange={handleDateRangeChange} 
                  onClearFilter={() => setDateRange({})}
                />
              </div>
            </div>
            <RecentTransactions />
          </div>
        </div>
      </main>

      <DepositMoneyDialog isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
      <WithdrawMoneyDialog isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} />
    </div>
  );
}
