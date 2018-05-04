import React from 'react';
import PropTypes from 'prop-types';

//components
import {Input} from 'reactstrap';

//utils
import _isUndefined from 'lodash/isUndefined';
import {pure} from 'recompose';

//styles
import s from './FormFields.mod.scss';

import BaseFieldRenderer from './BaseFieldRenderer';

function ColorInput(props) {
	const {id, fieldClass, label, fieldProps, error} = props;
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
      type="color"
      name={id}
      {...fieldProps}
    />
  </BaseFieldRenderer>);
}

ColorInput.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	fieldClass: PropTypes.string,
	fieldProps: PropTypes.object,
	error: PropTypes.string,
};

export default pure(ColorInput);
