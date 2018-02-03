import TextInput from './TextInput';
import SingleSelect from './SingleSelect';
import ColorSelect from './ColorSelect';

export const FIELD_TYPES = {
	TEXT_INPUT: 'text',
	SINGLE_SELECT: 'select',
  COLOR_SELECT: 'color',
};

export const FIELD_TYPE_TO_RENDERER = new Map([
	[FIELD_TYPES.TEXT_INPUT, TextInput],
	[FIELD_TYPES.SINGLE_SELECT, SingleSelect],
	[FIELD_TYPES.COLOR_SELECT, ColorSelect],
]);
