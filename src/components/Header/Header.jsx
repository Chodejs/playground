import { devLog, toggleHighlight } from "../../Cfunc/app";

export default function Header() {

    return (
        <header
            className="flex w-full justify-between items-center sticky top-0 z-10 
                   bg-surface border-b border-border shadow-sm 
                   h-header px-lg"
        >
            <h2
             className="text-primary text-2xl font-bold font-inherit m-0"
             >
                Welcome to Mara Central API
            </h2>
        </header>
    );
};