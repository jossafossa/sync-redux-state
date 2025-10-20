# How it works

All fulfilled actions in the parent store are sent to the child store using custom middleware. Whenever the child store receives an action, the middleware intercepts it and re-dispatches it to the child store. Whenever the child store receives a pending action, the middleware sends it to the parent store, which then handles the request and sends back the fulfilled action.
