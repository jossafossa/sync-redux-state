# Redux Middleware Example

## Quickstart

```bash
pnpm install
pnpm dev
```

## Setup

- This repo has been created using `pnpm create vite@latest` with the `react-ts` template.
- Two separate apps with separate stores have been created inside `src/parent` and `src/child`. Each is basically the standard RTKQuery example setup.
- The parent and child apps communicate using `eventListeners` on the `window` for simplicity.

# How it works

whenever the middleware of the child store encounters a request, that request is send over the message bus. The parent store then waits for that request. The request is stored so we can match it with the response later. After that the request is dispatched in the parent store. When the response comes back to the parent store, it is send back over the message bus to the child store, where it is matched with the original request and the response is dispatched in the child store.
