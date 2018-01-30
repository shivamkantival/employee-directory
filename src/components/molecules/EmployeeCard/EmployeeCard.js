import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//components
import EditUserForm from 'components/organisms/AddOrEditUserForm';

//styles
import s from './EmployeeCard.mod.scss';
import classnames from 'classnames';

class EmployeeCard extends PureComponent {
  
  render() {
    const {emploeeDetails} = this.props;
    
    return (<div className={classnames(s.employeeCardContainer, 'pos-rel')}>
      <div className={s.cardTopBackground}>hello</div>
    </div>)
  }
}

export default EmployeeCard;