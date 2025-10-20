// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  PokemonFromApi,
  Pokemon,
  ItemFromApi,
  LocationFromApi,
  BerryFromApi,
} from "./types.ts";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  tagTypes: ["Pokemon"],
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
      providesTags: ["Pokemon"],
      transformResponse: (response: PokemonFromApi) => {
        return {
          sprite: response.sprites.other["official-artwork"].front_default,
          name: response.species.name,
        };
      },
    }),
    getItemByName: builder.query<ItemFromApi, string>({
      query: (name) => `item/${name}`,
      providesTags: ["Pokemon"],
    }),
    getLocationByName: builder.query<LocationFromApi, string>({
      query: (name) => `location/${name}`,
      providesTags: ["Pokemon"],
    }),
    getBerryByName: builder.query<BerryFromApi, string>({
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
