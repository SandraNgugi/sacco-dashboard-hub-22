
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Phone, Send } from "lucide-react";
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
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }).regex(/^\d+$/, {
    message: "Phone number must contain only digits.",
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

type SendToMobileFormValues = z.infer<typeof formSchema>;

interface SendToMobileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SendToMobileDialog({ isOpen, onClose }: SendToMobileDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SendToMobileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      amount: "",
      description: "",
    },
  });

  const onSubmit = async (values: SendToMobileFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Log the form values
      console.log("Send to mobile form values:", values);
      
      // Show success toast
      toast.success("Money sent successfully", {
        description: `KES ${values.amount} has been sent to ${values.phoneNumber}.`,
      });
      
      // Reset form and close dialog
      form.reset();
      onClose();
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
            Send to Mobile
          </DialogTitle>
          <DialogDescription>
            Send money directly to a mobile number.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-sacco-500" />
                      <Input className="pl-10" placeholder="07XXXXXXXX" {...field} />
                    </div>
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
