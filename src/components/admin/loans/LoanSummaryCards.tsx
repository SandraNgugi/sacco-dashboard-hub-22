
import React from "react";

interface LoanSummaryCardsProps {
  activeLoansAmount: string;
  activeLoansCount: number;
  pendingLoansAmount: string;
  pendingLoansCount: number;
  overdueLoansAmount: string;
  overdueLoansCount: number;
}

export const LoanSummaryCards: React.FC<LoanSummaryCardsProps> = ({
  activeLoansAmount,
  activeLoansCount,
  pendingLoansAmount,
  pendingLoansCount,
  overdueLoansAmount,
  overdueLoansCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-slate-600 mb-2">Total Active Loans</h3>
        <div className="text-2xl font-bold text-slate-900">{activeLoansAmount}</div>
        <p className="text-sm text-slate-500 mt-1">{activeLoansCount} active loans</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-slate-600 mb-2">Pending Approvals</h3>
        <div className="text-2xl font-bold text-slate-900">{pendingLoansAmount}</div>
        <p className="text-sm text-slate-500 mt-1">{pendingLoansCount} pending loan</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-slate-600 mb-2">Overdue Loans</h3>
        <div className="text-2xl font-bold text-destructive">{overdueLoansAmount}</div>
        <p className="text-sm text-slate-500 mt-1">{overdueLoansCount} overdue loan</p>
      </div>
    </div>
  );
};
