import { createApi } from "@reduxjs/toolkit/query/react";
import type { Pokemon } from "./types.ts";

const emptyBaseQuery = async () => {
  await new Promise(() => {});
  return { data: {} };
};

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: emptyBaseQuery,
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => ({
        endpoint: "getPokemonByName",
        arg: name,
      }),
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
