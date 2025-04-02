
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { LoanApplicationForm } from "@/components/loans/LoanApplicationForm";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, PlusCircle } from "lucide-react";

export default function LoansPage() {
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Mock data for user's loans
  const [loans, setLoans] = useState([
    {
      id: 1,
      loanType: "Development",
      amount: "KES 50,000",
      requestDate: "Mar 15, 2024",
      dueDate: "Mar 15, 2025",
      status: "Active",
      progress: 30,
    },
    {
      id: 2,
      loanType: "Emergency",
      amount: "KES 20,000",
      requestDate: "Jan 10, 2024",
      dueDate: "Jul 10, 2024",
      status: "Active",
      progress: 50,
    },
    {
      id: 3,
      loanType: "School Fees",
      amount: "KES 35,000",
      requestDate: "Nov 20, 2023",
      dueDate: "Nov 20, 2024",
      status: "Paid",
      progress: 100,
    },
  ]);

  const handleLoanApplication = (loanData) => {
    // Add the new loan to the list
    const newLoan = {
      id: loans.length + 1,
      loanType: loanData.loanType,
      amount: `KES ${loanData.amount}`,
      requestDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dueDate: "-",
      status: "Pending",
      progress: 0,
    };
    
    setLoans([...loans, newLoan]);
    
    toast({
      title: "Loan Application Submitted",
      description: "Your loan application has been submitted for review.",
    });
    
    setIsApplyDialogOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Loans</h1>
            <Button onClick={() => setIsApplyDialogOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Apply for Loan
            </Button>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-blue-100">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Active Loans</h3>
                  <div className="text-2xl font-bold">2</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-green-100">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Borrowed</h3>
                  <div className="text-2xl font-bold">KES 105,000</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-purple-100">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Paid</h3>
                  <div className="text-2xl font-bold">KES 43,500</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loans Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Repayment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.loanType}</TableCell>
                    <TableCell>{loan.amount}</TableCell>
                    <TableCell>{loan.requestDate}</TableCell>
                    <TableCell>{loan.dueDate}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        loan.status === 'Active' 
                          ? 'bg-green-100 text-green-800'
                          : loan.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : loan.status === 'Paid'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {loan.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {loan.status !== 'Pending' ? (
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full bg-green-500"
                            style={{ width: `${loan.progress}%` }}
                          ></div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">Awaiting approval</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {loans.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      You don't have any loans yet. Apply for a loan to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      
      {isApplyDialogOpen && (
        <LoanApplicationForm 
          isOpen={isApplyDialogOpen} 
          onClose={() => setIsApplyDialogOpen(false)}
          onSubmit={handleLoanApplication}
        />
      )}
    </div>
  );
}
