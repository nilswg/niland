export declare const $env: () => 'development' | 'preview' | 'publish' | 'production';

/**
 * 解決 React.memo 無法使用泛型問題
 *
 * @example
 * ```tsx
 *  const Component = React.memo<{ foo: string }>((props) => {
 *     return <div>{props.foo}</div>;
 *  });
 * ```
 */
declare module 'react' {
    // augment react types
    function memo<a, b>(component: (props: a) => b): (props: a) => ReactElement | null;

    /**
     * 加 className，一直手動加到很煩
     */
    type FCX<P = {}> = FunctionComponent<P & { className?: string, children?: ReactNode }>;
}
