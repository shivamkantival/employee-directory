import validators from '../validators';

//constants
import TEAM_OPTIONS from 'constants/teams';

describe('validators', () => {
	describe('stringNotEmpty()', () => {
		test('should return error text if value is not a valid string', () => {
			expect(validators.stringNotEmpty({})).toBeTruthy();
		});

		test('should return error text is value is a falsy value', () => {
			expect(validators.stringNotEmpty('')).toBeTruthy();
			expect(validators.stringNotEmpty(undefined)).toBeTruthy();
			expect(validators.stringNotEmpty(null)).toBeTruthy();
		});

		test('should return falsy value if the defined value is a valid string', () => {
		});
		expect(validators.stringNotEmpty('sdh')).toBeFalsy();
	});

	describe('optionNotEmpty()', () => {
		test('should return a falsy value if input is a valid non empty option', () => {
			expect(validators.optionNotEmpty({label: 'label'})).toBeFalsy();
		});

		test('should return error text if empty option is selected', () => {
			expect(validators.optionNotEmpty({})).toBeTruthy();
		});
	});

	describe('validateName()', () => {
		test('if a name contains any character than `.`, `-` ` ` or alphabets, error text must be returned', () => {
			expect(validators.validateName('shi$ksfj')).toBeTruthy();
			expect(validators.validateName('shiksfj,')).toBeTruthy();
		});

		test('empty string also causes error text to be returned', () => {
			expect(validators.validateName('')).toBeTruthy();
		});

		test('for all other entried falsy value is returned', () => {
			expect(validators.validateName('S. Kantival')).toBeFalsy();
			expect(validators.validateName('skjhdjh fhsiui')).toBeFalsy();
			expect(validators.validateName('sfhg-dgh')).toBeFalsy();
		});
	});

	describe('validateTeam()', () => {
		test('returns error text if no team option is found with given value', () => {
			expect(validators.validateTeam('sjdhs')).toBeTruthy();
			expect(validators.validateTeam()).toBeTruthy();
		});

		test('returns falsy value if a valid option is provided', () => {
			expect(validators.validateTeam(TEAM_OPTIONS[0].value)).toBeFalsy();
		});
	});
});
