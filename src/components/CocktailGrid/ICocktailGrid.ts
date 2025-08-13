import type { Cocktail } from "@/types";

export default interface ICocktailsGrid {
    items: Cocktail[];
    favs: Set<string>;
    onToggle: (id: string) => void;
}
