import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
//actions
import {
	addUser,
} from "actions/actionsHandlers/employeeDetails";

import EmployeeDetailsForm from '../EmployeeDetailsForm';


//simple wrapper over employeeDetailsForm to handle save and initiate values
class AddUserForm extends PureComponent {
	render() {
		return (<EmployeeDetailsForm
			onCancel={this.props.onCancel}
			onSave={this.props.addUser}
			initialValue={{}}
		/>);
	}
}

AddUserForm.propTypes = {
	addUser: PropTypes.func,
	onCancel: PropTypes.func,
}

export default connect(
	null,
	{
		addUser,
	}
)(AddUserForm);
