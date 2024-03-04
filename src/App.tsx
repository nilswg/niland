import { Counter } from '@/components/Counter'; // "@/components" from "src" directory
import reactLogo from '/react.svg'; // "/" from "public" directory
import viteLogo from '/vite.svg';

function App() {
    return (
        <div className="grid min-h-screen w-screen place-content-center bg-black">
            <div>
                <div className="flex justify-center gap-2">
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className="w-[128px]" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="w-[128px]" alt="React logo" />
                    </a>
                </div>
                <Counter />
            </div>
        </div>
    );
}

export default App;
