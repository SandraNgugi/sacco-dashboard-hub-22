
import { useEffect, useState } from "react";

interface UserGreetingProps {
  userName: string;
}

export function UserGreeting({ userName }: UserGreetingProps) {
  const [greeting, setGreeting] = useState("");
  
  useEffect(() => {
    // Get the current hour to determine greeting
    const currentHour = new Date().getHours();
    
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);
  
  return (
    <div className="mb-6 animate-fade-in">
      <h2 className="text-2xl font-medium text-sacco-700">
        {greeting}, <span className="font-semibold text-sacco-900">{userName}</span>
      </h2>
      <p className="text-sacco-600 mt-1">Welcome to Times U Sacco</p>
    </div>
  );
}
