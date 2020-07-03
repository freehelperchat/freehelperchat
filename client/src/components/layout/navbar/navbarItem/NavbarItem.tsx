import React from 'react';
import { NavLink } from 'react-router-dom';

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
);

export default NavbarItem;
