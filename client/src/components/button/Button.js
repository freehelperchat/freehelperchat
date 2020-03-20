import React from 'react';

import classes from './Button.module.css';

const Button = props => {
  return (
    <button type={props.Type} className={classes[props.Type]}>
      {props.Label}
    </button>
  );
};

export default Button;
