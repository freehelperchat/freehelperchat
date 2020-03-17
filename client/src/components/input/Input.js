import React from 'react';
import { useTranslation } from 'react-i18next';

const Input = props => {
  const { t } = useTranslation('translation');
  let input = null;
  switch (props.Type) {
    case 'select':
      input = (
        <>
          <label htmlFor={props.Name}>{props.Label}</label>
          <select
            id={props.Name}
            defaultValue=""
            onChange={props.Change}
            required={props.Required}
          >
            <option value="" disabled hidden>
              {t('input.select')}
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
          <label htmlFor={props.Name}>{props.Label}</label>
          <input
            type={props.Type}
            onChange={props.Change}
            id={props.Name}
            required={props.Required}
          />
        </>
      );
      break;
  }
  return <div>{input}</div>;
};

export default Input;
