import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToggleSwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  "data-testid"?: string;
}

export const ToggleSwitch = React.forwardRef<
  HTMLInputElement,
  ToggleSwitchProps
>(({ checked = false, onCheckedChange, disabled = false, className, "data-testid": testId, ...props }, ref) => {
  return (
    <label className={cn("relative inline-block w-12 h-6 cursor-pointer", disabled && "opacity-50 cursor-not-allowed", className)}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        disabled={disabled}
        className="opacity-0 w-0 h-0"
        data-testid={testId}
        {...props}
      />
      <span className={cn(
        "absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300",
        "before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-[3px] before:bottom-[3px]",
        "before:rounded-full before:transition-all before:duration-300",
        checked 
          ? "bg-primary before:translate-x-6 before:bg-primary-foreground" 
          : "bg-secondary before:bg-muted-foreground"
      )} />
    </label>
  );
});

ToggleSwitch.displayName = "ToggleSwitch";
