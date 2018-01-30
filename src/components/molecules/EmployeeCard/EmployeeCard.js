import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//assets
import fallbackProfileImage from 'assets/man.svg';

//components
import EditUserForm from 'components/organisms/AddOrEditUserForm';
import {Transition} from 'react-transition-group';
import PlaceholderImage from 'components/atoms/PlaceholderImage';

//styles
import s from './EmployeeCard.mod.scss';
import classnames from 'classnames';

class EmployeeCard extends PureComponent {
  state = {errorLoadingImage: false}
  
  handleImageLoadError = () => {
    this.setState({
      errorLoadingImage: true,
    });
  };
  
  renderCard = state => {
    const that = this,
      props = that.props;
    return (<div className={classnames(s.employeeCardContainer, 'pos-rel', s[state])}>
      <div className={s.cardTopBackground}></div>
      <PlaceholderImage
        fallbackImg={fallbackProfileImage}
        hasError={that.state.errorLoadingImage}
        onError={that.handleImageLoadError}
        source={props.employeeDetails.image}
        placeholderStyle={s.profileImagePlaceHolder}
        imageStyles={s.profileImage}
      />
    </div>);
  }
  
  render() {
    const {emploeeDetails} = this.props;
    
    return (<Transition in appear exit="false" unmountOnExit timeout={450} >
        {this.renderCard}
      </Transition>)
  }
}

export default EmployeeCard;