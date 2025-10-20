// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pokemon, Item, Location, Berry } from "./types.ts";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  tagTypes: ["Pokemon"],
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
      providesTags: ["Pokemon"],
    }),
    getItemByName: builder.query<Item, string>({
      query: (name) => `item/${name}`,
      providesTags: ["Pokemon"],
    }),
    getLocationByName: builder.query<Location, string>({
      query: (name) => `location/${name}`,
      providesTags: ["Pokemon"],
    }),
    getBerryByName: builder.query<Berry, string>({
      query: (name) => `berry/${name}`,
      providesTags: ["Pokemon"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonByNameQuery,
  useGetItemByNameQuery,
  useGetLocationByNameQuery,
  useGetBerryByNameQuery,
} = pokemonApi;
