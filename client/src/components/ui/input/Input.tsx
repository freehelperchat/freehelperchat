import React, { useState, useRef } from 'react';

import sendIcon from 'assets/send.svg';
import fileIcon from 'assets/file.svg';
import presetIcon from 'assets/preset.svg';
import {
  Container,
  Label,
  Input as InputElem,
  Select,
  TextArea,
} from './styles';
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
  sendClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  fileClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  presetClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Input: React.FC<IProps> = ({
  type,
  value,
  name,
  label,
  change,
  required,
  options,
  sendClick,
  fileClick,
  presetClick,
}) => {
  const [activeClass, setActiveClass] = useState(false);
  const ref = useRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >(null);

  const handleBlur = () => {
    if (!value) {
      if (!ref.current?.value || ref.current.value === '')
        setActiveClass(false);
    } else if (value === '') setActiveClass(false);
    else setActiveClass(true);
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
    onBlur: handleBlur,
    required,
  };

  let input = null;
  switch (type) {
    case 'select':
      input = (
        <Select
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
        </Select>
      );
      break;

    case 'textarea':
      input = (
        <>
          <TextArea
            {...commonProps}
            onChange={handleTextAreaChange}
            onKeyDown={handleTextAreaKeyDown}
            ref={ref as React.RefObject<HTMLTextAreaElement>}
          />
          <Icon
            path={presetIcon}
            size="32px"
            color="#ccc"
            margin="4px"
            onClick={presetClick}
          />
          <Icon
            path={fileIcon}
            size="32px"
            color="#ccc"
            margin="4px"
            onClick={fileClick}
          />
          <Icon
            path={sendIcon}
            size="45px"
            color="#178CFF"
            margin="2px"
            onClick={sendClick}
          />
        </>
      );
      break;

    case 'password':
      input = (
        <InputElem
          type={type}
          {...commonProps}
          value={undefined}
          ref={ref as React.RefObject<HTMLInputElement>}
        />
      );
      break;

    default:
      input = (
        <InputElem
          type={type || 'text'}
          {...commonProps}
          ref={ref as React.RefObject<HTMLInputElement>}
        />
      );
      break;
  }
  return (
    <Container active={activeClass}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required ? '*' : ''}
        </Label>
      )}
      {input}
    </Container>
  );
};

export default Input;
