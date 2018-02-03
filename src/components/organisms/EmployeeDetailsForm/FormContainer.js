import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//utils and config
import {config, fields} from "./fields";
import validate from './validators';

//components
import FormRenderer from './FormModalRenderer';
import getFormRenderer from 'components/molecules/FormsRenderer';

const FormFieldsRenderer = getFormRenderer(fields, validate);


/**
 * uses generic form renderer to render form with just providing the names of the field and config
 *
 *  Also shows live update for the image, name and color selected
 */
class EmployeeDetailsFormContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: props.initialValue,
			isValid: true,
      forceValidate: false,
		}
	}
	
	onSave = () => {
		const that = this,
			{isValid, value} = that.state,
			onSave = that.props.onSave;
		
		if (!isValid) {
		  that.setState({forceValidate: true});
		  return;
    }
    
    onSave &&	onSave(value);
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
		that.setState({
      value: that.props.initialValue,
      forceValidate: false,
    });
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
      forceValidate={that.state.forceValidate}
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