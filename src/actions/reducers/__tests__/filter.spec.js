import filtersReducer from '../filter';

//utils
import _forEach from 'lodash/forEach';

//constants
import {APPLY_FILTER} from '../index';

describe('filtersReducer', () => {
	describe('actions.defult', () => {
		test('default initial state defined has no filter values and all values are empty', () => {
			const result = filtersReducer();
			_forEach(result, filterValue => {
				expect(filterValue).toBeFalsy();
			});
		});

		test('if invalid action type is provided initial state is retuned', () => {
			const initialState = {};

			expect(filtersReducer(initialState, {type: 'sjdhgjh'})).toBe(initialState);
		});
	});

	describe('action.APPLY_FILTER', () => {
		test('when some payload value is provided, it completely replaces the current state', () => {
			const initialState = {},
				newState = {};

			const result = filtersReducer(initialState, {type: APPLY_FILTER, payload: newState});
			expect(result).toBe(newState);
			expect(result).not.toBe(initialState);
		});

		test('when no payload is provided, current state is returned', () => {
			const initialState = {};

			expect(filtersReducer(initialState, {type: APPLY_FILTER})).toBe(initialState);
		});
	});
});
