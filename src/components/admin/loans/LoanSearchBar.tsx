
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";

interface LoanSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const LoanSearchBar: React.FC<LoanSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
          <Input
            placeholder="Search loans..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <PlusCircle className="w-5 h-5 mr-2" />
          New Loan
        </Button>
      </div>
    </div>
  );
};
