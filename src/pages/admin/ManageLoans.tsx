
import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, PlusCircle, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Sample loan data for demonstration
const initialLoans = [
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

export default function ManageLoans() {
  const [loans, setLoans] = useState(initialLoans);
  const [searchTerm, setSearchTerm] = useState("");
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [currentLoan, setCurrentLoan] = useState<any | null>(null);
  const { toast } = useToast();

  const filteredLoans = loans.filter(loan =>
    loan.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.membershipNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.loanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproveLoan = () => {
    if (!currentLoan) return;
    
    const today = new Date();
    const dueDate = new Date();
    dueDate.setFullYear(dueDate.getFullYear() + 1);
    
    const updatedLoans = loans.map(loan => 
      loan.id === currentLoan.id ? 
      { 
        ...loan, 
        status: 'active',
        disbursedDate: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        dueDate: dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      } : loan
    );
    
    setLoans(updatedLoans);
    setIsApproveDialogOpen(false);
    
    toast({
      title: "Loan Approved",
      description: "Loan has been approved and marked as active.",
    });
  };

  const handleRejectLoan = () => {
    if (!currentLoan) return;
    
    const updatedLoans = loans.map(loan => 
      loan.id === currentLoan.id ? 
      { 
        ...loan, 
        status: 'rejected',
      } : loan
    );
    
    setLoans(updatedLoans);
    setIsRejectDialogOpen(false);
    
    toast({
      title: "Loan Rejected",
      description: "Loan application has been rejected.",
    });
  };

  const openApproveDialog = (loan: any) => {
    setCurrentLoan(loan);
    setIsApproveDialogOpen(true);
  };

  const openRejectDialog = (loan: any) => {
    setCurrentLoan(loan);
    setIsRejectDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Manage Loans</h1>
            <div className="bg-white rounded-full px-4 py-2 text-sm font-medium text-slate-900 border border-slate-200">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Total Active Loans</h3>
              <div className="text-2xl font-bold text-slate-900">KES 295,000</div>
              <p className="text-sm text-slate-500 mt-1">4 active loans</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Pending Approvals</h3>
              <div className="text-2xl font-bold text-slate-900">KES 75,000</div>
              <p className="text-sm text-slate-500 mt-1">1 pending loan</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Overdue Loans</h3>
              <div className="text-2xl font-bold text-destructive">KES 120,000</div>
              <p className="text-sm text-slate-500 mt-1">1 overdue loan</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                <Input
                  placeholder="Search loans..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-slate-900 hover:bg-slate-800">
                <PlusCircle className="w-5 h-5 mr-2" />
                New Loan
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-medium">Member</TableHead>
                  <TableHead className="font-medium">Loan Type</TableHead>
                  <TableHead className="font-medium">Amount</TableHead>
                  <TableHead className="font-medium">Disbursed Date</TableHead>
                  <TableHead className="font-medium">Due Date</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Repayment</TableHead>
                  <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoans.map((loan) => (
                  <TableRow
                    key={loan.id}
                    className="hover:bg-slate-50"
                  >
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium mr-3">
                          {loan.memberName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{loan.memberName}</div>
                          <div className="text-xs text-slate-500">{loan.membershipNumber}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{loan.loanType}</TableCell>
                    <TableCell className="font-medium">{loan.amount}</TableCell>
                    <TableCell>{loan.disbursedDate || "-"}</TableCell>
                    <TableCell>{loan.dueDate || "-"}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        loan.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : loan.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : loan.status === 'rejected'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {loan.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {loan.status === 'active' || loan.status === 'overdue' ? (
                        <>
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
                          <div className="text-xs text-slate-500 mt-1">{loan.progress}% paid</div>
                        </>
                      ) : (
                        <span className="text-xs text-slate-500">Not applicable</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {loan.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openApproveDialog(loan)}
                            className="h-8 border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openRejectDialog(loan)}
                            className="h-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {/* Approve Loan Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Loan</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this loan? This will disburse the funds to the member.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentLoan && (
              <div className="flex items-center p-4 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium mr-4">
                  {currentLoan.memberName.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{currentLoan.memberName}</div>
                  <div className="text-sm text-slate-500">{currentLoan.membershipNumber}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{currentLoan.amount}</div>
                  <div className="text-sm text-slate-500">{currentLoan.loanType}</div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveLoan} className="bg-green-600 hover:bg-green-700">
              Approve Loan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Loan Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Loan</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this loan application?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentLoan && (
              <div className="flex items-center p-4 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium mr-4">
                  {currentLoan.memberName.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{currentLoan.memberName}</div>
                  <div className="text-sm text-slate-500">{currentLoan.membershipNumber}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{currentLoan.amount}</div>
                  <div className="text-sm text-slate-500">{currentLoan.loanType}</div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRejectLoan} variant="destructive">
              Reject Loan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
