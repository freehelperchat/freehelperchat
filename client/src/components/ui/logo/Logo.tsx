import React from 'react';

import { baseURL } from 'services/api';

import { Container } from './styles';

const Logo: React.FC = () => (
  <Container>
    <object data={`${baseURL}images/logo.svg`} type="image/svg+xml">
      <img src={`${baseURL}images/logo.png`} alt="Logo" />
    </object>
  </Container>
);

export default Logo;
