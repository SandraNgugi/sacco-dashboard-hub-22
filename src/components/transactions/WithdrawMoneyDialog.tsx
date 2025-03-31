
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Download, Landmark, Calendar, CreditCard } from "lucide-react";
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
  withdrawalMethod: z.string().min(1, {
    message: "Withdrawal method is required.",
  }),
  accountNumber: z.string().min(5, {
    message: "Account number must be at least 5 characters.",
  }),
  description: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).optional(),
});

type WithdrawFormValues = z.infer<typeof formSchema>;

interface WithdrawMoneyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WithdrawMoneyDialog({ isOpen, onClose }: WithdrawMoneyDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      withdrawalMethod: "Bank Transfer",
      accountNumber: "",
      description: "",
      email: "",
    },
  });

  const onSubmit = async (values: WithdrawFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Log the form values
      console.log("Withdraw form values:", values);
      
      // Show success toast
      toast.success("Withdrawal request submitted", {
        description: `KES ${values.amount} will be sent to your account soon.`,
      });
      
      // Reset form and close dialog
      form.reset();
      onClose();
    } catch (error) {
      toast.error("Failed to process withdrawal", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-sacco-700" />
            Withdraw Money
          </DialogTitle>
          <DialogDescription>
            Withdraw funds from your Sacco account.
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
                    Required for withdrawal confirmation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="withdrawalMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Withdrawal Method</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-sacco-500" />
                      <Input className="pl-10" placeholder="Bank Transfer, M-Pesa, etc." {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Landmark className="absolute left-3 top-3 h-4 w-4 text-sacco-500" />
                      <Input className="pl-10" placeholder="Your bank account or M-Pesa number" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Reason for withdrawal..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a reason for this withdrawal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 text-white">
                {isSubmitting ? "Processing..." : "Withdraw"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
