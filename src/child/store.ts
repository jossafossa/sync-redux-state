import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./services/pokemon";
import { getLogger } from "../helpers";

const log = getLogger({ prefix: "CHILD", color: "orange" });

// 1. Send DataRequest:
const messageBusMiddleware: Middleware = () => (next) => (action) => {
  if (action.type !== "pokemonApi/executeQuery/pending") return next(action);

  log("request", action);

  window.dispatchEvent(
    new CustomEvent("request", {
      detail: {
        action,
      },
    })
  );

  return next(action);
};

// 4. Dispatch DataResult:
window.addEventListener("sync", (event) => {
  const action = event.detail.action;

  log("fulfilled", action);

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
