import React from 'react';

const Alert = ({ title, message, variant }) => (
  <div className={`alert alert-${variant}`}>
    <h4>{title}</h4>
    <p>{message}</p>
  </div>
);

export default Alert;