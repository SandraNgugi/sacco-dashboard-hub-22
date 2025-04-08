
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

interface RejectLoanDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  loan: Loan | null;
  onReject: () => void;
}

export const RejectLoanDialog: React.FC<RejectLoanDialogProps> = ({
  isOpen,
  onOpenChange,
  loan,
  onReject,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reject Loan</DialogTitle>
          <DialogDescription>
            Are you sure you want to reject this loan application?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {loan && <LoanMemberInfo loan={loan} />}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onReject} variant="destructive">
            Reject Loan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
