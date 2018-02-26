import { createAction } from 'redux-act';

export const createSuccess = createAction(
  'RECORDS_CORE_CREATE_SUCCESS',
);

export const create = createAction(
  'RECORDS_CORE_CREATE',
  record => ({
    promise: client => client.post('/record', record),
  }),
);

export const load = createAction(
  'RECORDS_CORE_GET',
  () => ({
    promise: client => client.get('/records'),
  }),
);
