import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//utils and configs
import {config, fields} from './fields';
import validate from './validators';
import { connect } from 'react-redux';

//components
import getFormRenderer from 'components/molecules/FormsRenderer';
import FilterUserForm from './FilterUserForm';

//actions
import {
	applyFilters,
} from 'actions/actionsHandlers/filters';

const FormFieldsRenderer = getFormRenderer(fields, validate);

class FilterUserFormContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isValid: true,
			value: props.initialValue,
		};
	}

	onSave = () => {
		const {isValid, value} = this.state;

		if (isValid) {
			this.props.applyFilters(value);
		}
		this.onCancel();
	};

	onValidate = validationState => {
		this.setState({isValid: validationState});
	};

	onChange = value => {
		this.setState({value});
	};

	onReset = () => {
		this.setState({value: this.props.initialValue});
	};

	onCancel = () => {
		const onCancel = this.props.onCancel;
		if (onCancel) {
			onCancel();
		}
	};

	render() {
		return (<FilterUserForm
			{...this.state}
			onValidate={this.onValidate}
			onSave={this.onSave}
			onChange={this.onChange}
			onReset={this.onReset}
			onCancel={this.onCancel}
			FormFieldsRenderer={FormFieldsRenderer}
			config={config}
		/>);
	}
}

FilterUserFormContainer.propTypes = {
	applyFilters: PropTypes.func,
	onCancel: PropTypes.func,
	initialValue: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		initialValue: state.filters,
	};
}

export default connect(
	mapStateToProps,
	{
		applyFilters,
	}
)(FilterUserFormContainer);
