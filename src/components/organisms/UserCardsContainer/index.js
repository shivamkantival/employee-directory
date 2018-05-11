import UserCardsContainer from './UserCardsContainer';

//state and actions
import {connect} from 'react-redux';
import {fetchAllEmployees, updateEmployee} from 'actions/actionsHandlers/employeeDetails';

function mapStateToProps(state) {
	const employeeDetailsState = state.employeeDetails;
	return {
		loading: employeeDetailsState.loading,
		loaded: employeeDetailsState.loaded,
		users: employeeDetailsState.data,
	};
}

export default connect(
  mapStateToProps,
	{
		fetchAllUsers: fetchAllEmployees,
		updateUser: updateEmployee,
	},
)(UserCardsContainer);
