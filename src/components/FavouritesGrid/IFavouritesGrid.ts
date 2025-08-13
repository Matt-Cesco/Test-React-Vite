import type { Cocktail } from "@/types";

export default interface IFavouritesGrid {
    items: Cocktail[];
    favs: Set<string>;
    onToggle: (id: string) => void;
    max?: number;
}
