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
