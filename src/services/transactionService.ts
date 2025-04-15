
import { create } from "zustand";

// Define transaction type
export interface Transaction {
  id: number;
  memberId: string;
  member: string;
  type: "deposit" | "withdrawal" | "loan-repayment" | "dividend" | "fee";
  amount: string;
  date: string;
  time: string;
  description?: string;
  reference?: string;
  status: "completed" | "pending" | "failed";
}

// Sample transaction data for demonstration
const initialTransactions: Transaction[] = [
  {
    id: 1,
    memberId: "123456789012", // Current user's ID
    member: "John Kamau",
    type: "deposit",
    amount: "KES 25,000",
    date: "May 15, 2024",
    time: "2:45 PM",
    description: "Monthly contribution",
    reference: "SCO001-DEP-12345",
    status: "completed"
  },
  {
    id: 2,
    memberId: "123456789012", // Current user's ID
    member: "John Kamau",
    type: "withdrawal",
    amount: "KES 15,000",
    date: "May 12, 2024",
    time: "1:30 PM",
    description: "Emergency funds",
    reference: "SCO001-WDR-12346",
    status: "completed"
  },
  {
    id: 3,
    memberId: "987654321098", // Different user
    member: "Peter Njoroge",
    type: "loan-repayment",
    amount: "KES 5,000",
    date: "May 10, 2024",
    time: "11:20 AM",
    description: "Loan installment",
    reference: "SCO001-LNR-12347",
    status: "completed"
  },
  {
    id: 4,
    memberId: "456789012345", // Different user
    member: "Sarah Muthoni",
    type: "dividend",
    amount: "KES 8,500",
    date: "May 5, 2024",
    time: "10:15 AM",
    description: "Annual dividend payout",
    reference: "SCO001-DIV-12348",
    status: "completed"
  },
  {
    id: 5,
    memberId: "123456789012", // Current user's ID
    member: "John Kamau",
    type: "deposit",
    amount: "KES 10,000",
    date: "May 1, 2024",
    time: "9:30 AM",
    description: "Additional savings",
    reference: "SCO001-DEP-12349",
    status: "completed"
  },
  {
    id: 6,
    memberId: "456789012345", // Different user
    member: "David Otieno",
    type: "fee",
    amount: "KES 500",
    date: "April 30, 2024",
    time: "3:45 PM",
    description: "Transaction fee",
    reference: "SCO001-FEE-12350",
    status: "completed"
  },
];

// Helper to create a new transaction
export const createTransaction = (
  memberId: string,
  memberName: string,
  type: Transaction["type"],
  amount: string,
  description?: string
): Transaction => {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", { 
    month: "long", 
    day: "numeric", 
    year: "numeric" 
  });
  const time = now.toLocaleTimeString("en-US", { 
    hour: "numeric", 
    minute: "2-digit", 
    hour12: true
  });
  
  // Format reference based on type
  const typeCode = type === "deposit" ? "DEP" : 
                  type === "withdrawal" ? "WDR" :
                  type === "loan-repayment" ? "LNR" :
                  type === "dividend" ? "DIV" : "FEE";
  
  const reference = `SCO001-${typeCode}-${Math.floor(Math.random() * 100000)}`;
  
  return {
    id: Date.now(), // Use timestamp as unique ID
    memberId,
    member: memberName,
    type,
    amount: `KES ${amount}`,
    date,
    time,
    description: description || type.charAt(0).toUpperCase() + type.slice(1),
    reference,
    status: "completed"
  };
};

// Helper to parse date string to Date object
export const parseTransactionDate = (dateStr: string): Date => {
  const months: Record<string, number> = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  
  const [month, day, year] = dateStr.split(' ');
  return new Date(parseInt(year), months[month], parseInt(day.replace(',', '')));
};

// Create store for transactions
type TransactionStore = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: initialTransactions,
  addTransaction: (transaction) => 
    set((state) => ({
      transactions: [transaction, ...state.transactions]
    })),
}));
