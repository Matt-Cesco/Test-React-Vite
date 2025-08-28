import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "@/types";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

const toApiResponse = (raw: unknown): ApiResponse => {
    const drinks = (raw as { drinks?: unknown })?.drinks;
    return { drink: Array.isArray(drinks) ? (drinks as any) : null };
};

type HttpError = { status: number; message: string };

export const occuredError = (resp: { status: number; data: unknown }): HttpError => {
    const message = typeof (resp.data as any)?.message === "string" ? (resp.data as any).message : "Request failed";
    return { status: resp.status, message };
};

export const cocktailApi = createApi({
    reducerPath: "cocktailApi",
    refetchOnReconnect: true,
    keepUnusedDataFor: 60,
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (b) => ({
        searchByName: b.query<ApiResponse, string>({
            query: (q) => `search.php?s=${encodeURIComponent(q)}`,
            transformResponse: toApiResponse,
            transformErrorResponse: occuredError,
        }),
        searchByLetter: b.query<ApiResponse, string>({
            query: (l) => `search.php?f=${encodeURIComponent(l)}`,
            transformResponse: toApiResponse,
            transformErrorResponse: occuredError,
        }),
        lookupById: b.query<ApiResponse, string>({
            query: (id) => `lookup.php?i=${encodeURIComponent(id)}`,
            transformResponse: toApiResponse,
            transformErrorResponse: occuredError,
        }),
    }),
});

export const { useSearchByNameQuery, useSearchByLetterQuery, useLookupByIdQuery } = cocktailApi;

// for runtime validation (without writing tests), is possible to generate Zod schemas from OpenAPI and validate responses at runtime (package is openapi-zod-client). 
// In this way errors surface immediately without bespoke tests.
// https://openapi-zod-client.vercel.app/
// with codegen create types and interfacces from the schema

// for cocktail for example, the trasnformedREspons can be something like this:

// transformResponse: (raw: { drinks: RemoteDrink[] | null }) => ({
//   drink: raw.drinks ? raw.drinks.map(toCocktail) : null,
// })