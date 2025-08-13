import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "@/types";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

export const cocktailApi = createApi({
    reducerPath: "cocktailApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (b) => ({
        searchByName: b.query<ApiResponse, string>({
            query: (q) => `search.php?s=${encodeURIComponent(q)}`,
        }),
        searchByLetter: b.query<ApiResponse, string>({
            query: (l) => `search.php?f=${encodeURIComponent(l)}`,
        }),
        lookupById: b.query<ApiResponse, string>({
            query: (id) => `lookup.php?i=${id}`,
        }),
    }),
});

export const { useSearchByNameQuery, useSearchByLetterQuery, useLookupByIdQuery } = cocktailApi;