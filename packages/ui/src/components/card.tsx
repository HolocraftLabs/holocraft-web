"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cardHover } from "@holocraft/motion";
import { cn } from "../lib/cn";

export type CardVariant = "default" | "elevated" | "interactive" | "bordered";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default:
    "bg-white/[0.035] border border-white/10",
  elevated:
    "bg-white/[0.065] border border-white/15 shadow-lg",
  interactive:
    "bg-white/[0.035] border border-white/10 cursor-pointer",
  bordered:
    "bg-transparent border border-white/22",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverable = false, children, ...props }, ref) => {
    if (hoverable || variant === "interactive") {
      return (
        <motion.div
          ref={ref}
          variants={cardHover}
          initial="rest"
          whileHover="hover"
          className={cn("backdrop-blur-sm", variantClasses[variant], className)}
          {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("backdrop-blur-sm", variantClasses[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pb-0", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0 flex items-center", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
