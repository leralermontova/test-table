function createPromiseMiddleware(client) {

  return ({ dispatch, getState }) => next => (action) => {

    if (!action.payload || typeof action.payload.promise !== 'function') {

      return next(action);

    }

    const { payload: { promise, ...restPayload }, meta = {} } = action;

    next({ ...action, payload: restPayload, meta: { ...meta, loading: true } });

    const actionPromise = promise(client, { dispatch, getState });

    actionPromise.then(
      (result) => {

        dispatch({
          ...action,
          payload: {
            ...restPayload,
            result: result.data,
          },
          meta: { ...meta, error: false, loading: false },
        });

      },
      (error) => {

        dispatch({
          ...action,
          payload: {
            ...restPayload,
            error,
          },
          meta: { ...meta, error: true, loading: false },
        });

      },
    );

    return actionPromise;

  };

}

export default createPromiseMiddleware;
