import type IStatBar from "./IStatBar";

const StatBar = ({ label, value, total }: IStatBar) => {
    const pct = total ? Math.round((value / total) * 100) : 0;
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span>{value}</span>
            </div>
            <div className="h-2 rounded bg-gray-200">
                <div className="h-2 rounded bg-black" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
};

export default StatBar;
