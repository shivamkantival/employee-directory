import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//styles
import s from './EmployeeCardsContainer.mod.scss';

//state and actions
import {connect} from 'react-redux';
import {fetchAllEmployees, updateEmployee} from 'actions/actionsHandlers/employeeDetails';

//components
import EmployeeCard from 'components/molecules/EmployeeCard';

class EmployeeCardsContainer extends PureComponent {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const props = this.props;
    if (!props.loading && !props.loaded) {
      props.fetchAllEmployees();
    }
  }
  
  renderCard = employeeDetails => {
    return <EmployeeCard
      emploeeDetails={employeeDetails}
      onUpdate={this.props.updateEmployee}
      key={employeeDetails.id}
    />
  }
  
  render() {
    const employees = this.props.employees || [];
     return (<div className={s.cardsSectionContainer}>
       {employees.map(this.renderCard)}
     </div>);
  }
}

function mapStateToProps(state) {
  const employeeDetailsState = state.employeeDetails;
  return {
    loading: employeeDetailsState.loading,
    loaded: employeeDetailsState.loaded,
    employees: employeeDetailsState.data,
  }
}

export default connect(
  mapStateToProps,
  {
    fetchAllEmployees,
    updateEmployee,
  },
)(EmployeeCardsContainer);
