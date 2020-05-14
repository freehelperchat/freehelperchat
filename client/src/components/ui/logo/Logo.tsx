import React from 'react';

import { baseURL } from 'services/api';

import classes from './Logo.module.css';

const Logo: React.FC = () => (
  <div className={classes.Logo}>
    <img src={`${baseURL}images/logo192.png`} alt="Logo" />
  </div>
);

export default Logo;
