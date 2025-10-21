import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./services/pokemon";
import { getLogger } from "../helpers";

const log = getLogger({ prefix: "PARENT", color: "lime" });

const pendingRequests = new Set<string>();

// 3. Send DataResult:
const messageBusMiddleware: Middleware = () => (next) => (action: unknown) => {
  if (action.type !== "pokemonApi/executeQuery/fulfilled") return next(action);

  const queryCacheKey = action.meta?.arg?.queryCacheKey;

  if (!pendingRequests.has(queryCacheKey)) {
    return next(action);
  }

  log("fulfilled", action);

  window.dispatchEvent(
    new CustomEvent("sync", {
      detail: {
        action,
      },
    })
  );
  pendingRequests.delete(queryCacheKey);

  return next(action);
};

// 2. Dispatch DataRequest:
window.addEventListener("request", async (event) => {
  const action = event.detail.action;

  const { endpointName, originalArgs, queryCacheKey } = action.meta.arg;

  log("request", action);

  pendingRequests.add(queryCacheKey);

  store.dispatch(
    pokemonApi.endpoints[
      endpointName as keyof typeof pokemonApi.endpoints
    ].initiate(originalArgs, {
      subscribe: false,
    }) as unknown as ReturnType<typeof store.dispatch>
  );
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
