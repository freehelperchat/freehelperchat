import React from 'react';

import { Container } from './styles';

interface IProps {
  clicked(): void;
}

const DrawerToggle: React.FC<IProps> = ({ clicked }) => (
  <Container onClick={clicked}>
    <div />
    <div />
    <div />
  </Container>
);

export default DrawerToggle;
