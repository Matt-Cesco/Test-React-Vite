export interface Cocktail {
    idDrink: string;
    strDrink: string;
    strAlcoholic: string;
    strCategory?: string;
    strGlass?: string;
    strInstructions?: string;
    strDrinkThumb?: string;
}

export type ApiResponse = {
    drink: Cocktail[] | null
}