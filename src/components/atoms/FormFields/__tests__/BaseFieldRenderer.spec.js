import React from 'react';

import BaseFieldRenderer from '../BaseFieldRenderer';
import s from '../FormFields.mod.scss';

//utils
import {shallow} from 'enzyme';
import _includes from 'lodash/includes';

describe('BaseFieldRenderer', () => {
	test('Container is rendered with fieldClass applied to the outermost container of the field', () => {
		const fieldClass = 'sfudkufhj',
			wrapper = shallow(<BaseFieldRenderer fieldClass={fieldClass} >
					null
				</BaseFieldRenderer>);
		const result = wrapper.prop('className');
		expect(_includes(wrapper.prop('className'), fieldClass)).toBeTruthy();
	});

	test('component should not render error node unless error is not an empty value', () => {
		const error = '',
			wrapper = shallow(<BaseFieldRenderer error={error} >
				null
			</BaseFieldRenderer>);

		expect(wrapper.find(`span.${s.errorStyles}`).length).toBe(0);
	});

	test('if a valid error value is provided, error node is rendered', () => {
		const error = 'sjdj',
			wrapper = shallow(<BaseFieldRenderer error={error}>
				null
			</BaseFieldRenderer>);

		const result = wrapper.find(`span.${s.errorStyles}`);
		expect(result.length).toBe(1);
	});
});
