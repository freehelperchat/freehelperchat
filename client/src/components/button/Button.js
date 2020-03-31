import React from 'react';

import classes from './Button.module.css';

const Button = ({ type, label }) => {
  return (
    <button type={type} className={classes[type]}>
      {label}
    </button>
  );
};

export default Button;
