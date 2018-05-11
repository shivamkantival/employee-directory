import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//styles
import s from './UserCardsContainer.mod.scss';
import classnames from 'classnames';

//utils
import _uniqueId from 'lodash/uniqueId';

//components
import UserCard from 'components/molecules/UserCard';
import OverlayLoader from 'components/atoms/OverlayLoader';

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

	renderCard = userDetails => (<UserCard
      userDetails={userDetails}
      onUpdate={this.props.updateUser}
      key={`${this.uniqueKey}_${userDetails.id}`}
	/>);

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

UserCardsContainer.propTypes = {
	loading: PropTypes.bool,
	loaded: PropTypes.bool,
	fetchAllUsers: PropTypes.func,
	updateUser: PropTypes.func,
	users: PropTypes.array,
};

export default UserCardsContainer;
