import React from 'react';

import UserCardsContainer from '../UserCardsContainer';
import UserCard from 'components/molecules/UserCard';

//utils
import {mount} from 'enzyme';

//constants
import USER_DETAIL_TYPES from 'constants/userDetailTypes';

const fetchAllUsers = jest.fn();

const USER1 = {
		[USER_DETAIL_TYPES.FIRST_NAME]: 'fhjd',
		id: 'dfjhjk',
		[USER_DETAIL_TYPES.LOCATION]: 'LOCATION_CONSTANTS',
	},
	USER2 = {
		[USER_DETAIL_TYPES.FIRST_NAME]: 'dhfghj',
		id: 'dufyudio',
		[USER_DETAIL_TYPES.LOCATION]: 'LOCATION_CONSTANTS',
	};

describe('UserCardsContainer', () => {
	beforeEach(() => {
		fetchAllUsers.mockClear();
	});
	test('if no user Data has been loaded yet, call to fetchAllUsers is made', () => {
		mount(<UserCardsContainer
			fetchAllUsers={fetchAllUsers}
			users={[]}
		/>);

		expect(fetchAllUsers).toHaveBeenCalled();
	});

	test('if users have already loaded or already being loaded no call to fetch users is made', () => {
		mount(<UserCardsContainer
			fetchAllUsers={fetchAllUsers}
			loading
			users={[]}
		/>);
		mount(<UserCardsContainer
			fetchAllUsers={fetchAllUsers}
			loaded
			users={[]}
		/>);

		expect(fetchAllUsers).not.toHaveBeenCalled();
	});

	test('unique_key should be updated only after users have just been fetched', () => {
		const wrapper = mount(<UserCardsContainer
			fetchAllUsers={fetchAllUsers}
			loading
			users={[]}
		/>);
		const initialKey = wrapper.instance().uniqueKey;

		wrapper.setProps({
			loaded: true,
			loading: false,
		});

		const keyAfterLoad = wrapper.instance().uniqueKey;
		expect(keyAfterLoad).not.toBe(initialKey);

		// if loading is now set to true, it has no effect on uniqueKey
		wrapper.setProps({
			loading: true,
		});
		expect(wrapper.instance().uniqueKey).toBe(keyAfterLoad);
	});

	test('number of instances of userCards rendered has to be same as the number of data provided', () => {
		const wrapper1 = mount(<UserCardsContainer
			loaded
		/>);

		const wrapper2 = mount(<UserCardsContainer
			loaded
			users={[
				USER1,
				USER2,
			]}
		/>);

		const wrapper3 = mount(<UserCardsContainer
			loaded
			users={[]}
		/>);

		//initially no UserCards are rendered as 0 usersDetails are provided
		expect(wrapper1.find(UserCard)).toHaveLength(0);
		expect(wrapper3.find(UserCard)).toHaveLength(0);
		expect(wrapper2.find(UserCard).length).toBe(2);
	});
});
