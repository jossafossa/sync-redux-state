# How it works

whenever the middleware of the child store encounters a request, that request is send over the message bus. The parent store then waits for that request. The request is stored so we can match it with the response later. After that the request is dispatched in the parent store. When the response comes back to the parent store, it is send back over the message bus to the child store, where it is matched with the original request and the response is dispatched in the child store.
