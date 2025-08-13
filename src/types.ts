export const CocktailAlcohol = {
    Alcoholic: "Alcoholic",
    NonAlcoholic: "Non alcoholic",
    OptionalAlcohol: "Optional alcohol",
};

export type Alcohol = (typeof CocktailAlcohol)[keyof typeof CocktailAlcohol];

export interface Cocktail {
    idDrink: string;
    strDrink: string
    strAlcoholic: Alcohol;
    strCategory?: string;
    strGlass?: string;
    strInstructions?: string;
    strDrinkThumb?: string;
}

export type ApiResponse = {
    drink: Cocktail[] | null
}