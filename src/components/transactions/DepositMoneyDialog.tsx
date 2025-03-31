
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Upload, CreditCard, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { PaystackButton } from "../payments/PaystackIntegration";

const formSchema = z.object({
  amount: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Amount must be a positive number.",
    }
  ),
  paymentMethod: z.string().min(1, {
    message: "Payment method is required.",
  }),
  reference: z.string().optional(),
  date: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type DepositFormValues = z.infer<typeof formSchema>;

interface DepositMoneyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DepositMoneyDialog({ isOpen, onClose }: DepositMoneyDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaystackButton, setShowPaystackButton] = useState(false);

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      paymentMethod: "Paystack",
      reference: "",
      date: new Date().toISOString().slice(0, 10), // Today's date in YYYY-MM-DD format
      email: "",
    },
  });

  const onSubmit = async (values: DepositFormValues) => {
    if (values.paymentMethod === "Paystack") {
      setShowPaystackButton(true);
    } else {
      setIsSubmitting(true);
      
      try {
        // Simulate API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Log the form values
        console.log("Deposit form values:", values);
        
        // Show success toast
        toast.success("Deposit successful", {
          description: `KES ${values.amount} has been deposited to your account.`,
        });
        
        // Reset form and close dialog
        form.reset();
        onClose();
      } catch (error) {
        toast.error("Failed to process deposit", {
          description: "Please try again later.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePaystackSuccess = (reference: string) => {
    const values = form.getValues();
    console.log("Paystack payment successful:", reference);
    toast.success("Payment successful", {
      description: `KES ${values.amount} has been deposited to your account.`,
    });
    form.reset();
    onClose();
  };

  const handlePaystackClose = () => {
    setShowPaystackButton(false);
    toast.info("Payment canceled", {
      description: "You can try again or choose a different payment method.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-sacco-700" />
            Deposit Money
          </DialogTitle>
          <DialogDescription>
            Deposit funds into your Sacco account.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (KES)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Required for payment confirmation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-sacco-500" />
                      <Input className="pl-10" placeholder="Paystack, M-Pesa, Bank Transfer" value={field.value} onChange={field.onChange} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-sacco-500" />
                      <Input className="pl-10" type="date" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 pt-4">
              {showPaystackButton ? (
                <>
                  <Button variant="outline" type="button" onClick={() => setShowPaystackButton(false)}>
                    Back
                  </Button>
                  <PaystackButton
                    email={form.getValues().email}
                    amount={Number(form.getValues().amount)}
                    onSuccess={handlePaystackSuccess}
                    onClose={handlePaystackClose}
                    text="Pay Now"
                    metadata={{
                      custom_fields: [
                        {
                          display_name: "Payment Type",
                          variable_name: "payment_type",
                          value: "Deposit"
                        }
                      ]
                    }}
                  />
                </>
              ) : (
                <>
                  <Button variant="outline" type="button" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Continue"}
                  </Button>
                </>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
