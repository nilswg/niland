import type { FC, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { ToolTip } from './Tooltip';

export type Props_ShadowDetails = {
    children: ReactNode;
    title?: string;
    shadow: string;
    className?: string;
};
export const ShadowDetails: FC<Props_ShadowDetails> = ({ children, title, shadow, className }) => {
    return (
        <ToolTip text={shadow} className="">
            <div className={cn('w-[300px] px-4 py-2', className)}>
                {title && <h2>{title}</h2>}
                {children}
            </div>
        </ToolTip>
    );
};

export type Props_ShadowBlock = {
    className: string;
};
export const ShadowBlock: FC<Props_ShadowBlock> = ({ className }) => {
    return <div className={cn('rounded-lg px-4 py-14 ', className)} />;
};