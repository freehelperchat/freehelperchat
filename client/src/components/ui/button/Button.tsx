import React from 'react';

import classes from './Button.module.css';

interface IProps {
  type: 'submit' | 'reset' | 'button';
  label: string;
}

const Button: React.FC<IProps> = ({ type, label }) => {
  return (
    <button type={type} className={classes[type.toString()]}>
      {label}
    </button>
  );
};

export default Button;
