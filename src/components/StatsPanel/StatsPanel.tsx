import StatBar from "../StatBar/StatBar";
import type IStatsPanel from "./IStatsPanel";

const StatsPanel = ({ items }: IStatsPanel) => {
    const total = items.length;
    const alc = items.filter((x) => x.strAlcoholic === "Alcoholic").length;
    const non = items.filter((x) => x.strAlcoholic === "Non alcoholic").length;
    const opt = items.filter((x) => x.strAlcoholic === "Optional alcohol").length;

    const glassMap = new Map<string, number>();
    items.forEach((x) => {
        if (!x.strGlass) return;
        glassMap.set(x.strGlass, (glassMap.get(x.strGlass) ?? 0) + 1);
    });
    const glasses = Array.from(glassMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
                <div className="text-sm font-medium">Alcohol</div>
                <StatBar label="Alcoholic" value={alc} total={total} />
                <StatBar label="Non alcoholic" value={non} total={total} />
                <StatBar label="Optional alcohol" value={opt} total={total} />
            </div>
            <div className="space-y-3">
                <div className="text-sm font-medium">Top glasses</div>
                <div className="space-y-2">
                    {glasses.map(([name, value]) => (
                        <StatBar key={name} label={name} value={value} total={total} />
                    ))}
                    {!glasses.length && <div className="text-sm text-gray-600">No data</div>}
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
