import React from 'react';
import {pure} from 'recompose';

function Alert(props) {
  const {type, message} = props;
  return (<div className={`alert alert-${type}`} >{message}</div>)
}

export default Alert;
