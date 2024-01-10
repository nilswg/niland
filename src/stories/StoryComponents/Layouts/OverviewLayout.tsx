import { Children, isValidElement, useMemo } from 'react';
import type { ComponentType, ReactElement, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { useStoryContext, useStoryTheme } from '../StoryContextProvider';

const useTableStyles = () => {
    const { theme } = useStoryTheme();
    return useMemo(() => {
        const { readableTextColor, readableBgColor, readableBorderBottomColor } = useStoryContext();
        return {
            h1: () =>
                cn('mb-8 w-full caption-top border-b-2 py-2 text-center text-5xl font-bold', readableTextColor, readableBorderBottomColor),
            hr: () => cn('border-b-1 ', readableBorderBottomColor),
            group: () => cn('rounded-md border-x-[2px]', readableTextColor, readableBgColor, readableBgColor),
            li: (...inputs: string[]) => cn('mb-2 flex items-center gap-2 px-4 py-2 last:mb-0', readableTextColor, ...inputs),
            theme,
        };
    }, [theme]);
};

type TBase = {
    intent?: string;
    status?: string;
    theme?: 'dark' | 'light';
    size?: string;
};
type Props_Overview<TProps extends TBase> = {
    title: string;
    items?: TProps[];
    sizes?: string[];
    Component?: ComponentType<TProps>;
    compClassName?: string;
    label?: ReactElement<{ className: string }>;
    children: ReactNode;
};

/**
 * @example
 * ```
 *  const ExampleOverview = ({ items }: { items: Props_Example[] }) => {
 *      return (
 *          <OverviewLayout<Props_Example>
 *              title="XQ Examples Overview"
 *              items={items}
 *              sizes={['md', 'lg']} // default sizes = ['']
 *              Component={Example}
 *          />
 *      );
 *  };
 * ```
 */
export const OverviewLayout = <TProps extends TBase>({
    title,
    // items,
    sizes = [''],
    // Component,
    compClassName,
    label,
    children,
}: Props_Overview<TProps>) => {
    const { h1, hr, group, li, theme } = useTableStyles();

    /**
     * 依照 intent 分類重新組合 items
     */
    // const newItems = useMemo(() => {
    //     const groupedByIntent = items.reduce(
    //         (prev, curr) => {
    //             const intent = curr.intent || 'default';
    //             if (!prev[intent]) prev[intent] = [];
    //             sizes.forEach((size) => {
    //                 prev[intent].push({ ...curr, size, theme }); // 加入 size、theme
    //             });
    //             return prev;
    //         },
    //         {} as Record<string, TProps[]>,
    //     );
    //     return groupedByIntent;
    // }, [theme, sizes, items]);

    let DisplayComp: any | null = null;

    const intent_props_map = Children.toArray(children).reduce(
        (prev, curr) => {
            if (!isValidElement(curr)) {
                return prev; // filter 掉不是 ReactElement 的 children
            }

            /**
             * 取得 DisplayComp
             */
            if (!DisplayComp) {
                DisplayComp = curr.type;
            }

            /**
             * 透過 props.intent 分類，產生 intent_props_map
             */
            const intent = (curr.props as TProps).intent || 'primary';
            if (!prev[intent]) prev[intent] = [];
            sizes.forEach((size) => {
                prev[intent].push({ ...curr.props, size, theme }); // 加入 size、theme
            });
            return prev;
        },
        {} as Record<string, TProps[]>,
    );

    return (
        <div className="flex flex-col items-center justify-center px-4">
            <h1 className={h1()}>{title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-2">
                {Object.keys(intent_props_map).map((intent) => {
                    const items = intent_props_map[intent];

                    /**
                     * 依照 intent 分類重新組合 items
                     */
                    return (
                        <div className={group()} key={`${title}_${intent}`}>
                            <h1 className="p-2 text-2xl first-letter:uppercase">{intent}</h1>
                            <hr className={hr()} />
                            <ul className="py-4">
                                {items.map((props) => (
                                    <OverviewItem
                                        className={li()}
                                        key={`${props.intent}_${props.status}_${props.size}`}
                                        compClassName={compClassName}
                                        label={label}>
                                        <DisplayComp {...props} />
                                    </OverviewItem>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

type Props_OverviewItem<TProps extends TBase> = {
    children: ReactElement<TProps>;
    className?: string;
    compClassName?: string;
    label?: ReactElement<{ className: string }>;
};
const OverviewItem = <TProps extends TBase>({ children, className, compClassName = 'min-w-[120px]', label }: Props_OverviewItem<TProps>) => {
    const { status, size } = children.props;
    const labelClassName = label?.props.className ?? '';
    return (
        <li className={className}>
            <p className={cn('w-[100px]', labelClassName)}>
                {status}
                {size && `.${size}`}
            </p>
            <div className={cn('flex justify-center', compClassName)}>{children}</div>
        </li>
    );
};