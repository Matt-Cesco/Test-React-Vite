import { useEffect, useRef } from "react";
import type IFiltersInUrl from "./IFiltersInUrl";

const FiltersInUrl = ({ search, letter, onRestore }: IFiltersInUrl) => {
    const didRestore = useRef(false);

    useEffect(() => {
        if (didRestore.current) return;
        const p = new URLSearchParams(window.location.search);
        const s = p.get("q") ?? undefined;
        const l = p.get("letter") ?? undefined;
        onRestore({ search: s, letter: l?.toUpperCase() });
        didRestore.current = true;
    }, [onRestore]);

    useEffect(() => {
        const p = new URLSearchParams();
        const s = search.trim();
        if (s) p.set("q", s);
        if (letter) p.set("letter", letter);
        const next = `${window.location.pathname}${p.toString() ? `?${p.toString()}` : ""}`;
        const current = `${window.location.pathname}${window.location.search}`;
        if (next !== current) window.history.replaceState(null, "", next);
    }, [search, letter]);

    return null;
};

export default FiltersInUrl;
