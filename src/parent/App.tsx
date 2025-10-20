import { Provider } from "react-redux";
import { store } from "./store";
import { Berry, Item, Location, Pokemon } from "./components";

export const App = () => {
  return (
    <Provider store={store}>
      <div>
        <section>
          <h2>Pokemon</h2>
          <Pokemon name="bulbasaur" />
          <Pokemon name="eevee" />
        </section>

        <section>
          <h2>Items</h2>
          <Item name="master-ball" />
          <Item name="ultra-ball" />
        </section>

        <section>
          <h2>Locations</h2>
          <Location name="kanto" />
          <Location name="johto" />
        </section>

        <section>
          <h2>Berries</h2>
          <Berry name="cheri" />
          <Berry name="oran" />
        </section>
      </div>
    </Provider>
  );
};
