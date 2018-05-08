import React from 'react';
import PropTypes from 'prop-types';

//components
import Select from 'react-select';
import BaseFieldRenderer from './BaseFieldRenderer';

//utils
import {pure} from 'recompose';

//styles
import s from './FormFields.mod.scss';

function SingleSelect(props) {
	const {id, fieldClass, label, options, fieldProps, error} = props;
	return (<BaseFieldRenderer
    error={error}
    label={label}
    id={id}
    fieldClass={fieldClass}
  >
    <Select
      className={s.selectFieldContainer}
      name={id}
      {...fieldProps}
      options={options}
    />
  </BaseFieldRenderer>);
}

SingleSelect.propTypes = {
	id: PropTypes.string,
	fieldClass: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.object),
	fieldProps: PropTypes.object,
	error: PropTypes.string,
};

export default pure(SingleSelect);
