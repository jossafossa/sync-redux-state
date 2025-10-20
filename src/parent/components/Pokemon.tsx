import { useGetPokemonByNameQuery } from "../services/pokemon";

type PokemonProps = {
  name: string;
};

export const Pokemon = ({ name }: PokemonProps) => {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.name}</h3>
          <img src={data.sprite} alt={data.name} />
        </>
      ) : null}
    </div>
  );
};
