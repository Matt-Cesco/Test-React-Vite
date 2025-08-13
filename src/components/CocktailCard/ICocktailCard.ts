import type { Cocktail } from "@/types";

export default interface ICocktailCard {
    cocktail: Cocktail;
    fav: boolean;
    onToggle: () => void;
}
