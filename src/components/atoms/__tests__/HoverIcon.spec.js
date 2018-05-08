import React from 'react';

import HoverIcon from '../HoverIcon';

import {mount} from 'enzyme';

function getAnchorTagOfMountedHoverIcon(source) {
	const wrapper = mount(<HoverIcon source={source} />);
	return wrapper.find('a');
}

describe('HoverIcon', () => {
	test('if no source is provided, no href value is provided to anchor tag', () => {
		const anchorTag = getAnchorTagOfMountedHoverIcon();
		expect(anchorTag.prop('href')).toBeFalsy();
	});

	test('when source is provided, anchor tag is rendered with href and thus will redirect to given link', () => {
		const anchorTag = getAnchorTagOfMountedHoverIcon("https://www.google.co.in/");
		expect(anchorTag.prop('href')).toBeTruthy();
	});
});
