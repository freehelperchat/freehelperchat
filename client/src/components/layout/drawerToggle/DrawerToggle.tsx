import React from 'react';

import classes from './DrawerToggle.module.css';

interface IProps {
  clicked(): void;
}

const DrawerToggle: React.FC<IProps> = ({ clicked }) => (
  <div className={classes.DrawerToggle} onClick={clicked}>
    <div />
    <div />
    <div />
  </div>
);

export default DrawerToggle;
