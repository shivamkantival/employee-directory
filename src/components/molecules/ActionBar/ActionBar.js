import React, {PureComponent} from 'react';

//styles
import classnames from 'classnames';
import s from './ActionBar.mod.scss';

//components
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddUserForm from 'components/organisms/AddUserForm';
import FilterUserListForm from 'components/organisms/FilterUserForm';
import HoverIcon from 'components/atoms/HoverIcon';

//assets
import empDirImage from 'assets/empDirImage.svg';

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
    return(<div className={s.actionBar}>
      <section className={s.infoSection}>
        <div className={s.infoDetailsAlignment}>
          <HoverIcon backgroundColor={'#e1e3e8'} image={empDirImage} iconSize={'LARGE'}/>
          <span className={s.infoText}>Meet and manage your employees</span>
        </div>
      </section>
      <section className={s.actionSection}>
          <ButtonToolbar>
            <Button bsSize="medium" bsStyle="info" bsClass={classnames(s.actionButton, 'btn')} onClick={that.toggleShowAddUser} >
              Add Employee
            </Button>
            <Button bsSize="medium" bsStyle="info" bsClass={classnames(s.actionButton, 'btn')} onClick={that.toggleShowFilters} >
              Apply Filters
            </Button>
          </ButtonToolbar>
        {showFilters && <FilterUserListForm onCancel={that.toggleShowFilters} />}
        {showAddUser && <AddUserForm onCancel={that.toggleShowAddUser} />}
      </section>
    </div>)
  }
}

export default ActionBar;