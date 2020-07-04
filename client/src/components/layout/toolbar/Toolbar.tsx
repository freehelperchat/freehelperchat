import React, { memo } from 'react';

import Navbar from 'components/layout/navbar/Navbar';
import DrawerToggle from 'components/layout/drawerToggle/DrawerToggle';
import Logo from 'components/ui/logo/Logo';

import classes from './Toolbar.module.css';

interface IProps {
  drawerToggleClicked(): void;
  yourChatsArr?: {
    chatId: number;
    name: string;
    status: number;
  }[];
  operatorsArr?: {
    name: string;
    activeChats: number;
    status: boolean;
  }[];
  side?: 'left' | 'right';
  logo?: boolean;
  options?: boolean;
  yourChats?: boolean;
  operators?: boolean;
}

const Toolbar: React.FC<IProps> = ({
  drawerToggleClicked,
  side = 'left',
  logo,
  options,
  yourChats,
  yourChatsArr,
  operators,
  operatorsArr,
}) => (
  <header
    className={classes.Toolbar}
    style={{
      left: side === 'left' ? 0 : undefined,
      right: side === 'right' ? 0 : undefined,
    }}
  >
    <DrawerToggle clicked={drawerToggleClicked} />
    {logo && (
      <div className={classes.Logo}>
        <Logo />
      </div>
    )}
    <nav className={classes.Desktop}>
      <Navbar
        yourChats={yourChats}
        operators={operators}
        operatorsArr={operatorsArr}
        options={options}
        yourChatsArr={yourChatsArr}
      />
    </nav>
  </header>
);

export default memo(Toolbar);
