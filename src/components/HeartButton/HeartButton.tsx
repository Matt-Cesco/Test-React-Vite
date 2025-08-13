import type IHeartButton from "./IHeartButton";

const HeartButton = ({ active, onToggle, className }: IHeartButton) => (
    <button
        type="button"
        aria-label={active ? "Unfavourite" : "Favourite"}
        onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onToggle();
        }}
        className={`rounded-full px-2 py-1 text-sm border bg-white/90 ${active ? "border-red-500 text-red-600" : ""} ${className || ""}`}
    >
        <span aria-hidden="true">&hearts;</span>
    </button>
);

export default HeartButton;
