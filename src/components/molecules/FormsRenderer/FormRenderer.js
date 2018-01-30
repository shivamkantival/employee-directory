import React, {PureComponent} from 'react';

//styles
import s from './FormContainer.mod.scss';
import classnames from 'classnames';

//decorators
import { form } from 'react-inform';
import {pure} from 'recompose';
//components
import {Button} from 'reactstrap';

//constants and utils
import _map from 'lodash/map';
import {FIELD_TYPE_TO_RENDERER} from 'components/atoms/FormFields';
import {config} from "../../organisms/EmployeeDetailsForm/fields";

function renderField(fieldConfig) {
	const {type, placeholder, fieldName, label, options} = fieldConfig,
		Renderer = FIELD_TYPE_TO_RENDERER.get(type),
		{fieldValues, fieldClass} = this,
		propsOfSelectedField = fieldValues[fieldName];
	
	return (<Renderer
		fieldClass={fieldClass}
		fieldProps={propsOfSelectedField.props}
		label={label}
		placeholder={placeholder}
		id={fieldName}
		key={fieldName}
		error={propsOfSelectedField.error}
		options={options}
	/>)
}

const FormContainer = pure(function (props) {
	const {
			config,
			fields,
			enableReset = true,
			form: formProperties,
			containerClassName,
			columns = 2,
			size,
		} = props;
	const fieldClass = columns === 1 ? s.fullWidthField : s.halfWidthField;
	const isFormInValidSate = formProperties.isValid();
	return (
		<div className={`${s.formFieldsContainer} ${containerClassName}`} >
			{Object.values(config).map(renderField, {fieldValues: fields, fieldClass})}
		</div>
	)
})

export default function getFormRenderer(fields, validate) {
	return form({fields, validate})(FormContainer);
}
