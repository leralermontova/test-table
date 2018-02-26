import { asyncConnect } from 'redux-connect';
import { createStructuredSelector } from 'reselect';
import { getRecords, load } from 'services/records/modules/core';
import { open, close } from 'modules/modal';
import { show } from 'modules/notify';
import Records from './Records';

const mapAsyncActions = [
  {
    promise: ({ store }) =>
     store.dispatch(load()),

  },
];

const mapStateToProps = createStructuredSelector({
  records: getRecords,
});

const mapDispatchToProps = {
  open,
  close,
  show,
  load,
};

export default asyncConnect(mapAsyncActions, mapStateToProps, mapDispatchToProps)(Records);
