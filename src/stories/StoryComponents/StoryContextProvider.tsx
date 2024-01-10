import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo } from 'react';
import type { StoryContext } from '@storybook/react';
import { useMyTheme } from '../../hooks/useMyTheme'
import { useStoryBookReadableColor } from '../hooks/useReadableColor';


type MyStorybookContext = {
    readableColor: string;
    readableTextColor: string;
    readableBorderColor: string;
    readableBorderBottomColor: string;
    readableBgColor: string;
    readableShadowColor: string;
};
export const MyStorybookContext = createContext({} as MyStorybookContext);
export const useStoryContext = () => useContext(MyStorybookContext);
export const StoryContextProvider: FC<{ context: StoryContext; children: ReactNode }> = ({ context, children }) => {
    const readableColor = useStoryBookReadableColor(context);
    return (
        <MyStorybookContext.Provider
            value={useMemo(() => {
                const colors =
                    /*cn(*/ readableColor === '#000' // isLight
                        ? {
                              readableTextColor: 'text-slate-800',
                              readableBorderColor: 'border-slate-800',
                              readableBorderBottomColor: 'border-slate-800',
                              readableBgColor: 'bg-slate-100',
                              readableShadowColor: 'shadow-slate-400',
                          }
                        : {
                              readableTextColor: 'text-white',
                              readableBorderColor: 'border-white',
                              readableBorderBottomColor: 'border-b-white',
                              readableBgColor: 'bg-slate-800',
                              readableShadowColor: 'shadow-gray-700',
                          }; /*)*/

                return { readableColor, ...colors };
            }, [readableColor])}>
            {children}
        </MyStorybookContext.Provider>
    );
};

export const useStoryTheme = () => {
    const { readableColor } = useStoryContext();

    // 同步 Storybook 的亮暗效果
    const { getMyTheme, setMyTheme } = useMyTheme();
    useEffect(() => setMyTheme(readableColor === '#000' ? 'light' : 'dark'), [readableColor]);
    return {
        theme: getMyTheme(),
    };
};
