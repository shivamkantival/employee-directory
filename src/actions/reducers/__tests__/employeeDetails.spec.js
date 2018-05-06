import employeeDetails from '../employeeDetails';

//constants
import {
	LOADED_DETAILS,
	LOADING_DETAILS,
	ADD_USER,
  ERROR_WHILE_LOADING,
  UPDATE_USER,
} from "../index";

describe('employeeDetails', () => {
	describe('actions.DEFAULT', () => {
		test('if no state is provided, state is initialized to initial value and default action returns the same', () => {
			expect(employeeDetails(undefined, {type: 'jjdnk'})).toEqual({ // since action type is not a valid type, default method case is run
				loading: false,
				loaded: false,
				data: [],
			});
		});

		test('if some initial state is provided, same is retuned if action type is not valid', () => {
			const input = {};

			expect(employeeDetails(input, {type: 'sjdkij'})).toBe(input); // to ensure same satte object is returned
		});
	});

	describe('actions.LOADED_DETAILS', () => {
		test('loaded must be set to true and loading to false', () => {
			expect(employeeDetails({loaded: false, loading: true}, {type: LOADED_DETAILS})).toEqual({
				loaded: true,
				loading: false,
				data: undefined,
			});
		});

		test('data is replaced by the value provided in payload of action', () => {
			const newData = [
				'hello',
				'hoe are you',
			];

			expect(employeeDetails({loaded: false, loading: true, data: [{}, {}]}, {
				type: LOADED_DETAILS,
				payload: newData,
			}).data).toBe(newData); // new data is referentially same as provided payload
		});
	});

	describe('actions.LOADING_DETAILS', () => {
		test('loading must be set to true and loaded to remains same', () => {
			const initialState = {
				loading: false,
				loaded: true,
				data: [],
			};

			const result = employeeDetails(initialState, {type: LOADING_DETAILS});
			expect(result).toEqual({
				loaded: initialState.loaded,
				loading: true,
				data: initialState.data,
			});

			expect(result.data).toBe(initialState.data); // to ensure data is not altered
		});
	});

	describe('actions.ADD_USER', () => {
		test('loading and loaded state are not altered', () => {
			const initialState = {
				loaded: true,
				loading: false,
				data: [],
			};

			const result = employeeDetails(initialState, {type: ADD_USER});
			expect(result.loaded).toBe(initialState.loaded);
			expect(result.loading).toBe(initialState.loading);
		});

		test('if payload is defined it is appended to the end of current data', () => {
			const initialState = {data: [{}, {}]},
				newData = {};

			const result = employeeDetails(initialState, {type: ADD_USER, payload: newData});
			expect(result.data.length).toBe(initialState.data.length + 1);
			expect(result.data.pop()).toBe(newData); // compare reference of appended value to data
		});

		test('if payload is not defined, state is not altered', () => {
			const initialState = {};

			expect(employeeDetails(initialState, {type: ADD_USER})).toBe(initialState);
		});
	});

	describe('actions.ERROR_WHILE_LOADING', () => {
		test('loading state is set to false, and loaded is saved to initial value of loaded', () => {
			const initialState = {
				loading: true,
				loaded: true,
			};

			const result = employeeDetails(initialState, {type: ERROR_WHILE_LOADING});
			expect(result.loaded).toBe(initialState.loaded);
			expect(result.loading).toBe(false);
		});
	});

	describe('actions.UPDATE_USER', () => {
		test('if provided user is not found in current state, state is not altered', () => {
			const initialState = {
				data: [],
			};

			expect(employeeDetails(initialState, {type: UPDATE_USER, payload: {id: 'skjd'}})).toBe(initialState);
		});

		test('if provided is found in current users, it is replaced with the provided payload', () => {
			const id = 'sfhj',
				initialState = {
					data: [
					{id: 'shdh'},
					{id},
					],
				},
				newData = {id, hello: 'hello'};

			expect(employeeDetails(initialState, {type: UPDATE_USER, payload: newData}).data[1]).toBe(newData);
		});

		test('if no payload is defined, original state is returned', () => {
			const initialState = {
				data: [],
			};

			expect(employeeDetails(initialState, {type: UPDATE_USER})).toBe(initialState);
		});
	});
});
