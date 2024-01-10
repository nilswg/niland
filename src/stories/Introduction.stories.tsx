import { useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';
import { linkTo } from '@storybook/addon-links';
import type { Meta, StoryFn } from '@storybook/react';
import { BsPalette } from 'react-icons/bs';
import { TbClick, TbInnerShadowBottomLeft } from 'react-icons/tb';
import { useStoryContext } from './StoryComponents/StoryContextProvider';

const meta: Meta = {
    title: 'XQ/Introduction',
};

export default meta;

export const Introduction: StoryFn = () => {
    const { readableTextColor, readableBorderColor, readableBgColor, readableShadowColor } = useStoryContext();
    const { h2, ul, hr, li } = useMemo(() => {
        return {
            h2: () => cn('mt-12 text-center text-5xl font-normal text-slate-500', readableTextColor),
            ul: () => cn('my-8 flex flex-wrap items-center justify-evenly text-4xl', readableTextColor),
            hr: () => cn('border-[1px] border-slate-400', readableBorderColor),
            li: () =>
                cn(
                    'm-2 cursor-pointer rounded-md bg-slate-100 p-3 text-slate-400 shadow-md',
                    readableTextColor,
                    readableBgColor,
                    readableShadowColor,
                ),
        };
    }, [readableTextColor]);

    return (
        <div>
            <small className="hidden">
                <h1 className={readableTextColor}>XQ UI Introduction</h1>
                <h2 className={readableTextColor}>ver {new Date().toString()}</h2>
            </small>
            {[
                {
                    group: 'Style Guideline',
                    items: [
                        { title: 'Color', link: 'XQ/StyleGuideline/Color', Icon: BsPalette },
                        // { title: 'LinearColor', link: 'XQ/StyleGuideline/LinearColor', Icon: BsPalette },
                        // { title: 'Typography', link: 'XQ/StyleGuideline/Typography', Icon: TbTypography },
                        // { title: 'Icon', link: 'XQ/StyleGuideline/Icon', Icon: TbIcons },
                        { title: 'Shadow', link: 'XQ/StyleGuideline/Shadow', Icon: TbInnerShadowBottomLeft },
                        // { title: 'Spacing', link: 'XQ/StyleGuideline/Spacing', Icon: TbSpace },
                        // { title: 'Round', link: 'XQ/StyleGuideline/Round', Icon: TbSquareRounded },
                    ],
                },
                {
                    group: 'Component',
                    items: [
                        { title: 'Button', link: 'XQ/Component/Button/Overview', Icon: TbClick },
                        // { title: 'MenuButton', link: 'XQ/Component/MenuButton/Overview', Icon: TbClick },
                        // { title: 'TabButton', link: 'XQ/Component/TabButton/Overview', Icon: TbClick },
                        // { title: 'SegmentedControl', link: 'XQ/Component/SegmentedControl/Overview', Icon: BsSegmentedNav },
                        // { title: 'SearchInput', link: 'XQ/Component/SearchInput/Overview', Icon: TbInputSearch },
                        // { title: 'XSHighlight', link: 'XQ/Component/XSHighlight', Icon: TbCode },
                        // { title: 'DropDown', link: 'XQ/Component/DropDown/Overview', Icon: TbInputCheck },
                        // { title: 'DropDownMenu', link: 'XQ/Component/DropDownMenu/Playground', Icon: TbListCheck },
                        // { title: 'Carousel', link: 'XQ/Component/Carousel/Playground', Icon: TbCarouselHorizontal },
                    ],
                },
                // {
                //     group: 'Layout',
                //     items: [
                //         { title: 'Navbar', link: 'XQ/Layout/Navbar/Playground', Icon: TbLayoutGrid },
                //         { title: 'Footer', link: 'XQ/Layout/Footer/Playground', Icon: TbLayoutGrid },
                //         { title: 'Grid', link: 'XQ/Layout/Grid', Icon: TbLayoutGrid },
                //     ],
                // },
            ].map(({ group, items }) => (
                <div key={group}>
                    <h2 className={h2()}>{group}</h2>
                    <hr className={hr()} />
                    <ul className={ul()}>
                        {items.map(({ title, link, Icon }) => (
                            <StoryLink className={li()} key={link} linkToStory={link}>
                                <Icon className="inline-block text-xl lg:block lg:text-3xl" />
                                <p className="text-lg lg:block lg:text-2xl">{title}</p>
                            </StoryLink>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

/**
 * @example
 *
 * // input linkToStory
 *
 * const meta: Meta<typeof ColorItem> = {
 *     title: 'XQ/StyleGuideline/Color',  /// <= linkToStory 對應這裡的 title
 * };
 *
 */
type Props_StoryLink = PropsWithChildren<React.HTMLAttributes<HTMLLIElement>> & { linkToStory: string };
const StoryLink = ({ children, linkToStory, className }: Props_StoryLink) => {
    return (
        <li className={className}>
            <button onClick={linkTo(linkToStory)} className="flex items-center justify-center gap-1">
                {children}
            </button>
        </li>
    );
};
