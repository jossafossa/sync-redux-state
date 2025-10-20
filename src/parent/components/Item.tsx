import { useGetItemByNameQuery } from "../services/pokemon";

type ItemProps = {
  name: string;
};

export const Item = ({ name }: ItemProps) => {
  const { data, error, isLoading } = useGetItemByNameQuery(name);
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.name}</h3>
          <p>Cost: {data.cost}</p>
          <p>Category: {data.category.name}</p>
          {data.effect_entries && data.effect_entries.length > 0 && (
            <p>Effect: {data.effect_entries[0].effect}</p>
          )}
        </>
      ) : null}
    </div>
  );
};
