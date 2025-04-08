
import React from "react";
import { Loan } from "./LoansTable";

interface LoanMemberInfoProps {
  loan: Loan;
}

export const LoanMemberInfo: React.FC<LoanMemberInfoProps> = ({ loan }) => {
  return (
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
        <div className="text-sm text-slate-500">{loan.loanType}</div>
      </div>
    </div>
  );
};
