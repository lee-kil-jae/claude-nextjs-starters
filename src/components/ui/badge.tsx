import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                secondary:
                    'border border-transparent bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
                destructive:
                    'border border-transparent bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                outline: 'border border-slate-200 text-slate-950 dark:border-slate-800 dark:text-slate-50',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
