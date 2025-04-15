
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Transactions from "./pages/Transactions";
import LoansPage from "./pages/Loans";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageMembers from "./pages/admin/ManageMembers";
import ManageTransactions from "./pages/admin/ManageTransactions";
import ManageLoans from "./pages/admin/ManageLoans";
import ReportsPage from "./pages/admin/ReportsPage";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, AuthRoute } from "./components/auth/ProtectedRoute";
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Index from "./pages/Index";

const App = () => {
  // Create a client inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthRoute />}>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="" element={<Navigate to="/auth/login" replace />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
              </Route>
            </Route>
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Index />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/loans" element={<LoansPage />} />
            </Route>
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/members" element={<ManageMembers />} />
              <Route path="/admin/transactions" element={<ManageTransactions />} />
              <Route path="/admin/loans" element={<ManageLoans />} />
              <Route path="/admin/reports" element={<ReportsPage />} />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
