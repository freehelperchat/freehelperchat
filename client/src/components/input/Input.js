import React from 'react';

const Input = props => {
  let input = null;
  switch (props.Type) {
    case 'select':
      input = (
        <select
          defaultValue=""
          onChange={props.Change}
          required={props.Required}
        >
          <option value="">{props.Label}</option>
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
