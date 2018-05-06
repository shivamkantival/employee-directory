
import update from 'immutability-helper';

import USER_DETAIL_TYPES from 'constants/userDetailTypes';
import {
	APPLY_FILTER,
} from "./index";

const initialState = {
	[USER_DETAIL_TYPES.FIRST_NAME]: '',
	[USER_DETAIL_TYPES.LAST_NAME]: '',
	[USER_DETAIL_TYPES.TEAM]: '',
	[USER_DETAIL_TYPES.LOCATION]: '',
};

function filters(state = initialState, action = {}) {
	switch (action.type) {
		case APPLY_FILTER: {

			return action.payload ? update(state, {
				$set: action.payload,
			}) : state;
		}
		default: {
			return state;
		}
	}
}

export default filters;
