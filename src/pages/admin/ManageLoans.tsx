
import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useToast } from "@/hooks/use-toast";
import { LoanSummaryCards } from "@/components/admin/loans/LoanSummaryCards";
import { LoanSearchBar } from "@/components/admin/loans/LoanSearchBar";
import { LoansTable, Loan } from "@/components/admin/loans/LoansTable";
import { ApproveLoanDialog } from "@/components/admin/loans/dialogs/ApproveLoanDialog";
import { RejectLoanDialog } from "@/components/admin/loans/dialogs/RejectLoanDialog";
import { ViewLoanDetailsDialog } from "@/components/admin/loans/dialogs/ViewLoanDetailsDialog";
import { PaymentReminderDialog } from "@/components/admin/loans/dialogs/PaymentReminderDialog";
import { MarkPaidDialog } from "@/components/admin/loans/dialogs/MarkPaidDialog";

// Sample loan data
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
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false);
  const [isPaymentReminderDialogOpen, setIsPaymentReminderDialogOpen] = useState(false);
  const [isMarkPaidDialogOpen, setIsMarkPaidDialogOpen] = useState(false);
  const [currentLoan, setCurrentLoan] = useState<Loan | null>(null);
  const { toast } = useToast();

  // Filter loans based on search term
  const filteredLoans = loans.filter(loan =>
    loan.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.membershipNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.loanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary statistics
  const activeLoans = loans.filter(loan => loan.status === 'active');
  const pendingLoans = loans.filter(loan => loan.status === 'pending');
  const overdueLoans = loans.filter(loan => loan.status === 'overdue');

  const activeLoansAmount = `KES ${activeLoans.reduce((sum, loan) => sum + parseInt(loan.amount.replace(/\D/g, '')), 0).toLocaleString()}`;
  const pendingLoansAmount = `KES ${pendingLoans.reduce((sum, loan) => sum + parseInt(loan.amount.replace(/\D/g, '')), 0).toLocaleString()}`;
  const overdueLoansAmount = `KES ${overdueLoans.reduce((sum, loan) => sum + parseInt(loan.amount.replace(/\D/g, '')), 0).toLocaleString()}`;

  // Dialog handlers
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

  const handleSendPaymentReminder = () => {
    if (!currentLoan) return;
    
    setIsPaymentReminderDialogOpen(false);
    
    toast({
      title: "Payment Reminder Sent",
      description: `Payment reminder sent to ${currentLoan.memberName}.`,
    });
  };

  const handleMarkAsPaid = () => {
    if (!currentLoan) return;
    
    const updatedLoans = loans.map(loan => 
      loan.id === currentLoan.id ? 
      { 
        ...loan, 
        status: 'paid',
        progress: 100,
      } : loan
    );
    
    setLoans(updatedLoans);
    setIsMarkPaidDialogOpen(false);
    
    toast({
      title: "Loan Marked as Paid",
      description: "Loan has been marked as fully paid.",
    });
  };

  // Dialog openers
  const openApproveDialog = (loan: Loan) => {
    setCurrentLoan(loan);
    setIsApproveDialogOpen(true);
  };

  const openRejectDialog = (loan: Loan) => {
    setCurrentLoan(loan);
    setIsRejectDialogOpen(true);
  };

  const openViewDetailsDialog = (loan: Loan) => {
    setCurrentLoan(loan);
    setIsViewDetailsDialogOpen(true);
  };

  const openPaymentReminderDialog = (loan: Loan) => {
    setCurrentLoan(loan);
    setIsPaymentReminderDialogOpen(true);
  };

  const openMarkPaidDialog = (loan: Loan) => {
    setCurrentLoan(loan);
    setIsMarkPaidDialogOpen(true);
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
          
          <LoanSummaryCards 
            activeLoansAmount={activeLoansAmount}
            activeLoansCount={activeLoans.length}
            pendingLoansAmount={pendingLoansAmount}
            pendingLoansCount={pendingLoans.length}
            overdueLoansAmount={overdueLoansAmount}
            overdueLoansCount={overdueLoans.length}
          />
          
          <LoanSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <LoansTable
            loans={filteredLoans}
            onApprove={openApproveDialog}
            onReject={openRejectDialog}
            onViewDetails={openViewDetailsDialog}
            onMarkPaid={openMarkPaidDialog}
            onPaymentReminder={openPaymentReminderDialog}
          />
        </div>
      </main>

      {/* Dialogs */}
      <ApproveLoanDialog
        isOpen={isApproveDialogOpen}
        onOpenChange={setIsApproveDialogOpen}
        loan={currentLoan}
        onApprove={handleApproveLoan}
      />
      
      <RejectLoanDialog
        isOpen={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
        loan={currentLoan}
        onReject={handleRejectLoan}
      />
      
      <ViewLoanDetailsDialog
        isOpen={isViewDetailsDialogOpen}
        onOpenChange={setIsViewDetailsDialogOpen}
        loan={currentLoan}
      />
      
      <PaymentReminderDialog
        isOpen={isPaymentReminderDialogOpen}
        onOpenChange={setIsPaymentReminderDialogOpen}
        loan={currentLoan}
        onSendReminder={handleSendPaymentReminder}
      />
      
      <MarkPaidDialog
        isOpen={isMarkPaidDialogOpen}
        onOpenChange={setIsMarkPaidDialogOpen}
        loan={currentLoan}
        onMarkPaid={handleMarkAsPaid}
      />
    </div>
  );
}
