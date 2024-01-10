/**
 * client only component
 */
import { useCallback, useMemo, useRef, useState } from 'react';

export const useSearchParams = <T extends { [x: string]: string }>() => {
    if (typeof window === 'undefined') {
        throw new Error('useSearchParams can only be used in client side');
    }

    const urlSearchParams = useRef(new URLSearchParams(window.location.search));
    const [_params, _setParams] = useState(Object.fromEntries(urlSearchParams.current.entries()));

    const setParams = useCallback(
        (newParams: T) => {
            const searchParams = new URLSearchParams(newParams);
            const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
            window.history.replaceState({}, '', newUrl);
            _setParams(newParams);
        },
        [_setParams],
    );

    const params = useMemo(() => {
        return new Map(Object.keys(_params).map((key) => [key, _params[key]]));
    }, [_params]);

    const toArray = useCallback(
        (key: keyof T) => {
            return params.get(key as string)?.split(',') ?? [];
        },
        [params],
    );

    const append = useCallback(
        (key: keyof T, value: T[keyof T]) => {
            const arr = toArray(key);
            const newArr = [...arr, value];
            // console.log({ key, value, arr,  newArr });
            setParams({ [key]: newArr.join(',') } as T);
        },
        [params, setParams],
    );

    const filter = useCallback(
        (key: keyof T, value: T[keyof T]) => {
            const arr = toArray(key);
            const newArr = arr.filter((item) => item !== value);
            // console.log({ key, value, arr,  newArr });
            setParams({ [key]: newArr.join(',') } as T);
        },
        [params, setParams],
    );

    const _readValueFromParams = useCallback(
        (key: keyof T): undefined | string => {
            return params.get(key as string);
        },
        [params],
    );

    const _updateValueAndRereneder = useCallback(
        (key: keyof T, value: T[keyof T]) => {
            setParams({ [key]: value + '' } as T);
        },
        [params, setParams],
    );

    const $p = useMemo(
        () => ({
            get: _readValueFromParams,
            set: _updateValueAndRereneder,
        }),
        [params, setParams],
    );

    return { params, setParams, $p, toArray, append, filter };
};
