import { useGetBerryByNameQuery } from "../services/pokemon";

type BerryProps = {
  name: string;
};

export const Berry = ({ name }: BerryProps) => {
  const { data, error, isLoading } = useGetBerryByNameQuery(name);
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.name}</h3>
          <p>Growth Time: {data.growth_time} hours</p>
          <p>Max Harvest: {data.max_harvest}</p>
          {data.natural_gift_type && (
            <p>Natural Gift Type: {data.natural_gift_type.name}</p>
          )}
          {data.natural_gift_power && (
            <p>Natural Gift Power: {data.natural_gift_power}</p>
          )}
          {data.firmness && <p>Firmness: {data.firmness.name}</p>}
        </>
      ) : null}
    </div>
  );
};
