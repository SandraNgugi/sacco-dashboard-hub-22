
import { useEffect } from 'react';
import { toast } from "sonner";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define Paystack popup window type
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: PaystackConfig) => { openIframe: () => void };
    };
  }
}

interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  onClose: () => void;
  onSuccess: (reference: { reference: string }) => void;
  metadata?: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
}

interface PaystackButtonProps {
  email: string;
  amount: number;
  onSuccess: (reference: string) => void;
  onClose?: () => void;
  metadata?: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  className?: string;
  currency?: string;
  text?: string;
  disabled?: boolean;
}

export function PaystackButton({
  email,
  amount,
  onSuccess,
  onClose,
  metadata,
  className,
  currency = "NGN",
  text = "Pay with Paystack",
  disabled = false
}: PaystackButtonProps) {
  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    
    script.onerror = () => {
      toast.error("Failed to load payment gateway", {
        description: "Please check your internet connection and try again"
      });
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  const handlePayment = () => {
    if (typeof window.PaystackPop === 'undefined') {
      toast.error("Payment gateway is still loading", {
        description: "Please wait a moment and try again"
      });
      return;
    }
    
    // Generate a reference
    const reference = `ref_${Math.floor(Math.random() * 1000000000 + 1)}`;
    
    const paystackConfig: PaystackConfig = {
      key: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Replace with your Paystack public key
      email,
      amount: amount * 100, // Paystack amount is in kobo (100 kobo = 1 Naira)
      currency,
      ref: reference,
      onClose: () => {
        if (onClose) onClose();
      },
      onSuccess: (response) => {
        onSuccess(response.reference);
      },
      metadata
    };
    
    const handler = window.PaystackPop.setup(paystackConfig);
    handler.openIframe();
  };
  
  return (
    <Button 
      type="button" 
      onClick={handlePayment} 
      disabled={disabled}
      className={`bg-[#0BA4DB] hover:bg-[#0A93C9] ${className}`}
    >
      <CreditCard className="w-4 h-4 mr-2" />
      {text}
    </Button>
  );
}
