
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground mt-2">
          Join Times U Sacco to start saving and accessing loans
        </p>
      </div>
      
      <SignUpForm />
      
      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
