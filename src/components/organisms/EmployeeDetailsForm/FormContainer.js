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
		};
	}

	onSave = () => {
		const {isValid, value} = this.state,
			onSave = this.props.onSave;

		if (!isValid) {
			this.setState({forceValidate: true});
			return;
		}

		onSave &&	onSave(value);
		this.onCancel();
	};

	onValidate = validationState => {
		this.setState({isValid: validationState});
	};

	onChange = value => {
		this.setState({value});

		const {onChange} = this.props;
		if (onChange) {
			onChange(value);
		}
	};

	onReset = () => {
		this.setState({
			value: this.props.initialValue,
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
		const props = this.props;

		return (<FormRenderer
			{...this.state}
			onValidate={this.onValidate}
      forceValidate={this.state.forceValidate}
			onSave={this.onSave}
			onChange={this.onChange}
			onReset={this.onReset}
			onCancel={this.onCancel}
			FormFieldsRenderer={FormFieldsRenderer}
			config={config}
			headerLabel={props.headerLabel}
			successLabel={props.successLabel}
		/>);
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
