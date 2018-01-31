import React, {PureComponent} from 'react';

//styles
import classnames from 'classnames';
import s from './ActionBar.mod.scss';

//components
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddUserForm from 'components/organisms/AddUserForm';
import FilterUserListForm from 'components/organisms/FilterUserForm';

class ActionBar extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showFilters: false,
			showAddUser: false,
		}
	}
	
	toggleShowAddUser = () => {
		this.setState({showAddUser: !this.state.showAddUser});
	};
	
	toggleShowFilters = () => {
		this.setState({showFilters: !this.state.showFilters});
	};
	
	render() {
		const that = this,
			{showFilters, showAddUser} = that.state;
		return(<div className={s.actionBarContainer}>
			<ButtonToolbar>
				<Button bsSize="large" bsStyle="primary" bsClass={classnames(s.actionButton, 'btn')} onClick={that.toggleShowAddUser} >
					Add Employee
				</Button>
				<Button bsSize="large" bsStyle="primary" bsClass={classnames(s.actionButton, 'btn')} onClick={that.toggleShowFilters} >
					Apply Filters
				</Button>
			</ButtonToolbar>
			{showFilters && <FilterUserListForm onCancel={that.toggleShowFilters} />}
			{showAddUser && <AddUserForm onCancel={that.toggleShowAddUser} />}
		</div>)
	}
}

export default ActionBar;