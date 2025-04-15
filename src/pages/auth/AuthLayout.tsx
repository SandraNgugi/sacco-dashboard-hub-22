
import { SaccoLogo } from "@/components/dashboard/SaccoLogo";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="bg-sacco-600 text-white p-8 flex flex-col justify-center md:w-1/2 md:h-screen">
        <div className="max-w-md mx-auto">
          <SaccoLogo />
          <h1 className="text-3xl font-bold mb-4">Welcome to Times U Sacco</h1>
          <p className="text-lg opacity-90">
            Access your account to manage your savings, loans, and more with our comprehensive Sacco services.
          </p>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
