import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//utils and configs
import {config, fields} from './fields';
import validate from './validators';
import { connect } from 'react-redux'

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
		const that = this,
			{isValid, value} = that.state;
		
		if (isValid) {
			that.props.applyFilters(value);
		}
		that.onCancel();
	};
	
	onValidate = validationState => {
		this.setState({isValid: validationState});
	};
	
	onChange = value => {
		const that = this;
		that.setState({value});
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
		const that = this;
		return (<FilterUserForm
			{...that.state}
			onValidate={that.onValidate}
			onSave={that.onSave}
			onChange={that.onChange}
			onReset={that.onReset}
			onCancel={that.onCancel}
			FormFieldsRenderer={FormFieldsRenderer}
			config={config}
		/>)
	}
}

FilterUserFormContainer.propTypes = {
	applyFilters: PropTypes.func,
	onCancel: PropTypes.func,
	initialValue: PropTypes.object,
}

function mapStateToProps(state) {
	return {
		initialValue: state.filters,
	}
}

export default connect(
	mapStateToProps,
	{
		applyFilters,
	}
)(FilterUserFormContainer);
