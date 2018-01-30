import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import s from './AppHeader.mod.scss';

class AppHeader extends PureComponent {
  render () {
    return (<div className={s.headerContainer}>
			<div className={s.headingContainer}>Demo App</div>
			<div className={s.pageInfoContainer}>Manage Employee Details</div>
    </div>)
  }
}

export default AppHeader;
