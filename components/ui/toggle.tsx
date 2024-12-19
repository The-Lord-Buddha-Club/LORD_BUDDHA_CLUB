'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-muted hover:text-muted-foreground',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        soft: 'bg-muted/20 hover:bg-muted/40',
        solid: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5 text-xs',
        lg: 'h-11 px-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  ripple?: boolean;
}

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant, size, ripple = true, ...props }, ref) => {
    const [rippleEffect, setRippleEffect] = React.useState({ x: 0, y: 0, show: false });

    const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setRippleEffect({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        show: true,
      });
    };

    return (
      <TogglePrimitive.Root
        ref={ref}
        className={cn(toggleVariants({ variant, size, className }))}
        {...props}
        onClick={(e) => {
          if (ripple) handleRipple(e);
          props.onClick?.(e);
        }}
      >
        {props.children}
        {ripple && rippleEffect.show && (
          <motion.span
            className="absolute bg-white/30 rounded-full pointer-events-none"
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              left: rippleEffect.x - 100,
              top: rippleEffect.y - 100,
            }}
            onAnimationComplete={() => setRippleEffect((prev) => ({ ...prev, show: false }))}
          />
        )}
      </TogglePrimitive.Root>
    );
  }
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };

