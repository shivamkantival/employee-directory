import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//assets
import fallbackProfileImage from 'assets/man.svg';

//components
import EditUserForm from 'components/organisms/EmployeeDetailsForm';
import {Transition} from 'react-transition-group';
import PlaceholderImage from 'components/atoms/PlaceholderImage';
import {OverlayTrigger, Popover} from 'react-bootstrap';

//styles
import s from './UserCard.mod.scss';
import classnames from 'classnames';

//utils
import {
  getFullName,
  getFormattedLocation,
  adaptUserDetailsForDisplay,
} from "utils/userDetails";

//constants
import USER_DETAIL_TYPES, {DETAIL_TYPE_TO_DISPLAY_VALUE} from 'constants/userDetailTypes';

function renderPopover(header, value) {
  return (<Popover id={`popover-${header}`} title={header}>
    <strong>{value}</strong>
  </Popover>)
}

function renderTeamDetail(detail, userDetails) {
  const detailTypeToView = DETAIL_TYPE_TO_DISPLAY_VALUE[detail],
    detailValue = userDetails[detail];
  return detailValue && (<OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={renderPopover(detailTypeToView, detailValue)}>
      <span className={s.teamDetail}>{`${detailTypeToView} : ${detailValue}`}</span>
    </OverlayTrigger>
  )
}

class UserCard extends PureComponent {
  state = {errorLoadingImage: false, showEditableForm: false};
  
  handleImageLoadError = () => {
    this.setState({
      errorLoadingImage: true,
    });
  };
  
  renderDetails = () => {
    const {userDetails} = this.props;
    return(<div className={s.detailsBox}>
      <span style={{color: `#${userDetails[USER_DETAIL_TYPES.COLOR]}`}} className={s.userName}>{getFullName(userDetails)}</span>
      <span className={s.locationContainer}>{getFormattedLocation(userDetails)}</span>
      <div className={s.teamDetailsContainer}>
        {renderTeamDetail(USER_DETAIL_TYPES.TEAM, userDetails)}
        {renderTeamDetail(USER_DETAIL_TYPES.TITLE, userDetails)}
      </div>
    </div>)
  };
  
  toggleEditableForm = () => {
    this.setState({
      showEditableForm: !this.state.showEditableForm,
    })
  };
  
  handleSave = updatedUser => {
    this.props.onUpdate(updatedUser);
  }
  
  renderUpdateOption = () => {
    const {userDetails, onUpdate} = this.props;
    return (<span onClick={this.toggleEditableForm} className={s.updateOption}>
      Update details -
    </span>)
  };
  
  renderCard = state => {
    const that = this,
      props = that.props;
    return (<div className={classnames(s.userCardContainer, 'pos-rel', s[state])}>
      <div className={s.cardTopBackground}></div>
      <PlaceholderImage
        fallbackImg={fallbackProfileImage}
        hasError={that.state.errorLoadingImage}
        onError={that.handleImageLoadError}
        source={props.userDetails.image}
        placeholderStyle={s.profileImagePlaceHolder}
        imageStyles={s.profileImage}
      />
      {that.renderDetails()}
      {that.renderUpdateOption()}
      {that.state.showEditableForm && <EditUserForm
        onCancel={that.toggleEditableForm}
        onSave={that.handleSave}
        initialValue={adaptUserDetailsForDisplay(props.userDetails)}
      />}
    </div>);
  }
  
  render() {
    const {emploeeDetails} = this.props;
    
    return (<Transition in appear exit="false" unmountOnExit timeout={450} >
        {this.renderCard}
      </Transition>)
  }
}

export default UserCard;