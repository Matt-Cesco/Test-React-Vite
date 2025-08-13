import type { Cocktail } from "@/types";

export default interface ICocktailModal {
    cocktail: Cocktail;
    trigger: React.ReactNode;
}
