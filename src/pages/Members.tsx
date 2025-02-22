
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Search, UserPlus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const members = [
  {
    id: 1,
    name: "John Kamau",
    membershipNumber: "SCO001",
    joinDate: "Jan 15, 2024",
    status: "active",
    savings: "KES 250,000",
    loans: "KES 100,000",
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    membershipNumber: "SCO002",
    joinDate: "Feb 1, 2024",
    status: "active",
    savings: "KES 180,000",
    loans: "KES 50,000",
  },
  {
    id: 3,
    name: "Peter Njoroge",
    membershipNumber: "SCO003",
    joinDate: "Feb 10, 2024",
    status: "pending",
    savings: "KES 75,000",
    loans: "KES 0",
  },
  {
    id: 4,
    name: "Sarah Muthoni",
    membershipNumber: "SCO004",
    joinDate: "Feb 15, 2024",
    status: "active",
    savings: "KES 125,000",
    loans: "KES 25,000",
  },
];

const Members = () => {
  return (
    <div className="min-h-screen bg-sacco-50 flex">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-sacco-900">Members</h1>
              <p className="text-sacco-500 mt-1">
                Manage your Sacco members and their details
              </p>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-sacco-900 text-white rounded-lg hover:bg-sacco-800 transition-colors">
              <UserPlus className="w-5 h-5 mr-2" />
              Add Member
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-sacco-500" />
                <Input
                  placeholder="Search members..."
                  className="pl-10"
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sacco-600 hover:bg-sacco-50 transition-colors">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-sacco-50">
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Member</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Membership No.</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Join Date</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Savings</th>
                    <th className="text-left p-4 text-sm font-medium text-sacco-600">Loans</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-gray-200 hover:bg-sacco-50 transition-colors cursor-pointer"
                    >
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-sacco-200 flex items-center justify-center text-sacco-600 font-medium mr-3">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-sacco-900">{member.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sacco-600">{member.membershipNumber}</td>
                      <td className="p-4 text-sacco-600">{member.joinDate}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="p-4 text-sacco-600">{member.savings}</td>
                      <td className="p-4 text-sacco-600">{member.loans}</td>
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

export default Members;
