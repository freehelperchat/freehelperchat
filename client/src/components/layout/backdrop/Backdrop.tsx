import React from 'react';

import { Container } from './styles';

interface IProps {
  show: boolean;
  clicked(): void;
}

const Backdrop: React.FC<IProps> = ({ show, clicked }) =>
  show ? <Container onClick={clicked} /> : null;

export default Backdrop;
