
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserGreeting } from "@/components/dashboard/UserGreeting";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Send } from "lucide-react";
import { SendToMobileDialog } from "@/components/transactions/SendToMobileDialog";

export default function Transactions() {
  const [isSendToMobileOpen, setIsSendToMobileOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ start?: Date, end?: Date }>({});

  // Purely numeric account number - would come from user profile or auth context in real app
  const accountNumber = "123456789012";
  
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
            <UserGreeting userName="Member" />
            <div className="flex gap-4 mt-4 md:mt-0">
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

      <SendToMobileDialog isOpen={isSendToMobileOpen} onClose={() => setIsSendToMobileOpen(false)} />
    </div>
  );
}
