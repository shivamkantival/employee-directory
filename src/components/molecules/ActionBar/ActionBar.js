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
  
  renderInfoSection = () => {
    return (
      <section className={s.infoSection}>
        <div className={s.infoDetailsAlignment}>
          <HoverIcon backgroundColor={'#e1e3e8'} image={empDirImage} iconSize={'LARGE'}/>
          <span className={s.infoText}>Meet and manage your employees</span>
        </div>
      </section>
    );
  };
  
  renderActions = () => {
    const that = this,
      {showFilters, showAddUser} = this.state;
    return (
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
    );
  }
  
  render() {
    const that = this;
    return(<div className={s.actionBar}>
      {that.renderInfoSection()}
      {that.renderActions()}
    </div>)
  }
}

export default ActionBar;