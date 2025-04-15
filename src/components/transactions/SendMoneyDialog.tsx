
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Send, User } from "lucide-react";
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
} from "@/components/ui/form";

const formSchema = z.object({
  recipient: z.string().min(2, {
    message: "Recipient name must be at least 2 characters.",
  }),
  accountNumber: z.string().min(5, {
    message: "Account number must be at least 5 characters.",
  }),
  amount: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Amount must be a positive number.",
    }
  ),
  description: z.string().optional(),
});

type SendMoneyFormValues = z.infer<typeof formSchema>;

interface SendMoneyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (recipient: string, accountNumber: string, amount: string, description?: string) => void;
}

export function SendMoneyDialog({ isOpen, onClose, onSend }: SendMoneyDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SendMoneyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "",
      accountNumber: "",
      amount: "",
      description: "",
    },
  });

  const onSubmit = async (values: SendMoneyFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Log the form values
      console.log("Send money form values:", values);
      
      // Call the parent component's onSend handler
      onSend(
        values.recipient,
        values.accountNumber,
        values.amount,
        values.description
      );
      
      // Reset form
      form.reset();
    } catch (error) {
      toast.error("Failed to send money", {
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
            <Send className="h-5 w-5 text-sacco-700" />
            Send Money
          </DialogTitle>
          <DialogDescription>
            Send money to another member or external account.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-sacco-500" />
                      <Input className="pl-10" placeholder="John Doe" {...field} />
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
                    <Input placeholder="SCO-12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Payment for..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Money"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
