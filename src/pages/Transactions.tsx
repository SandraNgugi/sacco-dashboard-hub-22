
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserGreeting } from "@/components/dashboard/UserGreeting";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Button } from "@/components/ui/button";
import { DateRangeFilter } from "@/components/transactions/DateRangeFilter";
import { DepositMoneyDialog } from "@/components/transactions/DepositMoneyDialog";
import { WithdrawMoneyDialog } from "@/components/transactions/WithdrawMoneyDialog";
import { Banknote, Wallet } from "lucide-react";

export default function Transactions() {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <UserGreeting />
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
          
          <QuickStats />
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
              <div className="mt-4 sm:mt-0">
                <DateRangeFilter />
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
