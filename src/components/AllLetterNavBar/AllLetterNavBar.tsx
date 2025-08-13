// src/components/AllLetterNavBar.tsx
import type IAllLetterNavBar from "./IAllLetterNavBar";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const AllLetterNavBar = ({ value, onChange, disabled }: IAllLetterNavBar) => (
    <div className="flex flex-wrap gap-1">
        {LETTERS.map((L) => (
            <button
                key={L}
                type="button"
                disabled={disabled}
                onClick={() => onChange(L)}
                aria-pressed={L === value}
                className={`px-2 py-1 rounded border ${L === value ? "bg-black text-white" : "bg-white"} disabled:opacity-50`}
            >
                {L}
            </button>
        ))}
    </div>
);

export default AllLetterNavBar;
