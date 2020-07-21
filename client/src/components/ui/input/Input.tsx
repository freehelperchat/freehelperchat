import React, { useState, useRef } from 'react';

import sendIcon from 'assets/send.svg';
import fileIcon from 'assets/file.svg';
import presetIcon from 'assets/preset.svg';
import classes from './Input.module.css';
import Icon from '../icon/Icon';

interface IProps {
  type: string;
  value?: string | number;
  name?: string;
  label?: string;
  change: (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
  required?: boolean;
  options?: string[];
}

const Input: React.FC<IProps> = ({
  type,
  value,
  name,
  label,
  change,
  required,
  options,
}) => {
  const [activeClass, setActiveClass] = useState('');
  const ref = useRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >(null);

  const handleFocus = () => {
    setActiveClass(classes.Active);
  };

  const handleBlur = () => {
    if (!value) {
      if (!ref.current?.value || ref.current.value === '') setActiveClass('');
    } else if (value === '') setActiveClass('');
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaRef = ref.current;
    if (textareaRef) {
      textareaRef.style.cssText = 'height: 30px';
      textareaRef.style.cssText = `height: ${textareaRef?.scrollHeight}px`;
    }
    change(e);
  };

  const handleTextAreaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.which === 13 && !e.shiftKey) {
      const textArea = e.target as HTMLTextAreaElement;
      if (textArea.value.trim() !== '') {
        const submitEvent = document.createEvent('Event');
        submitEvent.initEvent('submit', false, true);
        if (textArea.form) textArea.form.dispatchEvent(submitEvent);
      }
      e.preventDefault();
      const textareaRef = ref.current;
      if (textareaRef) textareaRef.style.cssText = 'height: 30px';
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
        <select
          className={classes.Select}
          {...commonProps}
          ref={ref as React.RefObject<HTMLSelectElement>}
        >
          <option value="" disabled hidden>
            {' '}
          </option>
          {options?.map(op => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      );
      break;

    case 'textarea':
      input = (
        <>
          <textarea
            className={classes.TextArea}
            {...commonProps}
            onChange={handleTextAreaChange}
            onKeyDown={handleTextAreaKeyDown}
            ref={ref as React.RefObject<HTMLTextAreaElement>}
          />
          <Icon path={presetIcon} size={32} color="#ccc" margin={4} />
          <Icon path={fileIcon} size={32} color="#ccc" margin={4} />
          <Icon path={sendIcon} size={45} color="#178CFF" margin={2} />
        </>
      );
      break;

    case 'password':
      input = (
        <input
          className={classes.Input}
          type={type}
          {...commonProps}
          value={undefined}
          ref={ref as React.RefObject<HTMLInputElement>}
        />
      );
      break;

    default:
      input = (
        <input
          className={classes.Input}
          type={type || 'text'}
          {...commonProps}
          ref={ref as React.RefObject<HTMLInputElement>}
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
