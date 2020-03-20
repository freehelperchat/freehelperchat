import React, { useState } from 'react';

import classes from './Input.module.css';

const Input = props => {
  const [activeClass, setActiveClass] = useState('');

  const handleFocus = () => {
    setActiveClass(classes.Active);
  };

  const handleBlur = () => {
    if (!props.Value || props.Value === '') setActiveClass('');
  };

  const commonProps = {
    id: props.Name,
    value: props.Value || '',
    onChange: props.Change,
    onFocus: handleFocus,
    onBlur: handleBlur,
    required: props.Required,
  };

  let input = null;
  switch (props.Type) {
    case 'select':
      input = (
        <select className={classes.Select} {...commonProps}>
          <option value="" disabled hidden>
            {' '}
          </option>
          {props.Options.map(op => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      );
      break;

    default:
      input = (
        <input className={classes.Input} type={props.Type} {...commonProps} />
      );
      break;
  }
  return (
    <div className={[classes.Container, activeClass].join(' ')}>
      <label className={classes.Label} htmlFor={props.Name}>
        {props.Label}
        {props.Required ? '*' : ''}
      </label>
      {input}
    </div>
  );
};

export default Input;
