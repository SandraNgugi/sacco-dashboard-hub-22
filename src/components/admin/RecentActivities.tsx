
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, CreditCard, AlertCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    action: "User access changed",
    description: "Admin rights granted to John Kamau",
    time: "2 hours ago",
    icon: Shield,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    action: "New member registered",
    description: "Mary Wanjiku created an account",
    time: "3 hours ago",
    icon: User,
    iconColor: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    action: "Loan approved",
    description: "KES 150,000 for Peter Njoroge",
    time: "5 hours ago",
    icon: CreditCard,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    id: 4,
    action: "System alert",
    description: "Backup completed successfully",
    time: "1 day ago",
    icon: AlertCircle,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-100",
  },
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className={`${activity.bgColor} p-2 rounded-full mt-0.5`}>
                <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-slate-900">{activity.action}</p>
                <p className="text-sm text-slate-500">{activity.description}</p>
                <p className="text-xs text-slate-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
