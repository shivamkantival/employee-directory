import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//components
import {Modal, Button, ButtonToolbar} from 'react-bootstrap';
import FormBody from './FormBody';

//styles
import s from './EmployeeDetailsForm.mod.scss';

const DEFAULT_FORM_LABEL = 'Employee Details (All details are needed)';
const DEFAULT_SUCCESS_LABEL = 'Save';

class EmployeeDetailsForm extends PureComponent{
	
	renderFormHeader() {
		const props = this.props;
		return (<Modal.Header closeButton>
			<Modal.Title id="contained-modal-title-sm" bsClass={s.titleText} >{props.headerLabel || DEFAULT_FORM_LABEL}</Modal.Title>
		</Modal.Header>)
	}
	
	renderFormBody() {
		return (<Modal.Body>
			<FormBody {...this.props} />
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
					bsSize="small"
				>
					{props.successLabel || DEFAULT_SUCCESS_LABEL}
				</Button>
			</ButtonToolbar>
		</Modal.Footer>)
					// disabled={!props.isValid}
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
				bsSize="lg"
			>
				{this.renderFormHeader(props)}
				{this.renderFormBody(props)}
				{this.renderFooter(props)}
			</Modal>
		)
	}
}

EmployeeDetailsForm.propTypes = {
  headerLabel: PropTypes.string,
  successLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  onSave: PropTypes.func,
  isValid: PropTypes.bool,
};

export default EmployeeDetailsForm;
