import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import s from './AppHeader.mod.scss';

//components
import HoverIcon from 'components/atoms/HoverIcon';
import ICONS_CONFIG from './iconsConfig';

const iconsBackgroundColor = '#9099a2';

function renderImage(imageInfo) {
  return <HoverIcon backgroundColor={iconsBackgroundColor} key={imageInfo.id} image={imageInfo.icon} source={imageInfo.linkUrl} />
};

function AppHeader (props){
  return (<div className={s.headerContainer}>
    <div className={s.headerContentContainer} >
      <section className={s.appNameSection}>
        <span>Employee Directory</span>
      </section>
      <section className={s.appDetailSection}>
        <span>Powered by</span>
        {ICONS_CONFIG.map(renderImage)}
      </section>
    </div>
  </div>)
}

export default AppHeader;
