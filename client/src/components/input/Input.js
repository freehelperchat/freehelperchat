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

  let input = null;
  switch (props.Type) {
    case 'select':
      input = (
        <>
          <label
            className={[classes.Label, activeClass].join(' ')}
            htmlFor={props.Name}
          >
            {props.Label}
            {props.Required ? '*' : ''}
          </label>
          <select
            className={classes.Select}
            id={props.Name}
            defaultValue=""
            value={props.Value}
            onChange={props.Change}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={props.Required}
          >
            <option value="" disabled hidden>
              {' '}
            </option>
            {props.Options.map(op => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </>
      );
      break;

    default:
      input = (
        <>
          <label
            className={[classes.Label, activeClass].join(' ')}
            htmlFor={props.Name}
          >
            {props.Label}
            {props.Required ? '*' : ''}
          </label>
          <input
            className={classes.Input}
            type={props.Type}
            value={props.Value}
            onChange={props.Change}
            onFocus={handleFocus}
            onBlur={handleBlur}
            id={props.Name}
            required={props.Required}
          />
        </>
      );
      break;
  }
  return <div className={classes.Container}>{input}</div>;
};

export default Input;
