import { useGetLocationByNameQuery } from "../services/pokemon";

type LocationProps = {
  name: string;
};

export const Location = ({ name }: LocationProps) => {
  const { data, error, isLoading } = useGetLocationByNameQuery(name);
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.name}</h3>
          {data.region && <p>Region: {data.region.name}</p>}
          {data.areas && data.areas.length > 0 && (
            <div>
              <p>Areas:</p>
              <ul>
                {data.areas.map((area) => (
                  <li key={area.name}>{area.name}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};
