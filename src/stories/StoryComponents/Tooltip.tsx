import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import { cn } from '@/utils/cn';

type Props_ToolTip = {
    text: string;
    children: ReactNode;
    className?: string;
    textStyles?: string;
};
export const ToolTip: FC<Props_ToolTip> = memo(({ children, text, className, textStyles }) => {
    return (
        <div className={cn('group relative flex', className)}>
            {children}
            <p
                className={cn(
                    'absolute mx-auto',
                    'rounded-md bg-slate-500 px-2 py-1',
                    'text-sm text-slate-100',
                    'opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100',
                    'pointer-events-none',
                    textStyles,
                )}>
                {text}
            </p>
        </div>
    );
});
