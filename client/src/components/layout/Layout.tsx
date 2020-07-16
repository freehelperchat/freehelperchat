import React, { useState } from 'react';

import Toolbar from 'components/layout/toolbar/Toolbar';
import { IChatInfo, IOnlineOperator } from 'interfaces/index';
// import SideDrawer from 'components/layout/sideDrawer/SideDrawer';

import classes from './Layout.module.css';

interface IProps {
  yourChatsArr: IChatInfo[];
  otherChatsArr: IChatInfo[];
  operatorsArr?: IOnlineOperator[];
}

const Layout: React.FC<IProps> = ({
  children,
  yourChatsArr,
  otherChatsArr,
  operatorsArr,
}) => {
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  // const closeSideDrawer = () => setSideDrawerVisible(false);

  const drawerToggleHandler = () => setSideDrawerVisible(!sideDrawerVisible);

  return (
    <div className={classes.Container}>
      <Toolbar
        logo
        options
        yourChats
        yourChatsArr={yourChatsArr}
        drawerToggleClicked={drawerToggleHandler}
        fitContent
      />
      <main className={classes.Content}>{children}</main>
      <Toolbar
        side="right"
        operators
        operatorsArr={operatorsArr}
        drawerToggleClicked={drawerToggleHandler}
        otherChats
        otherChatsArr={otherChatsArr}
        fitContent
      />
    </div>
  );
};

export default Layout;
