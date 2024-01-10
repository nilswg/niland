import React from 'react';
import { cn } from '@/utils/cn';
import { ColorDetails, ColorItem } from './ColorBlock';
import { useStoryContext } from './StoryContextProvider';
import { ToolTip } from './Tooltip';

type Props_DisplayColors = {
    colors: Array<{ colorName: string; color_light: { value: string; fullName: string }; color_dark: { value: string; fullName: string } }>;
};

const useTableStyles = () => {
    const { readableColor, readableTextColor, readableBorderBottomColor } = useStoryContext();
    const isLight = readableColor === '#000';
    const { caption, th, tr, td, h2 } = React.useMemo(() => {
        return {
            caption: () => cn('mb-8 caption-top border-b-2 py-2 text-5xl font-bold', readableTextColor, readableBorderBottomColor),
            th: (...inputs: string[]) =>
                cn('border-b-[1px] border-b-slate-200 px-6 py-4 text-left text-2xl', readableTextColor, readableBorderBottomColor, ...inputs),
            tr: () =>
                readableColor === '#000'
                    ? cn('bg-slate-50 even:bg-slate-100 last-of-type:border-b-8 last-of-type:border-b-slate-300')
                    : cn('bg-slate-700 even:bg-slate-800 last-of-type:border-b-8 last-of-type:border-b-slate-600'),
            td: () => (readableColor === '#000' ? cn('border-b-2 border-slate-200 p-4') : cn('border-b-2 border-slate-600 p-4')),
            h2: () => cn('pl-2 text-xl font-bold', readableTextColor),
        };
    }, [readableColor]);

    return {
        isLight,
        caption,
        th,
        tr,
        td,
        h2,
    };
};

export const DisplayColors: React.FC<Props_DisplayColors> = ({ colors }) => {
    const { caption, th, tr, td, h2 } = useTableStyles();

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
                    {colors.map(({ colorName, color_light, color_dark }) => (
                        <tr className={tr()} key={colorName}>
                            <td className={td()}>
                                <h2 className={h2()}>{colorName}</h2>
                            </td>
                            <td className={td()}>
                                <ToolTip text={color_light.fullName}>
                                    <ColorDetails token={color_light.value}>
                                        <ColorItem hexColor={color_light.value} />
                                    </ColorDetails>
                                </ToolTip>
                            </td>
                            <td className={td()}>
                                <ToolTip text={color_dark.fullName}>
                                    <ColorDetails token={color_dark.value}>
                                        <ColorItem hexColor={color_dark.value} />
                                    </ColorDetails>
                                </ToolTip>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
