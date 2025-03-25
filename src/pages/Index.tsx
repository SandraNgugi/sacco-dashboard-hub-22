
import { Sidebar } from "@/components/dashboard/Sidebar";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";

export default function Index() {
  return (
    <div className="flex min-h-screen bg-sacco-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-sacco-900 mb-8">Dashboard</h1>
          
          <QuickStats />
          
          <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <RecentTransactions />
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
