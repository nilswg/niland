import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import { cn } from '@/utils/cn';

type Props_GridLayout = {
    intent?: 'primary' | 'gapless';
    debug?: boolean;
    children: ReactNode;
    className?: string;
    id?: string;
};
export const GridLayout: FC<Props_GridLayout> = memo(({ intent = 'primary', debug, className, children, id }) => (
    <div
        id={id}
        data-layout="grid-layout"
        className={cn(
            'xq-grid-layout',
            // 'relative grid w-full grid-cols-4',
            // 'sm:grid-cols-4',
            // 'md:grid-cols-8',
            // 'lg:grid-cols-12',
            // 'xl:max-w-[1176px] xl:grid-cols-12',
            intent !== 'gapless' ? 'gap-x-[12px] sm:gap-x-[24px]' : '',
            // debug ? 'bg-red-500 sm:bg-orange-500 md:bg-yellow-500 lg:bg-green-500 xl:bg-blue-400' : '',
            // debug
            //     ? 'before:absolute before:text-white before:content-["xs"] sm:before:content-["sm"] md:before:content-["md"] lg:before:content-["lg"] xl:before:content-["xl"]'
            //     : '',
            // debug ? 'first-of-type:bg-black' : '',
            className,
        )} //
    >
        {children}
        {debug && <DebugGridColumns />}
    </div>
));

const DebugGridColumns: FC = memo(() => {
    return (
        <div
            className={cn(
                'pointer-events-none',
                'absolute inset-0',
                'xq-grid-layout-inherit',
                'opacity-30',
                'text-right text-2xl text-white', //
            )}>
            {Array(12)
                .fill(0)
                .map((_, i) => {
                    const base = /*@tw:*/ 'col-span-1 border-x-1 border-white bg-pink-400 pr-2';
                    if (i < 4) return <div className={base}>{i + 1}</div>;
                    if (i < 8) return <div className={cn(base, 'hidden md:grid')}>{i + 1}</div>;
                    if (i < 12) return <div className={cn(base, 'hidden lg:grid')}>{i + 1}</div>;
                    else return null;
                })}
            <div className="absolute grid place-content-baseline">
                <p className='bg-black p-4 text-3xl uppercase text-white before:content-["xs"] sm:before:content-["sm"] md:before:content-["md"] lg:before:content-["lg"] xl:before:content-["xl"]' />
            </div>
        </div>
    );
});