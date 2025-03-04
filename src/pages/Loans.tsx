
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Search, PlusCircle, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const loans = [
  {
    id: 1,
    memberName: "John Kamau",
    membershipNumber: "SCO001",
    loanType: "Development",
    amount: "KES 100,000",
    disbursedDate: "Feb 15, 2024",
    dueDate: "Feb 15, 2025",
    status: "active",
    progress: 25,
  },
  {
    id: 2,
    memberName: "Mary Wanjiku",
    membershipNumber: "SCO002",
    loanType: "Emergency",
    amount: "KES 50,000",
    disbursedDate: "Jan 20, 2024",
    dueDate: "Jul 20, 2024",
    status: "active",
    progress: 40,
  },
  {
    id: 3,
    memberName: "Peter Njoroge",
    membershipNumber: "SCO003",
    loanType: "School Fees",
    amount: "KES 75,000",
    disbursedDate: "",
    dueDate: "",
    status: "pending",
    progress: 0,
  },
  {
    id: 4,
    memberName: "Sarah Muthoni",
    membershipNumber: "SCO004",
    loanType: "Business",
    amount: "KES 25,000",
    disbursedDate: "Dec 10, 2023",
    dueDate: "Dec 10, 2024",
    status: "active",
    progress: 60,
  },
  {
    id: 5,
    memberName: "David Otieno",
    membershipNumber: "SCO007",
    loanType: "Development",
    amount: "KES 120,000",
    disbursedDate: "Nov 5, 2023",
    dueDate: "Nov 5, 2024",
    status: "overdue",
    progress: 30,
  },
];

const Loans = () => {
  return (
    <div className="min-h-screen bg-sacco-50 flex">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-sacco-900">Loans</h1>
              <p className="text-sacco-500 mt-1">
                Manage loan applications and repayments
              </p>
            </div>
            <Button className="bg-sacco-900 hover:bg-sacco-800 text-white">
              <PlusCircle className="w-5 h-5 mr-2" />
              New Loan
            </Button>
          </div>

          {/* Loan Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-sacco-600">Total Active Loans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sacco-900">KES 295,000</div>
                <p className="text-sm text-sacco-500 mt-1">4 active loans</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-sacco-600">Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sacco-900">KES 75,000</div>
                <p className="text-sm text-sacco-500 mt-1">1 pending loan</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-sacco-600">Overdue Loans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sacco-900 text-destructive">KES 120,000</div>
                <p className="text-sm text-sacco-500 mt-1">1 overdue loan</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-sacco-500" />
                <Input
                  placeholder="Search loans..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="text-sacco-600">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Loans Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-sacco-50">
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Member</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Loan Type</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Amount</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Disbursed Date</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Due Date</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Repayment</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr
                      key={loan.id}
                      className="border-b border-gray-200 hover:bg-sacco-50 transition-colors cursor-pointer"
                    >
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-sacco-200 flex items-center justify-center text-sacco-600 font-medium mr-3">
                            {loan.memberName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium text-sacco-900">{loan.memberName}</div>
                            <div className="text-xs text-sacco-500">{loan.membershipNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sacco-600">{loan.loanType}</td>
                      <td className="p-4 font-medium text-sacco-900">{loan.amount}</td>
                      <td className="p-4 text-sacco-600">{loan.disbursedDate || "-"}</td>
                      <td className="p-4 text-sacco-600">{loan.dueDate || "-"}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          loan.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : loan.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {loan.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              loan.status === 'overdue' 
                                ? 'bg-red-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${loan.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-sacco-500 mt-1">{loan.progress}% paid</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loans;
