
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";

interface SendToMobileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: (phoneNumber: string, amount: string, description?: string) => void;
}

export function SendToMobileDialog({ isOpen, onClose, onSend }: SendToMobileDialogProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    const formSchema = z.object({
      phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
      amount: z.string()
        .refine((val) => !isNaN(Number(val)), "Amount must be a number")
        .refine((val) => Number(val) > 0, "Amount must be greater than 0"),
    });
    
    try {
      formSchema.parse({ phoneNumber, amount });
      setErrors({});
      
      // Send the data to parent component
      if (onSend) {
        onSend(phoneNumber, amount, description);
      }
      
      // Reset form
      setPhoneNumber("");
      setAmount("");
      setDescription("");
      
      console.info("Send to mobile form values:", { phoneNumber, amount, description });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleClose = () => {
    // Reset form and errors
    setPhoneNumber("");
    setAmount("");
    setDescription("");
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Money to Mobile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="e.g., 0712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (KES)</Label>
            <Input
              id="amount"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs">{errors.amount}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="e.g., Payment for groceries"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Send Money</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
