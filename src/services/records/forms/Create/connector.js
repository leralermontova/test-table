import { reduxForm, SubmissionError } from 'redux-form';
import { create } from 'services/records/modules/core';
import Create from './Create';

const onSubmit = (values, dispatch) =>
dispatch(create(values)).catch((error) => {

  throw new SubmissionError({ _error: error });

});

export default reduxForm({ form: 'create', onSubmit })(Create);
