import { useGetPokemonByNameQuery } from "../services/pokemon";

export const Test = () => {
  const { data, error, isLoading } = useGetPokemonByNameQuery("asdasd");
  return (
    <div>
      {error ? (
        <>
          Oh no, there was an error:{" "}
          {typeof error === "object" && error !== null && "status" in error
            ? `${error.status}`
            : "Unknown error"}
        </>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>Found it something that doesn't exist</>
      ) : null}
    </div>
  );
};
