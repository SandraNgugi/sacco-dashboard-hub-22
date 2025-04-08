
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, Banknote, AlertTriangle } from "lucide-react";

export interface Loan {
  id: number;
  memberName: string;
  membershipNumber: string;
  loanType: string;
  amount: string;
  disbursedDate: string;
  dueDate: string;
  status: string;
  progress: number;
}

interface LoansTableProps {
  loans: Loan[];
  onApprove: (loan: Loan) => void;
  onReject: (loan: Loan) => void;
  onViewDetails: (loan: Loan) => void;
  onMarkPaid: (loan: Loan) => void;
  onPaymentReminder: (loan: Loan) => void;
}

export const LoansTable: React.FC<LoansTableProps> = ({
  loans,
  onApprove,
  onReject,
  onViewDetails,
  onMarkPaid,
  onPaymentReminder,
}) => {
  return (
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
          {loans.map((loan) => (
            <TableRow key={loan.id} className="hover:bg-slate-50">
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
                    : loan.status === 'paid'
                    ? 'bg-blue-100 text-blue-800'
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
                      onClick={() => onApprove(loan)}
                      className="h-8 border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onReject(loan)}
                      className="h-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                {(loan.status === 'active' || loan.status === 'overdue') && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewDetails(loan)}
                      className="h-8 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onMarkPaid(loan)}
                      className="h-8 border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                    >
                      <Banknote className="w-4 h-4" />
                    </Button>
                    {loan.status === 'overdue' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onPaymentReminder(loan)}
                        className="h-8 border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-300"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
                
                {(loan.status === 'rejected' || loan.status === 'paid') && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewDetails(loan)}
                    className="h-8 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
