import React, { memo } from 'react';

import Navbar from 'components/layout/navbar/Navbar';
import DrawerToggle from 'components/layout/drawerToggle/DrawerToggle';
import Logo from 'components/ui/logo/Logo';

import { IChatInfo, IOnlineOperator } from 'interfaces';
import classes from './Toolbar.module.css';

interface IProps {
  drawerToggleClicked(): void;
  yourChatsArr?: IChatInfo[];
  otherChatsArr?: IChatInfo[];
  operatorsArr?: IOnlineOperator[];
  side?: 'left' | 'right';
  logo?: boolean;
  options?: boolean;
  yourChats?: boolean;
  operators?: boolean;
  otherChats?: boolean;
  fitContent?: boolean;
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
  otherChats,
  otherChatsArr,
  fitContent,
}) => (
  <header
    className={classes.Toolbar}
    style={{
      left: side === 'left' ? 0 : undefined,
      right: side === 'right' ? 0 : undefined,
      width: fitContent ? 'fit-content' : '200px',
    }}
  >
    <DrawerToggle clicked={drawerToggleClicked} />
    {logo && (
      <div className={classes.Logo}>
        <Logo />
      </div>
    )}
    <nav
      className={classes.Desktop}
      style={{ height: logo ? 'calc(100% - (128px + 16px))' : '100%' }}
    >
      <Navbar
        yourChats={yourChats}
        operators={operators}
        operatorsArr={operatorsArr}
        options={options}
        yourChatsArr={yourChatsArr}
        otherChats={otherChats}
        otherChatsArr={otherChatsArr}
      />
    </nav>
  </header>
);

export default memo(Toolbar);
