
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoanMemberInfo } from "../LoanMemberInfo";
import { Loan } from "../LoansTable";

interface ViewLoanDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  loan: Loan | null;
}

export const ViewLoanDetailsDialog: React.FC<ViewLoanDetailsDialogProps> = ({
  isOpen,
  onOpenChange,
  loan,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Loan Details</DialogTitle>
          <DialogDescription>
            Detailed information about this loan.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {loan && (
            <div className="space-y-4">
              <LoanMemberInfo loan={loan} />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Loan Type</p>
                  <p className="font-medium">{loan.loanType}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="font-medium">{loan.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Disbursed Date</p>
                  <p className="font-medium">{loan.disbursedDate || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Due Date</p>
                  <p className="font-medium">{loan.dueDate || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="font-medium capitalize">{loan.status}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Repayment</p>
                  <p className="font-medium">{loan.progress}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
