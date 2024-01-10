import { Children, cloneElement, createContext, isValidElement, memo, useCallback, useContext, useLayoutEffect, useMemo } from 'react';
import type { ChangeEvent, FC, ReactElement, ReactNode, RefObject } from 'react';
import { useResizableWidth } from '@/stories/hooks/useResizeObserver';
import { cn } from '@/utils/cn';
import { useStoryTheme } from '../StoryContextProvider';

export type ResizeType = 'hug' | 'fill' | 'resize-x';

const resizeMap: Record<ResizeType, string> = {
    hug: 'w-auto',
    fill: 'w-full',
    'resize-x': 'resize-x overflow-hidden',
};

type TBase = {
    intent?: string;
    status?: string;
    theme?: 'dark' | 'light';
    size?: string;
};

type Props_PlaygroundLayout<TProps extends TBase> = {
    resize?: ResizeType;
    className?: string;
    children: ReactElement<TProps>;
    minWidth?: number;
};

type Props_Context = {
    bgColor: string;
    label: () => string;
    input: (...inputs: string[]) => string;
    theme: 'dark' | 'light';
};
const Context = createContext<Props_Context>({} as Props_Context);
const useTableStyles = () => useContext(Context);
const PlaygroundStylesContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { theme } = useStoryTheme();
    return (
        <Context.Provider
            value={useMemo(() => {
                console.log('useTableStyles', theme);
                const isDark = theme === 'dark';
                const bgColor = isDark ? 'bg-black' : 'bg-slate-100';
                const textColor = isDark ? 'text-slate-300' : 'text-slate-800';
                const borderBottomColor = isDark ? 'border-b-slate-300' : 'border-b-slate-800';
                const label = () => cn(textColor);
                const input = (...inputs: string[]) =>
                    cn('w-[100px] border-b-[1px] bg-transparent', bgColor, textColor, borderBottomColor, ...inputs);
                return {
                    bgColor,
                    label,
                    input,
                    theme,
                };
            }, [theme])}>
            {children}
        </Context.Provider>
    );
};

export const PlaygroundLayout = memo(<TProps extends TBase>(props: Props_PlaygroundLayout<TProps>) => {
    return (
        <PlaygroundStylesContextProvider>
            <Playground {...props} />
        </PlaygroundStylesContextProvider>
    );
});

const Playground = memo(<TProps extends TBase>({ children, resize = 'hug', className, minWidth }: Props_PlaygroundLayout<TProps>) => {
    const { ref, width, setWidth } = useResizableWidth<HTMLDivElement>();
    const { bgColor, theme } = useTableStyles();

    // 根據 resize 模式，設置元件的寬度。
    useResizeLayoutEffect(ref, resize, width, minWidth);

    return (
        <div className={cn('flex h-screen w-screen flex-col items-center justify-center', bgColor, className)}>
            <CurrentWidth resize={resize} width={width} setWidth={setWidth} />
            {/* 務必使用 box-sizing: content-box 作為測試外框，否則會持續變小 */}
            <div
                className={cn(
                    'relative box-content overflow-hidden',
                    'border-2 border-dashed border-yellow-400',
                    resizeMap[resize], // 設置 resize 模式
                )}
                ref={ref}>
                {/* 提示用的外框 padding 要在這裡設定，否則會讓偵測到的寬度變大 */}
                <div className="p-1">
                    {Children.map(children, (child) => {
                        if (isValidElement(child)) {
                            return cloneElement(child, { ...child.props, theme });
                        }
                    })}
                </div>
            </div>
        </div>
    );
});

const CurrentWidth: FC<{ resize: ResizeType; width: number; setWidth: (width: number) => void }> = memo(({ resize, width, setWidth }) => {
    const { label, input } = useTableStyles();

    // change width
    const handleWidthChanged = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (resize !== 'resize-x') {
                alert('必須是 resize-x 模式才能調整寬度');
                return;
            }
            setWidth(parseInt(e.target.value));
        },
        [resize],
    );

    return (
        <div className="mb-2 flex text-2xl">
            <label className={label()}>Width:&nbsp;</label>
            <input
                type="number"
                className={input('text-center')}
                value={width.toFixed(0)}
                onChange={handleWidthChanged}
                disabled={resize !== 'resize-x'}
                step={1}
            />
            <span className={label()}>&nbsp;px</span>
        </div>
    );
});

/**
 * 使用過 resize-x 之後，它會自動在 style 中設定 width屬性(這是CSS效果)，
 * 且換到其他模式時，要清除重置(設值為 null)對 width 的設定，避免副作用或影響。
 *
 * 這裡改用 useLayoutEffect，因為 useEffect 會在 render 後才執行，會有閃爍的問題。
 *
 * @param ref 觀察的 DOM 元素
 * @param resize resize 模式
 * @param width 當前寬度
 * @param minWidth 元件的最小寬度也是起始寬度
 */
const useResizeLayoutEffect = (ref: RefObject<HTMLDivElement>, resize: ResizeType, width: number, minWidth?: number) => {
    // console.log('useResizeLayoutEffect', resize, width);
    useLayoutEffect(() => {
        if (ref?.current) {
            /**
             * 設置最小寬度，避免 resize-x 時寬度為 0 或過小。
             */
            if (minWidth) {
                ref.current.style.setProperty('min-width', `${minWidth}px`);
            }
            /**
             * resize-x 模式下的寬度設定。
             */
            if (resize !== 'resize-x') {
                ref.current.style.removeProperty('width');
            } else {
                ref.current.style.setProperty('width', `${width}px`);
            }
        }
    }, [resize, width]);
};