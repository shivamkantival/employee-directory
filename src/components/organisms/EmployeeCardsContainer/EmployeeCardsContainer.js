import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//styles
import s from './EmployeeCardsContainer.mod.scss';
import classnames from 'classnames';

//state and actions
import {connect} from 'react-redux';
import {fetchAllEmployees, updateEmployee} from 'actions/actionsHandlers/employeeDetails';

//components
import EmployeeCard from 'components/molecules/EmployeeCard';
import OverlayLoader from 'components/atoms/OverlayLoader'

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
      employeeDetails={employeeDetails}
      onUpdate={this.props.updateEmployee}
      key={employeeDetails.id}
    />
  }
  
  render() {
    const {employees = [], loading} = this.props;
     return (<div className={classnames(s.cardsSectionContainer, 'pos-rel')}>
       {employees.map(this.renderCard)}
       <OverlayLoader show={loading} z-index="5" />
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
