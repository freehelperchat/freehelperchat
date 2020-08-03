import React from 'react';

import { Btn } from './styles';

interface IProps {
  type: 'submit' | 'reset' | 'button';
  label: string;
}

const Button: React.FC<IProps> = ({ type, label }) => {
  return <Btn type={type}>{label}</Btn>;
};

export default Button;
