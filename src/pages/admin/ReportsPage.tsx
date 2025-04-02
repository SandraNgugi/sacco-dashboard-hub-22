
import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "recharts";
import { 
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart
} from "recharts";

// Sample data for the charts
const monthlyTransactionData = [
  { name: "Jan", deposits: 250000, withdrawals: 150000 },
  { name: "Feb", deposits: 300000, withdrawals: 180000 },
  { name: "Mar", deposits: 280000, withdrawals: 200000 },
  { name: "Apr", deposits: 320000, withdrawals: 190000 },
  { name: "May", deposits: 350000, withdrawals: 220000 },
  { name: "Jun", deposits: 380000, withdrawals: 250000 },
];

const loanDistributionData = [
  { name: "Development", value: 350000 },
  { name: "Emergency", value: 180000 },
  { name: "School Fees", value: 250000 },
  { name: "Business", value: 420000 },
];

const membershipGrowthData = [
  { name: "Jan", members: 120 },
  { name: "Feb", members: 135 },
  { name: "Mar", members: 148 },
  { name: "Apr", members: 160 },
  { name: "May", members: 178 },
  { name: "Jun", members: 195 },
];

const loanRepaymentData = [
  { name: "Jan", repaid: 80000, outstanding: 270000 },
  { name: "Feb", repaid: 95000, outstanding: 285000 },
  { name: "Mar", repaid: 110000, outstanding: 270000 },
  { name: "Apr", repaid: 130000, outstanding: 260000 },
  { name: "May", repaid: 150000, outstanding: 280000 },
  { name: "Jun", repaid: 170000, outstanding: 310000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("6months");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
            <div className="bg-white rounded-full px-4 py-2 text-sm font-medium text-slate-900 border border-slate-200">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          
          {/* Report Filters */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-8">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date Range</label>
                <select 
                  className="bg-white border border-slate-300 rounded-md px-3 py-1.5 text-sm"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="30days">Last 30 Days</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last 12 Months</option>
                </select>
              </div>
              
              <Button className="ml-auto">
                Export Reports
              </Button>
            </div>
          </div>
          
          {/* Main Reports */}
          <Tabs defaultValue="financial" className="space-y-6">
            <TabsList className="bg-white border border-slate-200">
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="membership">Membership</TabsTrigger>
              <TabsTrigger value="loans">Loans</TabsTrigger>
            </TabsList>
            
            {/* Financial Reports */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Deposits</CardTitle>
                    <CardDescription>Last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-900">KES 1,880,000</div>
                    <div className="text-sm text-green-600 mt-1">↑ 12% from previous period</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Withdrawals</CardTitle>
                    <CardDescription>Last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-900">KES 1,190,000</div>
                    <div className="text-sm text-red-600 mt-1">↑ 8% from previous period</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Net Growth</CardTitle>
                    <CardDescription>Last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-900">KES 690,000</div>
                    <div className="text-sm text-green-600 mt-1">↑ 15% from previous period</div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Monthly Transactions</CardTitle>
                  <CardDescription>Deposits vs Withdrawals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyTransactionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `KES ${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="deposits" name="Deposits" fill="#0088FE" />
                        <Bar dataKey="withdrawals" name="Withdrawals" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Membership Reports */}
            <TabsContent value="membership" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Members</CardTitle>
                    <CardDescription>Current active members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-900">195</div>
                    <div className="text-sm text-green-600 mt-1">↑ 15 new members this month</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Average Savings</CardTitle>
                    <CardDescription>Per member</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-900">KES 125,350</div>
                    <div className="text-sm text-green-600 mt-1">↑ 8% from last month</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Active Loans</CardTitle>
                    <CardDescription>Current active loans</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-900">78</div>
                    <div className="text-sm text-gray-600 mt-1">40% of all members</div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Membership Growth</CardTitle>
                  <CardDescription>New members over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={membershipGrowthData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="members" stroke="#0088FE" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Loan Reports */}
            <TabsContent value="loans" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Distribution</CardTitle>
                    <CardDescription>By loan type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={loanDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {loanDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `KES ${value.toLocaleString()}`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Repayment</CardTitle>
                    <CardDescription>Repaid vs Outstanding</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                          data={loanRepaymentData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => `KES ${value.toLocaleString()}`} />
                          <Legend />
                          <Bar dataKey="repaid" name="Repaid" fill="#00C49F" />
                          <Line type="monotone" dataKey="outstanding" name="Outstanding" stroke="#FF8042" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Loan Summary</CardTitle>
                  <CardDescription>Current loan performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <div className="text-sm text-slate-500">Total Active Loans</div>
                      <div className="text-2xl font-semibold">78</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-500">Total Loan Amount</div>
                      <div className="text-2xl font-semibold">KES 1,200,000</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-500">Repaid Amount</div>
                      <div className="text-2xl font-semibold">KES 735,000</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-500">Default Rate</div>
                      <div className="text-2xl font-semibold">3.2%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
