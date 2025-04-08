
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

interface PaymentReminderDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  loan: Loan | null;
  onSendReminder: () => void;
}

export const PaymentReminderDialog: React.FC<PaymentReminderDialogProps> = ({
  isOpen,
  onOpenChange,
  loan,
  onSendReminder,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Payment Reminder</DialogTitle>
          <DialogDescription>
            Send a payment reminder to the member for overdue loan payments.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {loan && (
            <div className="flex items-center p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium mr-4">
                {loan.memberName.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="font-medium">{loan.memberName}</div>
                <div className="text-sm text-slate-500">{loan.membershipNumber}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{loan.amount}</div>
                <div className="text-sm text-slate-500 text-red-600">Overdue</div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSendReminder} className="bg-yellow-600 hover:bg-yellow-700">
            Send Reminder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
