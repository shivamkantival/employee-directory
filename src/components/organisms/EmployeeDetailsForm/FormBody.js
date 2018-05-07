import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//styles
import s from './EmployeeDetailsForm.mod.scss';

//assets
import personImage from 'assets/man.svg';

//constants
import {IMAGE as IMAGE_URL, COLOR as PROFILE_COLOR} from 'constants/userDetailTypes';

//components
import DynamicImageLoader from 'components/molecules/DynamicImageLoader';

//utils
import {getFullName} from 'utils/userDetails';

class FormBody extends PureComponent {
	renderImageSection () {
		const {value} = this.props;

		const source = value[IMAGE_URL];
		return (<div className={s.imageSection}>
      <div>
        <DynamicImageLoader
          fallbackImg={personImage}
          source={source}
          containerClassName={s.sampleImage}
        />
      </div>
      <div className={s.dynamicName} style={{color: value[PROFILE_COLOR]}} >
        <span className={s.ellipsis}>{getFullName(value)}</span>
      </div>
    </div>);
	}

	renderFieldsSection () {
		const {FormFieldsRenderer, onValidate, onChange, value, config, forceValidate} = this.props;
		return (<FormFieldsRenderer
      config={config}
      value={value}
      onValidate={onValidate}
      onChange={onChange}
      forceValidate={forceValidate}
    />);
	}

	render () {
		return (<div className={s.formBodyContainer}>
      {this.renderImageSection()}
      {this.renderFieldsSection()}
    </div>);
	}
}

FormBody.propTypes = {
	value: PropTypes.object,
	FormFieldsRenderer: PropTypes.object,
	onValidate: PropTypes.func,
	onChange: PropTypes.func,
	config: PropTypes.object,
	forceValidate: PropTypes.bool,
};

export default FormBody;
