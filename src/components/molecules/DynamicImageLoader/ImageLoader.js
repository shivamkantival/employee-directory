import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
//styles
import s from './ImageLoader.mod.scss';
import classnames from 'classnames';

//utils
import _isEmpty from 'lodash/isEmpty';

//components
import InlineLoader, {SIZES} from 'components/atoms/InlineLoader';
import PlaceholderImage from 'components/atoms/PlaceholderImage';

/**
 * renders images where source of the image is dynamically changing,
 * a fallBack image can be provided to render for the time when new image is loading,
 *
 */
class DynamicImageLoader extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			error: false,
		};
	}

	componentDidMount() {
		const that = this,
			{source} = that.props;
		if (source) {
			that.loadImageFromSource();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (_isEmpty(nextProps.source)) {
			this.resetState();
			return;
		}
		if (nextProps.source !== this.props.source) {
			this.loadImageFromSource();
		}
	}

	resetState = () => {
		this.setState({
			loading: false,
			error: false,
		});
	};

	loadImageFromSource = () => {
		this.setState({loading: true, error: false});
	};

	handleOnLoad = () => {
		this.setState({loading: false});
	};

	handleOnError = () => {
		this.setState({loading: false, error: true});
	};

	render() {
		const that = this,
			{error, loading} = that.state,
			props = that.props,
			source = props.source;

    //shows error if error occured, else shows loader if is currently loading
		const loadingStatus = (error && (<div className={classnames(s.errorStyles)}>Image not found</div>))
      || (loading && (<InlineLoader loaderClass={s.loaderStyles} size={SIZES.sm} />));

		return (<div className={props.containerClassName}>
      <PlaceholderImage
        imageStyles={s.imageStyles}
        placeholderStyle={s.placeholder}
        source={source}
        onLoad={that.handleOnLoad}
        onError={that.handleOnError}
        fallbackImg={props.fallbackImg}
        hasError={error}
      />
      {loadingStatus}
    </div>);
	}
}

DynamicImageLoader.propTypes = {
	source: PropTypes.string,
	containerClassName: PropTypes.string,
	fallbackImg: PropTypes.string,
};

export default DynamicImageLoader;
