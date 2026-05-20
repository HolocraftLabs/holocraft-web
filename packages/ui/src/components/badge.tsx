import * as React from "react";
import { cn } from "../lib/cn";

export type BadgeVariant = "default" | "outline" | "accent" | "success" | "warning" | "danger";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-white/80 border border-white/15",
  outline: "bg-transparent text-white/70 border border-white/25",
  accent: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25",
  success: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
  warning: "bg-amber-500/15 text-amber-300 border border-amber-500/25",
  danger: "bg-red-500/15 text-red-300 border border-red-500/25",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium tracking-wide rounded-sm",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = "Badge";
