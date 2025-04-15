
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserGreeting } from "@/components/dashboard/UserGreeting";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Send, Upload, CreditCard } from "lucide-react";
import { SendToMobileDialog } from "@/components/transactions/SendToMobileDialog";
import { SendMoneyDialog } from "@/components/transactions/SendMoneyDialog";
import { DepositMoneyDialog } from "@/components/transactions/DepositMoneyDialog";
import { useTransactionStore, createTransaction } from "@/services/transactionService";

export default function Transactions() {
  const [isSendToMobileOpen, setIsSendToMobileOpen] = useState(false);
  const [isSendMoneyOpen, setIsSendMoneyOpen] = useState(false);
  const [isDepositMoneyOpen, setIsDepositMoneyOpen] = useState(false);
  
  // Transaction service
  const { addTransaction } = useTransactionStore();

  // Purely numeric account number - would come from user profile or auth context in real app
  const accountNumber = "123456789012";
  const userName = "John Kamau"; // Mock user name - would come from auth context in real app
  
  // Copy account number to clipboard
  const copyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber);
    toast.success("Account number copied to clipboard");
  };

  // Handle mobile money transaction
  const handleSendToMobile = (phoneNumber: string, amount: string, description?: string) => {
    // Create and add the transaction to the store
    const newTransaction = createTransaction(
      accountNumber,
      userName,
      "withdrawal",
      amount,
      description || "Send to mobile money"
    );
    
    addTransaction(newTransaction);
    toast.success(`KES ${amount} sent to ${phoneNumber} successfully`);
    setIsSendToMobileOpen(false);
  };

  // Handle send money transaction
  const handleSendMoney = (recipientName: string, recipientAccount: string, amount: string, description?: string) => {
    // Create and add the transaction to the store
    const newTransaction = createTransaction(
      accountNumber,
      userName,
      "withdrawal",
      amount,
      description || `Money sent to ${recipientName}`
    );
    
    addTransaction(newTransaction);
    toast.success(`KES ${amount} sent to ${recipientName} successfully`);
    setIsSendMoneyOpen(false);
  };

  // Handle deposit money transaction
  const handleDepositMoney = (amount: string, method: string) => {
    // Create and add the transaction to the store
    const newTransaction = createTransaction(
      accountNumber,
      userName,
      "deposit",
      amount,
      `Deposit via ${method}`
    );
    
    addTransaction(newTransaction);
    toast.success(`KES ${amount} deposited successfully`);
    setIsDepositMoneyOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <UserGreeting userName={userName.split(" ")[0]} />
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Button onClick={() => setIsDepositMoneyOpen(true)} className="gap-2" variant="secondary">
                <Upload className="h-4 w-4" />
                Deposit
              </Button>
              <Button onClick={() => setIsSendMoneyOpen(true)} className="gap-2">
                <CreditCard className="h-4 w-4" />
                Send Money
              </Button>
              <Button onClick={() => setIsSendToMobileOpen(true)} className="gap-2">
                <Send className="h-4 w-4" />
                Send to Mobile
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
          
          <div className="mt-8">
            <RecentTransactions accountNumber={accountNumber} />
          </div>
        </div>
      </main>

      <SendToMobileDialog 
        isOpen={isSendToMobileOpen} 
        onClose={() => setIsSendToMobileOpen(false)}
        onSend={handleSendToMobile}
      />
      
      <SendMoneyDialog
        isOpen={isSendMoneyOpen}
        onClose={() => setIsSendMoneyOpen(false)}
        onSend={handleSendMoney}
      />
      
      <DepositMoneyDialog
        isOpen={isDepositMoneyOpen}
        onClose={() => setIsDepositMoneyOpen(false)}
        onDeposit={handleDepositMoney}
      />
    </div>
  );
}
