import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import FormInput from 'components/FormInput';
import FormError from 'components/FormError';
import FormSubmit from 'components/FormSubmit';

const Create = ({ handleSubmit, submitting, error }) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="text"
      component={FormInput}
      label="Enter the text"
      required
    />
    <FormError error={error} />
    <FormSubmit loading={submitting}>
       Create
    </FormSubmit>
  </form>
);

Create.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  error: PropTypes.node,
};

export default Create;
