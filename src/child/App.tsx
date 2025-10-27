import { Provider } from "react-redux";
import { store } from "./store";
import { Pokemon, Test } from "./components";

export const App = () => {
  return (
    <Provider store={store}>
      <div>
        <section>
          <h2>Pokemon</h2>
          <Pokemon name="bulbasaur" />
          <Pokemon name="charmander" />
          <Test />
        </section>
      </div>
    </Provider>
  );
};
