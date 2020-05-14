import React from 'react';

import Logo from 'components/ui/logo/Logo';
import Navbar from 'components/layout/navbar/Navbar';
import Backdrop from 'components/layout/backdrop/Backdrop';
import classes from './SideDrawer.module.css';

interface IProps {
  open: boolean;
  closed(): void;
}

const SideDrawer: React.FC<IProps> = ({ open, closed }) => {
  const attachedClasses = [
    classes.SideDrawer,
    open ? classes.Open : classes.Close,
  ].join(' ');
  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses} onClick={closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <Navbar />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
