
import { Sidebar } from "@/components/dashboard/Sidebar";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { UserGreeting } from "@/components/dashboard/UserGreeting";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Index() {
  const { user } = useAuth();
  const [accountNumber, setAccountNumber] = useState("");
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    if (user?.user_metadata) {
      setAccountNumber(user.user_metadata.account_number || "");
      setUserName(user.user_metadata.full_name || "");
    }
  }, [user]);

  return (
    <div className="flex min-h-screen bg-sacco-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <UserGreeting userName={userName.split(" ")[0]} />
          
          <h1 className="text-3xl font-bold text-sacco-900 mb-8">Dashboard</h1>
          
          <QuickStats accountNumber={accountNumber} />
          
          <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <RecentTransactions accountNumber={accountNumber} />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 h-[400px] animate-fade-in">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-sacco-900">
                  Monthly Performance
                </h2>
              </div>
              <div className="p-6 flex items-center justify-center h-[calc(100%-80px)]">
                <p className="text-sacco-500">Chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
