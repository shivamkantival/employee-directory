import filterReducer from './filter';
import employeeReducer from './employeeDetails';

import { combineReducers } from 'redux';

export const APPLY_FILTER = 'APPLY_FILTER',
	LOADING_DETAILS = 'LOADING_DETAILS',
	LOADED_DETAILS = 'LOADED_DETAILS',
	ADD_USER = 'ADD_USER',
  ERROR_WHILE_LOADING = 'ERROR_WHILE_LOADING',
  UPDATE_USER = 'UPDATE_USER';

export default combineReducers({
	employeeDetails: employeeReducer,
	filters: filterReducer,
});