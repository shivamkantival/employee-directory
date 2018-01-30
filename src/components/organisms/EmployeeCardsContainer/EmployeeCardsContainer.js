import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//styles
import s from './EmployeeCardsContainer.mod.scss';
import classnames from 'classnames';

//state and actions
import {connect} from 'react-redux';
import {fetchAllEmployees, updateEmployee} from 'actions/actionsHandlers/employeeDetails';

//utils
import _uniqueId from 'lodash/uniqueId';

//components
import EmployeeCard from 'components/molecules/EmployeeCard';
import OverlayLoader from 'components/atoms/OverlayLoader'

function hasFetchedData(nextProps, currentProps) {
  return !nextProps.loading && currentProps.loading;
}

class EmployeeCardsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.uniqueKey = _uniqueId(); // this helps to hard refresh page when new data is loaded
    // thus previously rendered cards with same key are also rendered again
  }
  
  componentDidMount() {
    const props = this.props;
    if (!props.loading && !props.loaded) {
      props.fetchAllEmployees();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (hasFetchedData(nextProps, this.props)) {
      this.uniqueKey = _uniqueId();
    }
  }
  
  renderCard = employeeDetails => {
    return <EmployeeCard
      employeeDetails={employeeDetails}
      onUpdate={this.props.updateEmployee}
      key={`${this.uniqueKey}_${employeeDetails.id}`}
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
