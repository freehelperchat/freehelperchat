import React from 'react';

import Navbar from 'components/layout/navbar/Navbar';
import DrawerToggle from 'components/layout/drawerToggle/DrawerToggle';
import Logo from 'components/ui/logo/Logo';

import classes from './Toolbar.module.css';

interface IProps {
  drawerToggleClicked(): void;
}

const Toolbar: React.FC<IProps> = ({ drawerToggleClicked }) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.Desktop}>
      <Navbar />
    </nav>
  </header>
);

export default Toolbar;
