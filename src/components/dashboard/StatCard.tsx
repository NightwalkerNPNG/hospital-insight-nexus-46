
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  className,
  valuePrefix = "",
  valueSuffix = ""
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'number' ? value : parseInt(value) || 0;
  
  // Animate value counting up
  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1000;
      const steps = 20;
      const stepDuration = duration / steps;
      const stepValue = numericValue / steps;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep += 1;
        setDisplayValue(Math.min(Math.floor(stepValue * currentStep), numericValue));
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
      
      return () => clearInterval(timer);
    } else {
      setDisplayValue(0);
    }
  }, [value, numericValue]);
  
  const displayedValue = typeof value === 'number' ? displayValue : value;

  return (
    <div className={cn("dashboard-card", className)}>
      <div className="flex justify-between">
        <div>
          <p className="stat-label">{title}</p>
          <h4 className="stat-value mt-2 flex items-baseline">
            {valuePrefix}
            <span className="animate-count-up">{displayedValue}</span>
            {valueSuffix}
          </h4>
          
          {trend && (
            <div className="mt-1 flex items-center">
              <span className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-status-success" : "text-status-error"
              )}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="ml-2 text-xs text-muted-foreground">from last week</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="rounded-full bg-muted p-2 text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
