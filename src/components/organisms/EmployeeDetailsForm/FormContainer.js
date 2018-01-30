import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//utils and config
import {config, fields} from "./fields";
import validate from './validators';

//components
import FormRenderer from './FormModalRenderer';
import getFormRenderer from 'components/molecules/FormsRenderer';

const FormFieldsRenderer = getFormRenderer(fields, validate);

class EmployeeDetailsFormContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: props.initialValue,
			isValid: true,
		}
	}
	
	onSave = () => {
		const that = this,
			{isValid, value} = that.state,
			onSave = that.props.onSave;
		if (isValid && onSave) {
			onSave(value);
		}
		that.onCancel();
	};
	
	onValidate = validationState => {
		this.setState({isValid: validationState});
	};
	
	onChange = value => {
		const that = this;
		that.setState({value});
		
		const {onChange} = that.props;
		if (onChange) {
			onChange(value);
		}
	};
	
	onReset = () => {
		const that = this;
		that.setState({value: that.props.initialValue});
	};
	
	onCancel = () => {
		const onCancel = this.props.onCancel;
		if (onCancel) {
			onCancel();
		}
	};
	
	render() {
		const that = this,
			props = that.props;
		return (<FormRenderer
			{...that.state}
			onValidate={that.onValidate}
			onSave={that.onSave}
			onChange={that.onChange}
			onReset={that.onReset}
			onCancel={that.onCancel}
			FormFieldsRenderer={FormFieldsRenderer}
			config={config}
			headerLabel={props.headerLabel}
			successLabel={props.successLabel}
		/>)
	}
}

EmployeeDetailsFormContainer.propTypes = {
	initialValue: PropTypes.object,
	onSave: PropTypes.func,
	onChange: PropTypes.func,
	onCancel: PropTypes.func,
	headerLabel: PropTypes.string,
	successLabel: PropTypes.string,
};

export default EmployeeDetailsFormContainer;