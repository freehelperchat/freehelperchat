import React from 'react';

import { baseURL } from 'services/api';

import classes from './Logo.module.css';

const Logo: React.FC = () => (
  <div className={classes.Logo}>
    <object data={`${baseURL}images/logo.svg`} type="image/svg+xml">
      <img src={`${baseURL}images/logo.png`} alt="Logo" />
    </object>
  </div>
);

export default Logo;
