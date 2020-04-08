import React, { useState, useRef } from 'react';

import classes from './Input.module.css';

const Input = ({ type, value, name, label, change, required, options }) => {
  const [activeClass, setActiveClass] = useState('');
  const ref = useRef(null);

  const handleFocus = () => {
    setActiveClass(classes.Active);
  };

  const handleBlur = () => {
    if (!value || value === '') setActiveClass('');
  };

  const handleTextAreaChange = e => {
    const textareaRef = ref.current;
    textareaRef.style.cssText = 'height: 30px';
    textareaRef.style.cssText = `height: ${textareaRef.scrollHeight}px`;
    change(e);
  };

  const handleTextAreaKeyDown = e => {
    if (e.which === 13 && !e.shiftKey) {
      if (e.target.value.trim() !== '') {
        const submitEvent = document.createEvent('Event');
        submitEvent.initEvent('submit', false, true);
        e.target.form.dispatchEvent(submitEvent);
      }
      e.preventDefault();
      const textareaRef = ref.current;
      textareaRef.style.cssText = 'height: 30px';
    }
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

    case 'textarea':
      input = (
        <textarea
          className={classes.TextArea}
          ref={ref}
          {...commonProps}
          onChange={handleTextAreaChange}
          onKeyDown={handleTextAreaKeyDown}
        />
      );
      break;

    default:
      input = (
        <input
          className={classes.Input}
          type={type || 'text'}
          {...commonProps}
        />
      );
      break;
  }
  return (
    <div className={[classes.Container, activeClass].join(' ')}>
      {label && (
        <label className={classes.Label} htmlFor={name}>
          {label}
          {required ? '*' : ''}
        </label>
      )}
      {input}
    </div>
  );
};

export default Input;
