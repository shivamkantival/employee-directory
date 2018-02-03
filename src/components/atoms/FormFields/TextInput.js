import React from 'react';
import PropTypes from 'prop-types';

//components
import {Input} from 'reactstrap';
import BaseFieldRenderer from './BaseFieldRenderer';

//utils
import _isUndefined from 'lodash/isUndefined';
import {pure} from 'recompose';

//styles
import s from './FormFields.mod.scss';

function TextInput(props) {
  const {id, fieldClass, label, placeholder, fieldProps, error} = props;
  const hasErrorToShow = !_isUndefined(error);
  return (<BaseFieldRenderer
    showError={hasErrorToShow}
    error={error}
    label={label}
    id={id}
    fieldClass={fieldClass}
  >
    <Input
      size="sm"
      className={s.fieldStyles}
      id={id}
      type="text"
      name={id}
      placeholder={placeholder}
      valid={!hasErrorToShow}
      {...fieldProps}
    />
  </BaseFieldRenderer>);
}

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  fieldProps: PropTypes.object,
  error: PropTypes.string,
  fieldClass: PropTypes.string,
};

export default pure(TextInput);