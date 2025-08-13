import type { ApiResponse, Cocktail } from "@/types";

export const getVisibleList = (searching: boolean, byName?: ApiResponse, byLetter?: ApiResponse): Cocktail[] =>
    searching ? byName?.drink ?? [] : byLetter?.drink ?? [];

export const getLoading = (searching: boolean, lName: boolean, lLetter: boolean) => (searching ? lName : lLetter);

export const getError = (searching: boolean, eName: boolean, eLetter: boolean) => (searching ? eName : eLetter);
