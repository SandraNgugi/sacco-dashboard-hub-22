
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

interface ApproveLoanDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  loan: Loan | null;
  onApprove: () => void;
}

export const ApproveLoanDialog: React.FC<ApproveLoanDialogProps> = ({
  isOpen,
  onOpenChange,
  loan,
  onApprove,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Approve Loan</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this loan? This will disburse the funds to the member.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {loan && <LoanMemberInfo loan={loan} />}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onApprove} className="bg-green-600 hover:bg-green-700">
            Approve Loan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
