import React from 'react';
import { cn } from '@/lib/utils';

// 컨테이너 컴포넌트: 최대 너비 제한 및 반응형 패딩
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
    return (
        <div
            className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
            {...props}
        >
            {children}
        </div>
    );
}
