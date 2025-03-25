
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminQuickStats } from "@/components/admin/AdminQuickStats";
import { RecentActivities } from "@/components/admin/RecentActivities";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <div className="bg-white rounded-full px-4 py-2 text-sm font-medium text-slate-900 border border-slate-200">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          
          <AdminQuickStats />
          
          <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <RecentActivities />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 h-[400px] animate-fade-in">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-slate-900">
                  System Overview
                </h2>
              </div>
              <div className="p-6 flex items-center justify-center h-[calc(100%-80px)]">
                <p className="text-slate-500">Stats overview will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
