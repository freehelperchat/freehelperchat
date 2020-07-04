import React from 'react';
import { NavLink } from 'react-router-dom';

import messageIcon from 'assets/message.svg';
import Icon from 'components/ui/icon/Icon';
import classes from './NavbarItem.module.css';

interface IProps {
  path: string;
  bgColor?: string;
  exact?: boolean;
}

const NavbarItem: React.FC<IProps> = ({
  path,
  exact = false,
  bgColor = '#fff',
  children,
}) => (
  <>
    <div className={classes.NavbarItem}>
      <NavLink
        to={path}
        exact={exact}
        activeClassName={classes.active}
        style={{ backgroundColor: bgColor }}
      >
        {children}
      </NavLink>
    </div>
    <div className={classes.BottomIcon}>
      <Icon path={messageIcon} color={bgColor} size={32} />2
    </div>
    <div className={classes.Separator} />
  </>
);

export default NavbarItem;
