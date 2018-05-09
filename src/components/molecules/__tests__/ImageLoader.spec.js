import React from 'react';
import {mount} from 'enzyme';
import InlineLoader from 'components/atoms/InlineLoader';
import s from '../DynamicImageLoader/ImageLoader.mod.scss';

const mockComponent = jest.fn();

jest.mock('components/atoms/PlaceholderImage', () => mockComponent);

jest.useFakeTimers();

const ImageLoader = require('../DynamicImageLoader/ImageLoader').default;

describe('ImageLoader', () => {
	beforeEach(mockComponent.mockRestore);

	test('if no source is provided, loading is nerver instantiated', () => {
		mockComponent.mockImplementationOnce(() => null);
		const loaderState = mount(<ImageLoader />).state();

		expect(loaderState.loading).toBeFalsy();
		expect(loaderState.error).toBeFalsy();
	});

	test('if source is provided, image loader stays in loading state unless onLoad or onError callbacks are called', () => {
		mockComponent.mockImplementation(props => {
			setTimeout(props.onLoad, 5000);
			return null;
		});

		const wrapper = mount(<ImageLoader
			source="https://www.google.co.in"
		/>);

		// image loader shows loader
		expect(wrapper.state('loading')).toBeTruthy();
		expect(wrapper.state('error')).toBeFalsy();
		expect(wrapper.find(InlineLoader).length).toBeTruthy();

		//once the onLoad is called loading state is set to false
		jest.runAllTimers();
		expect(wrapper.state('loading')).toBeFalsy();
		expect(wrapper.state('error')).toBeFalsy();
		expect(wrapper.find(InlineLoader).length).toBeFalsy();
	});

	test('if the loader calls onError callback, error is set to true, and loading to false', () => {
		mockComponent.mockImplementation(props => {
			setTimeout(props.onError, 5000);
			return null;
		});

		const wrapper = mount(<ImageLoader
			source="https://www.google.co.in"
		/>);

		// image loader shows loader
		expect(wrapper.state('loading')).toBeTruthy();
		expect(wrapper.state('error')).toBeFalsy();
		expect(wrapper.find(InlineLoader).length).toBeTruthy();

		//once the onError is called loading state is set to false and error to true
		jest.runAllTimers();
		expect(wrapper.state('loading')).toBeFalsy();
		expect(wrapper.state('error')).toBeTruthy();
		expect(wrapper.find(`.${s.errorStyles}`).length).toBeTruthy();
	});
});
