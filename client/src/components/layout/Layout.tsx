import React, { useState } from 'react';

import Toolbar from 'components/layout/toolbar/Toolbar';
import SideDrawer from 'components/layout/sideDrawer/SideDrawer';

import classes from './Layout.module.css';

const Layout: React.FC = ({ children }) => {
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  const closeSideDrawer = () => setSideDrawerVisible(false);

  const drawerToggleHandler = () => setSideDrawerVisible(!sideDrawerVisible);

  return (
    <>
      <Toolbar drawerToggleClicked={drawerToggleHandler} />
      <SideDrawer open={sideDrawerVisible} closed={closeSideDrawer} />
      <main className={classes.Content}>{children}</main>
    </>
  );
};

export default Layout;
