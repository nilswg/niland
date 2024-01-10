import type { FC } from 'react';
import { useMemo } from 'react';
import { cn } from '@/utils/cn';
import { ShadowBlock, ShadowDetails } from './ShadowBlock';
import { useStoryContext } from './StoryContextProvider';

type Props = {
    shadows: Array<{ title: string; shadow: string; shadow_dark: string }>;
};
export const DisplayShadows: FC<Props> = ({ shadows }) => {
    const { readableColor, readableTextColor, readableBorderBottomColor } = useStoryContext();

    const { caption, th, tr, td, h2 } = useMemo(() => {
        return {
            caption: () => cn('mb-8 caption-top border-b-2 py-2 text-5xl font-bold', readableTextColor, readableBorderBottomColor),
            th: (...inputs: string[]) =>
                cn('border-b-[1px] border-b-slate-200 px-6 py-4 text-left text-2xl', readableTextColor, readableBorderBottomColor, ...inputs),
            tr: () =>
                readableColor === '#000'
                    ? cn('bg-slate-100 last-of-type:border-b-8 last-of-type:border-b-slate-300')
                    : cn('bg-slate-800 last-of-type:border-b-8 last-of-type:border-b-slate-600'),
            td: (...inputs: string[]) => cn('border-b-2 p-4', readableColor === '#000' ? 'border-slate-200' : 'border-slate-600', ...inputs),
            h2: () => cn('pl-2 text-xl font-bold', readableTextColor),
        };
    }, [readableColor]);

    return (
        <div>
            <table className="table-auto rounded-md border-dashed">
                <caption className={caption()}> XQ Site Colors </caption>
                <thead>
                    <tr>
                        <th className={th('pl-6')}>Color Name</th>
                        <th className={th('text-center')}>Light</th>
                        <th className={th('text-center')}>Dark</th>
                    </tr>
                </thead>
                <tbody>
                    {shadows.map(({ title, shadow, shadow_dark }) => (
                        <tr className={tr()} key={shadow}>
                            <td className={td()}>
                                <h2 className={h2()}>{title}</h2>
                            </td>
                            <td className={td('bg-white')}>
                                <ShadowDetails shadow={shadow} className="text-slate-900">
                                    <ShadowBlock className={cn(shadow)} />
                                </ShadowDetails>
                            </td>
                            <td className={td('bg-black')}>
                                <ShadowDetails shadow={shadow_dark} className="text-slate-100">
                                    <ShadowBlock className={cn(shadow_dark)} />
                                </ShadowDetails>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
