
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

interface MarkPaidDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  loan: Loan | null;
  onMarkPaid: () => void;
}

export const MarkPaidDialog: React.FC<MarkPaidDialogProps> = ({
  isOpen,
  onOpenChange,
  loan,
  onMarkPaid,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark as Paid</DialogTitle>
          <DialogDescription>
            Mark this loan as fully paid. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {loan && <LoanMemberInfo loan={loan} />}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onMarkPaid} className="bg-green-600 hover:bg-green-700">
            Mark as Paid
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
