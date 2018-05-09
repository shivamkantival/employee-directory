import React from 'react';

//components
import {Button} from 'react-bootstrap';

//utils
import {mount} from 'enzyme';

jest.mock('components/organisms/FilterUserForm', () => jest.fn(() => null));
jest.mock('components/organisms/AddUserForm', () => jest.fn(() => null));

const FilterUserListForm = require('components/organisms/FilterUserForm'),
	AddUserForm = require('components/organisms/AddUserForm'),
	ActionBar = require('../ActionBar').default;


describe('ActionBar', () => {
	test('when we click on show filter button filters dialogue component is mounted', () => {
		const wrapper = mount(<ActionBar />);
		const addFilterButton = wrapper.find(Button).last();

		expect(wrapper.state('showFilters')).toBeFalsy();

		addFilterButton.simulate('click');
		expect(wrapper.state('showFilters')).toBeTruthy();
		expect(wrapper.find(FilterUserListForm).length).toBeTruthy();
	});

	test('when we click on add employee button, dialogue with add employee form must open', () => {
		const wrapper = mount(<ActionBar />);
		const addFilterButton = wrapper.find(Button).first();

		expect(wrapper.state('showAddUser')).toBeFalsy();

		addFilterButton.simulate('click');
		expect(wrapper.state('showAddUser')).toBeTruthy();
		expect(wrapper.find(AddUserForm).length).toBeTruthy();
	});
});
