import type { FC } from 'react';
import { memo, useState } from 'react';

export const Counter: FC = memo(() => {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    return (
        <div className="w-full text-white">
            <h1 className="mt-4 text-center text-4xl">Counter</h1>
            <p className="my-8 text-center text-4xl">{count}</p>
            <div className="flex justify-center gap-2">
                <button className="border-[1px] border-white p-4" onClick={increment}>
                    Increment
                </button>
                <button className="border-[1px] border-white p-4" onClick={decrement}>
                    Decrement
                </button>
            </div>
        </div>
    );
});
