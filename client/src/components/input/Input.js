import React, { useState } from 'react';

import classes from './Input.module.css';

const Input = ({ type, value, name, label, change, required, options }) => {
  const [activeClass, setActiveClass] = useState('');

  const handleFocus = () => {
    setActiveClass(classes.Active);
  };

  const handleBlur = () => {
    if (!value || value === '') setActiveClass('');
  };

  const commonProps = {
    id: name,
    value: value || '',
    onChange: change,
    onFocus: handleFocus,
    onBlur: handleBlur,
    required,
  };

  let input = null;
  switch (type) {
    case 'select':
      input = (
        <select className={classes.Select} {...commonProps}>
          <option value="" disabled hidden>
            {' '}
          </option>
          {options.map(op => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      );
      break;

    default:
      input = <input className={classes.Input} type={type} {...commonProps} />;
      break;
  }
  return (
    <div className={[classes.Container, activeClass].join(' ')}>
      <label className={classes.Label} htmlFor={name}>
        {label}
        {required ? '*' : ''}
      </label>
      {input}
    </div>
  );
};

export default Input;
