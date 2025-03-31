
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRangeFilterProps {
  onDateRangeChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  onClearFilter: () => void;
  className?: string;
}

export function DateRangeFilter({ 
  onDateRangeChange,
  onClearFilter,
  className 
}: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSelectDate = (date: Date | undefined) => {
    if (!startDate || (startDate && endDate) || (startDate && date && date < startDate)) {
      setStartDate(date);
      setEndDate(undefined);
    } else {
      setEndDate(date);
      setIsCalendarOpen(false);
      if (startDate && date) {
        onDateRangeChange(startDate, date);
      }
    }
  };

  const handleClearFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    onClearFilter();
  };

  const displayText = () => {
    if (startDate && endDate) {
      return `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
    } else if (startDate) {
      return `From ${format(startDate, "MMM d, yyyy")}`;
    } else {
      return "Filter by Date";
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={cn(
              "border-sacco-200 text-sacco-700",
              (startDate || endDate) && "bg-sacco-50"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {displayText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate || startDate}
            onSelect={handleSelectDate}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
            footer={
              <div className="px-4 pb-2 pt-0 text-sm text-sacco-500">
                {startDate ? (
                  endDate ? (
                    <span>
                      Range: {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
                    </span>
                  ) : (
                    <span>Select end date</span>
                  )
                ) : (
                  <span>Select start date</span>
                )}
              </div>
            }
          />
        </PopoverContent>
      </Popover>
      
      {(startDate || endDate) && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleClearFilter}
          className="h-9 w-9 p-0"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear date filter</span>
        </Button>
      )}
    </div>
  );
}
