import React, { useState } from 'react';

import Toolbar from 'components/layout/toolbar/Toolbar';
import SideDrawer from 'components/layout/sideDrawer/SideDrawer';

import classes from './Layout.module.css';

interface IProps {
  yourChatsArr: {
    chatId: number;
    name: string;
    status: number;
  }[];
  operatorsArr?: {
    name: string;
    activeChats: number;
    status: boolean;
  }[];
}

const Layout: React.FC<IProps> = ({ children, yourChatsArr, operatorsArr }) => {
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  const closeSideDrawer = () => setSideDrawerVisible(false);

  const drawerToggleHandler = () => setSideDrawerVisible(!sideDrawerVisible);

  return (
    <>
      <Toolbar
        logo
        options
        yourChats
        yourChatsArr={yourChatsArr}
        drawerToggleClicked={drawerToggleHandler}
      />
      <SideDrawer
        chats={yourChatsArr}
        open={sideDrawerVisible}
        closed={closeSideDrawer}
      />
      <main className={classes.Content}>{children}</main>
      <Toolbar
        side="right"
        operators
        operatorsArr={operatorsArr}
        drawerToggleClicked={drawerToggleHandler}
      />
    </>
  );
};

export default Layout;
