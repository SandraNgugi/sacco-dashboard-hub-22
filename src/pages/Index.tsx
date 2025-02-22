
import { Sidebar } from "@/components/dashboard/Sidebar";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Bell, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-sacco-50 flex">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-sacco-900">
                Welcome back, Admin
              </h1>
              <p className="text-sacco-500 mt-1">
                Here's what's happening with your Sacco today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-sacco-600 hover:text-sacco-900 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-sacco-600 hover:text-sacco-900 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="w-10 h-10 rounded-full bg-sacco-200 flex items-center justify-center text-sacco-600 font-medium">
                AK
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <section className="mb-8">
            <QuickStats />
          </section>

          {/* Recent Transactions */}
          <section>
            <RecentTransactions />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
