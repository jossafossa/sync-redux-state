import { Provider } from "react-redux";
import { store } from "./store";
import { Pokemon } from "./components";

export const App = () => {
  return (
    <Provider store={store}>
      <div>
        <section>
          <h2>Pokemon</h2>
          <Pokemon name="bulbasaur" />
          <Pokemon name="charmander" />
        </section>
      </div>
    </Provider>
  );
};
