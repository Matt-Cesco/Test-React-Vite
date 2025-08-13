import { useEffect, useMemo, useState } from "react";
import type { Cocktail } from "@/types";

const isCocktail = (x: any): x is Cocktail => x && typeof x === "object" && typeof x.idDrink === "string" && typeof x.strDrink === "string";

const useFavourites = () => {
    const [favs, setFavs] = useState<Cocktail[]>(() => {
        try {
            const raw = JSON.parse(localStorage.getItem("favs") || "[]");
            if (!Array.isArray(raw)) return [];
            const fixed = raw
                .map((v) => (typeof v === "string" ? null : v))
                .filter(isCocktail);
            localStorage.setItem("favs", JSON.stringify(fixed));
            return fixed;
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("favs", JSON.stringify(favs));
    }, [favs]);

    const ids = useMemo(() => new Set(favs.map((f) => f.idDrink)), [favs]);

    const toggle = (item: Cocktail) =>
        setFavs((prev) => (prev.some((f) => f.idDrink === item.idDrink) ? prev.filter((f) => f.idDrink !== item.idDrink) : [item, ...prev]));

    return { favs, ids, toggle };
};

export default useFavourites;
