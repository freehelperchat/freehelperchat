import React from 'react';

import classes from './Backdrop.module.css';

interface IProps {
  show: boolean;
  clicked(): void;
}

const Backdrop: React.FC<IProps> = ({ show, clicked }) =>
  show ? <div className={classes.Backdrop} onClick={clicked} /> : null;

export default Backdrop;
