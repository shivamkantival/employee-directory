import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//styles
import s from './UserCardsContainer.mod.scss';
import classnames from 'classnames';

//state and actions
import {connect} from 'react-redux';
import {fetchAllEmployees, updateEmployee} from 'actions/actionsHandlers/employeeDetails';

//utils
import _uniqueId from 'lodash/uniqueId';

//components
import UserCard from 'components/molecules/UserCard';
import OverlayLoader from 'components/atoms/OverlayLoader'

function hasFetchedData(nextProps, currentProps) {
  return !nextProps.loading && currentProps.loading;
}

class UserCardsContainer extends PureComponent {
  uniqueKey = _uniqueId(); // this helps to hard refresh page when new data is loaded
  // thus previously rendered cards with same key are also rendered again
  
  componentDidMount() {
    const props = this.props;
    if (!props.loading && !props.loaded) {
      props.fetchAllUsers();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (hasFetchedData(nextProps, this.props)) {
      this.uniqueKey = _uniqueId();
    }
  }
  
  renderCard = userDetails => {
    return <UserCard
      userDetails={userDetails}
      onUpdate={this.props.updateUser}
      key={`${this.uniqueKey}_${userDetails.id}`}
    />
  };
  
  render() {
    const {users = [], loading} = this.props;
    return (<div className={classnames(s.cardsSection, 'pos-rel')}>
      <section className={s.cardsContainer}>
        {users.map(this.renderCard)}
      </section>
      <OverlayLoader show={loading} zIndex="5" />
    </div>);
  }
}

function mapStateToProps(state) {
  const employeeDetailsState = state.employeeDetails;
  return {
    loading: employeeDetailsState.loading,
    loaded: employeeDetailsState.loaded,
    users: employeeDetailsState.data,
  }
}

UserCardsContainer.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  fetchAllUsers: PropTypes.func,
  updateUser: PropTypes.func,
};

export default connect(
  mapStateToProps,
  {
    fetchAllUsers: fetchAllEmployees,
    updateUser: updateEmployee,
  },
)(UserCardsContainer);
