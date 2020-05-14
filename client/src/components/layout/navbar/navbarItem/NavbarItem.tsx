import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavbarItem.module.css';

interface IProps {
  path: string;
  exact?: boolean;
}

const NavbarItem: React.FC<IProps> = ({ path, exact = false, children }) => (
  <li className={classes.NavbarItem}>
    <NavLink to={path} exact={exact} activeClassName={classes.active}>
      {children}
    </NavLink>
  </li>
);

export default NavbarItem;
