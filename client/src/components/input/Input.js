import React from 'react';

const Input = props => {
  return (
    <div>
      <label htmlFor={props.Id}>{props.Label}</label>
      <input type={props.Type} onChange={props.Change} id={props.Id} />
    </div>
  );
};

export default Input;
