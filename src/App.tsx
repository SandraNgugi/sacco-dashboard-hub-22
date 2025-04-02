
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Transactions from "./pages/Transactions";
import LoansPage from "./pages/Loans";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageMembers from "./pages/admin/ManageMembers";
import ManageTransactions from "./pages/admin/ManageTransactions";
import ManageLoans from "./pages/admin/ManageLoans";
import ReportsPage from "./pages/admin/ReportsPage";

const App = () => {
  // Create a client inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/transactions" replace />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/loans" element={<LoansPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/members" element={<ManageMembers />} />
            <Route path="/admin/transactions" element={<ManageTransactions />} />
            <Route path="/admin/loans" element={<ManageLoans />} />
            <Route path="/admin/reports" element={<ReportsPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
