import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./services/pokemon";
import { getLogger } from "../helpers";

const log = getLogger({ prefix: "CHILD", color: "orange" });

const messageBusMiddleware: Middleware = () => (next) => (action) => {
  if (action.type !== "pokemonApi/executeQuery/pending") return;

  log("request", action.meta.arg.endpointName, action.meta.arg.originalArgs);

  window.dispatchEvent(
    new CustomEvent("request", {
      detail: {
        action,
      },
    })
  );

  return next(action);
};

window.addEventListener("sync", (event) => {
  const action = event.detail.action;

  if (action.type !== "pokemonApi/executeQuery/fulfilled") return;
  log(action);

  const { meta, payload } = action;
  store.dispatch(
    pokemonApi.util.upsertQueryData(
      meta.arg.endpointName,
      meta.arg.originalArgs,
      payload
    )
  );
});

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware, messageBusMiddleware),
  devTools: {
    name: "Child Store",
  },
});

setupListeners(store.dispatch);
