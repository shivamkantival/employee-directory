import {adaptToQueryString} from '../service';
import _includes from 'lodash/includes';

const EMPTY_KEY = 'hello',
	NON_EMPTY_KEY = 'nonEmpty',
	QUERY_OBJECT = {
		[EMPTY_KEY]: [],
		[NON_EMPTY_KEY]: ['hola'],
	};

describe('service', () => {
	describe('adaptToQueryString()', () => {
		test('if some query param is provided with empty value, it is not included in the resultant query string', () => {
			const result = adaptToQueryString(QUERY_OBJECT);
			expect(_includes(`${result}=`, EMPTY_KEY)).toBeFalsy();
			expect(_includes(result, NON_EMPTY_KEY)).toBeTruthy();
		});
	});
});
