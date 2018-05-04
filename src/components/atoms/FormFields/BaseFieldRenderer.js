import React from 'react';
import PropTypes from 'prop-types';

//components
import {Label} from 'reactstrap';

//styles
import s from './FormFields.mod.scss';

function TextInput(props) {
	const {id, label, fieldClass, showError, error} = props;
	return (<div className={`${s.fieldsContainer} ${fieldClass}`} >
    <Label for={id} className={s.labelStyles}>{label}</Label>
    {props.children}
    {showError && (<span className={s.errorStyles}>{`-	${error}`}</span>)}
  </div>);
}

TextInput.propTypes = {
	children: PropTypes.oneOf([PropTypes.array, PropTypes.object]),
	id: PropTypes.string,
	label: PropTypes.string,
	fieldClass: PropTypes.string,
	showError: PropTypes.bool,
	error: PropTypes.string,
};

export default TextInput;
