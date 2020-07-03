import React, { memo } from 'react';

import Navbar from 'components/layout/navbar/Navbar';
import DrawerToggle from 'components/layout/drawerToggle/DrawerToggle';
import Logo from 'components/ui/logo/Logo';

import classes from './Toolbar.module.css';

interface IProps {
  drawerToggleClicked(): void;
  chats: {
    chatId: number;
    name: string;
    status: number;
  }[];
}

const Toolbar: React.FC<IProps> = ({ drawerToggleClicked, chats }) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.Desktop}>
      <Navbar chats={chats} />
    </nav>
  </header>
);

export default memo(Toolbar);
