import React from 'react';
import PropTypes from 'prop-types';

//components
import {Label} from 'reactstrap';

//styles
import s from './FormFields.mod.scss';

function BaseFieldRenderer(props) {
	const {error} = props;
	return (<div className={`${s.fieldsContainer} ${props.fieldClass}`} >
    <Label for={props.id} className={s.labelStyles}>{props.label}</Label>
    {props.children}
    {error ? (<span className={s.errorStyles}>{`-	${error}`}</span>) : null}
  </div>);
}

BaseFieldRenderer.propTypes = {
	children: PropTypes.oneOf([PropTypes.array, PropTypes.object]),
	id: PropTypes.string,
	label: PropTypes.string,
	fieldClass: PropTypes.string,
	error: PropTypes.string,
};

export default BaseFieldRenderer;
