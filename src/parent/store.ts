import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./services/pokemon";
import { getLogger } from "../helpers";

const pendingRequests = new Set<string>();

const log = getLogger({ prefix: "PARENT", color: "lime" });

const messageBusMiddleware: Middleware = () => (next) => (action: unknown) => {
  const requestId = action.meta?.requestId;

  if (!pendingRequests.has(requestId)) {
    return next(action);
  }

  log("fulfilled", action.meta.arg.endpointName, action.meta.arg.originalArgs);

  window.dispatchEvent(
    new CustomEvent("sync", {
      detail: {
        action,
      },
    })
  );
  pendingRequests.delete(requestId);

  return next(action);
};

window.addEventListener("request", async (event) => {
  const action = event.detail.action;

  const { endpointName, originalArgs } = action.meta.arg;

  const result = store.dispatch(
    pokemonApi.endpoints[
      endpointName as keyof typeof pokemonApi.endpoints
    ].initiate(originalArgs, {
      subscribe: false,
    }) as unknown as ReturnType<typeof store.dispatch>
  );

  pendingRequests.add(result.requestId);
});

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware, messageBusMiddleware),
  devTools: {
    name: "Parent Store",
  },
});

setupListeners(store.dispatch);
