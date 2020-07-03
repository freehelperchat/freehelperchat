import React, { useState } from 'react';

import Toolbar from 'components/layout/toolbar/Toolbar';
import SideDrawer from 'components/layout/sideDrawer/SideDrawer';

import classes from './Layout.module.css';

interface IProps {
  chats: {
    chatId: number;
    name: string;
    status: number;
  }[];
}

const Layout: React.FC<IProps> = ({ children, chats }) => {
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  const closeSideDrawer = () => setSideDrawerVisible(false);

  const drawerToggleHandler = () => setSideDrawerVisible(!sideDrawerVisible);

  return (
    <>
      <Toolbar chats={chats} drawerToggleClicked={drawerToggleHandler} />
      <SideDrawer
        chats={chats}
        open={sideDrawerVisible}
        closed={closeSideDrawer}
      />
      <main className={classes.Content}>{children}</main>
    </>
  );
};

export default Layout;
