import React from 'react';
import PlaceHolderImage from '../PlaceholderImage';
import {Image} from 'react-bootstrap';
import {mount} from 'enzyme';

describe('PlaceHolderImage', () => {
	const placeHolderStyle = 'sjhdj',
		imageStyles = 'sjkjdk';

	test('default image is rendered if hasError is set to true', () => {
		const wrapper = mount(<PlaceHolderImage
			placeHolderStyle={placeHolderStyle}
			imageStyles={imageStyles}
			hasError
		/>);

		expect(wrapper.find(`.${placeHolderStyle}`)).toBeTruthy();
		expect(wrapper.find(Image).length).toBe(0);
	});

	test('when hasError is false, imageElement is rendered', () => {
		const wrapper = mount(<PlaceHolderImage
			placeHolderStyle={placeHolderStyle}
			imageStyles={imageStyles}
		/>);

		expect(wrapper.find(`.${placeHolderStyle}`)).toBeTruthy();
		expect(wrapper.find(Image)).toBeTruthy();
	});
});
