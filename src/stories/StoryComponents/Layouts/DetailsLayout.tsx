import { Fragment, memo, useEffect, useMemo } from 'react';
import type { ComponentType, ReactElement } from 'react';
import { useRefClassName } from '@/stories/hooks/useRefClassName';
import { useMyTheme } from '@/hooks/useMyTheme';
import { cn } from '@/utils/cn';
import { matchBy, matchExactly, matchFor } from '@/utils/twMatch';
import { useStoryContext } from '../StoryContextProvider';
import { ToolTip } from '../Tooltip';

export type FieldType =
    | 'Name'
    | 'Status'
    | 'Demo'
    | 'Weight'
    | 'Text Color'
    | 'Text Size'
    | 'Icon Color'
    | 'Opacity'
    | 'Border'
    | 'Border Bottom'
    | 'Background'
    | 'Border Color';
const FieldTypeMatchStrategy: Record<FieldType, ReturnType<typeof matchBy>> = {
    Name: () => 'Name',
    Status: () => 'Status',
    Demo: () => 'Demo',
    Weight: matchBy('font-'),
    'Text Color': matchBy('text-xq-', '--'),
    'Text Size': matchBy('text-', '--'),
    'Icon Color': matchBy('fill-xq-', '--'),
    Opacity: matchBy('opacity-', '--', '%'),
    Border: matchBy('border-xq-', '--'),
    'Border Bottom': matchBy('border-b-xq-', '--'),
    Background: matchFor(['bg-xq-', 'bg-'], '--'),
    'Border Color': matchExactly('border-xq-', '--'),
};

const matchFn = (field: string, customMappings?: Record<string, ReturnType<typeof matchBy>>) => {
    const fn = FieldTypeMatchStrategy[field as FieldType] || (customMappings && customMappings[field]);
    if (!fn) return () => `${field} 不存在對應的方法`;
    return fn;
};

const useTableStyles = () => {
    const { readableColor, readableTextColor, readableBorderBottomColor } = useStoryContext();

    // 同步 Storybook 的亮暗效果
    const { getMyTheme, setMyTheme } = useMyTheme();
    useEffect(() => setMyTheme(readableColor === '#000' ? 'light' : 'dark'), [readableColor]);

    return useMemo(() => {
        const IsLight = readableColor === '#000';
        const borderColor = IsLight ? 'border-slate-200' : 'border-slate-600';
        return {
            caption: () => cn('mb-8 caption-top border-b-2 py-2 text-5xl font-bold', readableTextColor, readableBorderBottomColor),
            th: () => cn('min-w-[100px] border-[3px] border-b-slate-200 py-3 text-center text-lg', readableTextColor),
            tr: () =>
                cn('border-b-[1px]', IsLight ? 'bg-slate-100 last-of-type:border-b-slate-300' : 'bg-slate-800 last-of-type:border-b-slate-600'),
            td: (...inputs: string[]) => cn('border-x-2 py-4', borderColor, readableTextColor, ...inputs),
            theme: getMyTheme(),
        };
    }, [readableColor, getMyTheme]);
};

type TBase = {
    intent?: string;
    status?: string;
    theme?: 'dark' | 'light';
    size?: string;
};

type Props_DetailsLayout<TProps extends TBase, TMap extends object = {}> = {
    title: string;
    fields: (FieldType | keyof TMap)[];
    items: TProps[];
    Component: ComponentType<TProps>;
    queryStr?: string;
    sizes?: string[];
    demoClassName?: string;
    toolTipClassName?: string;
    customMappings?: Record<keyof TMap, ReturnType<typeof matchBy>>;
};

export const DetailsLayout = memo(
    <TProps extends TBase, K extends object = {}>({
        title,
        fields,
        items: items,
        queryStr = 'button',
        Component,
        sizes = [''],
        demoClassName = 'min-w-[150px]',
        toolTipClassName = 'left-[166px]',
        customMappings,
    }: Props_DetailsLayout<TProps, K>) => {
        const { caption, th, tr, td, theme } = useTableStyles();

        const newItems = useMemo(() => {
            const res = items.map((props) => {
                const key = `${props.intent}_${props.status}`;

                // prettier-ignore
                let cells: Array<
                    | string 
                    | { type: 'demo'; props: TProps[] } 
                    | { type: 'details'; props: TProps; fields: string[] }
                > = [];

                let leastFields: string[] = [];

                fields.forEach((field) => {
                    switch (field) {
                        case 'Name':
                            cells.push(props.intent || '');
                            break;
                        case 'Status':
                            cells.push(props.status || '');
                            break;
                        case 'Demo':
                            cells.push({ type: 'demo', props: sizes.map((size) => ({ ...props, theme, size })) });
                            break;
                        default:
                            leastFields.push(field as string);
                            break;
                    }
                });

                // 其他剩餘欄位通通歸結為一個 details 物件。
                cells.push({ type: 'details', props: { ...props, theme }, fields: leastFields });
                return { key, cells };
            });
            return res;
        }, [theme, items, fields, sizes]);

        return (
            <div className="flex items-center justify-center">
                <table className="w-[max(80%,800px)] table-auto rounded-md border-dashed">
                    <caption className={caption()}>{title}</caption>
                    <thead>
                        <tr>
                            {(fields as string[]).map((field) => (
                                <th className={th()} key={field}>
                                    {field}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {newItems.map(({ key, cells }) => (
                            <tr className={tr()} key={key}>
                                {cells.map((cell) => {
                                    if (typeof cell === 'string') {
                                        return (
                                            <td className={td('min-w-[120px] text-center')} key={cell}>
                                                {cell}
                                            </td>
                                        );
                                    }
                                    if (cell.type === 'demo') {
                                        return (
                                            <td className={td(demoClassName)} key={'demo'}>
                                                <div className={cn('flex flex-col items-center justify-center gap-1')}>
                                                    {cell.props.map((props) => (
                                                        <DisplayDemo
                                                            queryStr={queryStr}
                                                            toolTipClassName={toolTipClassName}
                                                            key={'demo_' + props.size}>
                                                            <Component {...props} />
                                                        </DisplayDemo>
                                                    ))}
                                                </div>
                                            </td>
                                        );
                                    }
                                    // 這裡將渲染出剩餘的欄位。
                                    if (cell.type === 'details') {
                                        return (
                                            <DisplayDetails
                                                className={td('min-w-[120px] text-center')}
                                                queryStr={queryStr}
                                                fields={cell.fields}
                                                key={'details'}
                                                customMappings={customMappings}>
                                                <Component {...cell.props} />
                                            </DisplayDetails>
                                        );
                                    }
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    },
);

type Props_DisplayDemo<TProps extends TBase> = {
    queryStr: string;
    toolTipClassName?: string;
    children: ReactElement<TProps>;
};
const DisplayDemo = memo(<TProps extends TBase>({ queryStr, toolTipClassName, children }: Props_DisplayDemo<TProps>) => {
    const { ref, className: btnClassName } = useRefClassName(queryStr, [children]);
    const props = children.props;
    return (
        <ToolTip
            className="w-full px-2"
            textStyles={cn('absolute top-0 z-10', toolTipClassName)}
            text={`[${props.intent}_${props.status}.${props.size}]\ ${btnClassName}`}>
            <div ref={ref} className="flex w-full items-center justify-center">
                {children}
            </div>
        </ToolTip>
    );
});

type Props_DisplayDetails<TProps extends TBase> = {
    queryStr: string;
    fields: string[];
    children: ReactElement<TProps>;
    className?: string;
    customMappings?: Record<string, ReturnType<typeof matchBy>>;
};
const DisplayDetails = memo(<TProps extends TBase>({ queryStr, fields, children, className, customMappings }: Props_DisplayDetails<TProps>) => {
    const { ref, className: btnClassName } = useRefClassName<HTMLTableCellElement>(queryStr, [children]);
    return (
        <Fragment>
            <td ref={ref} className="hidden" key={'demo_hidden'}>
                {children}
            </td>
            {fields.map((field) => (
                <td className={className} key={field}>
                    <span>{matchFn(field, customMappings)(btnClassName)}</span>
                </td>
            ))}
        </Fragment>
    );
});