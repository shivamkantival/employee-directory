import {
	adaptUserDetailsForQuery,
	adaptUserDetailsForDisplay,
} from '../userDetails';

//constants
import USER_DETAIL_TYPES from 'constants/userDetailTypes';
import TEAM_OPTIONS, { TEAMLESS } from 'constants/teams';

//utils
import _forEach from 'lodash/forEach';

describe('userDetails', () => {
	describe('adaptUserDetailsForQuery()', () => {
		test('color value should be stripped of #, remaining hex value reamins the same', () => {
			const COLOR = '3764';
			expect(adaptUserDetailsForQuery({[USER_DETAIL_TYPES.COLOR]: `#${COLOR}`})).toEqual({
				[USER_DETAIL_TYPES.COLOR]: COLOR,
			});
		});

		test('no property other than color, either referential or literal must be changed', () => {
			const input = {
				[USER_DETAIL_TYPES.COLOR]: '#7777',
				hello: 'hello',
				object: {},
				array: [],
			};

			const result = adaptUserDetailsForQuery(input);
			_forEach(result, (value, key) => {
				if (key !== USER_DETAIL_TYPES.COLOR) {
					expect(value).toBe(input[key]); // toBe <> emphasise referential equality
				}
			});
		});
	});

	describe('adaptUserDetailsForDisplay()', () => {
		test('color value is appended with #', () => {
			const input = '73463',
				colorType = USER_DETAIL_TYPES.COLOR;
			expect(adaptUserDetailsForDisplay({[colorType]: input})[colorType]).toBe(`#${input}`);

			//if no color is defined FFFF is the default value
			expect(adaptUserDetailsForDisplay({})[colorType]).toBe('#ffff');
		});

		test('team value must be replaced with corresponding option label', () => {
			const teamType = USER_DETAIL_TYPES.TEAM;
			expect(adaptUserDetailsForDisplay({[teamType]: TEAM_OPTIONS[0].value})[teamType]).toBe(TEAM_OPTIONS[0].label);
			expect(adaptUserDetailsForDisplay({[teamType]: TEAM_OPTIONS[1].value})[teamType]).toBe(TEAM_OPTIONS[1].label);

			//if no team is defined teamless is the value picked by default
			expect(adaptUserDetailsForDisplay({})[teamType]).toBe(TEAMLESS.label);
		});
	});
});
