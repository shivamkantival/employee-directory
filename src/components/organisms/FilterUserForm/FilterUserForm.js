import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//components
import {Modal, Button, ButtonToolbar} from 'react-bootstrap';

//styles
import s from './FilterUserForm.mod.scss';

const DEFAULT_FORM_LABEL = 'Filter Users';
const DEFAULT_SUCCESS_LABEL = 'Apply filter';

class FilterUserForm extends PureComponent{
	renderFormHeader() {
		const props = this.props;
		return (<Modal.Header closeButton>
			<Modal.Title id="contained-modal-title-sm" bsClass={s.titleText} >{props.headerLabel || DEFAULT_FORM_LABEL}</Modal.Title>
		</Modal.Header>)
	}
	
	renderFormBody() {
		const {FormFieldsRenderer, onValidate, onChange, value, config} = this.props;
		return (<Modal.Body>
			<FormFieldsRenderer
				config={config}
				value={value}
				onValidate={onValidate}
				onChange={onChange}
			/>
		</Modal.Body>)
	}
	
	renderFooter() {
		const props  = this.props;
		return (<Modal.Footer>
			<ButtonToolbar>
				<Button onClick={props.onCancel} bsSize="small">Close</Button>
				<Button onClick={props.onReset} bsSize="small">Reset</Button>
				<Button
					onClick={props.onSave}
					bsStyle="success"
					disabled={!props.isValid}
					bsSize="small"
				>
					{props.successLabel || DEFAULT_SUCCESS_LABEL}
				</Button>
			</ButtonToolbar>
		</Modal.Footer>)
	}
	
	render() {
		const props = this.props;
		return (
			<Modal
				show
				autoFocus
				restoreFocus
				backdrop
				onHide={props.onCancel}
			>
				{this.renderFormHeader(props)}
				{this.renderFormBody(props)}
				{this.renderFooter(props)}
			</Modal>
		)
	}
}

FilterUserForm.propTypes = {
	headerLabel: PropTypes.string,
	successLabel: PropTypes.string,
	onCancel: PropTypes.func,
	onReset: PropTypes.func,
	onSave: PropTypes.func,
	isValid: PropTypes.bool,
};

export default FilterUserForm;
