import React, {PureComponent} from 'react';
import PropTypoes from 'prop-types';

//styles
import s from './OverlayLoader.mod.scss';

//component
import Loader from 'halogen/SyncLoader';

function OverlayLoader(props) {
  return props.show && (<div className={s.overlayContainer} style={{"z-index": props['z-index'] || 1}} >
    <Loader color="#4abdac" size="16px" />
  </div>)
}

export default OverlayLoader;