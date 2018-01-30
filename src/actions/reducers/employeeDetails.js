import update from 'immutability-helper';
import {
	LOADED_DETAILS,
	LOADING_DETAILS,
	ADD_USER,
  ERROR_WHILE_LOADING,
} from "./index";

const initialState = {
	loading: false,
	loaded: false,
	data: [],
}

function employeeDetails(state = initialState, action) {
	switch (action.type) {
		case LOADING_DETAILS: {
			return update(state, {
				loading: {
					$set: true,
				},
				loaded: {
					$set: false,
				},
			});
		}
		case LOADED_DETAILS: {
			return update(state, {
				loading: {
					$set: false,
				},
				loaded: {
					$set: true,
				},
				data: {
					$set: action.payload,
				},
			});
		}
		
		case ADD_USER: {
			return update(state, {
				loading: {
					$set: false,
				},
				loaded: {
					$set: true,
				},
				data: {
					$push: [action.payload],
				},
			})
		}
		
    case ERROR_WHILE_LOADING: {
      return update(state, {
        loading: {
          $set: false,
        },
        loaded: {
          $set: state.loaded,
        },
      })
    }
		default: return state;
	}
}

export default employeeDetails;
