export const CocktailAlcohol = {
    Alcoholic: "Alcoholic",
    NonAlcoholic: "Non alcoholic",
    OptionalAlcohol: "Optional alcohol",
};

export type CocktailAlcohol = (typeof CocktailAlcohol)[keyof typeof CocktailAlcohol];

export interface Cocktail {
    
}