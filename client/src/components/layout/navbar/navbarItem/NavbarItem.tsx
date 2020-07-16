import React from 'react';
import { NavLink } from 'react-router-dom';

import messageIcon from 'assets/message.svg';
import Icon from 'components/ui/icon/Icon';
import classes from './NavbarItem.module.css';

interface IProps {
  path: string;
  bgColor?: string;
  exact?: boolean;
  activeChats?: number;
  bottomBar?: boolean;
}

const NavbarItem: React.FC<IProps> = ({
  path,
  exact = false,
  bgColor = '#fff',
  bottomBar = false,
  activeChats,
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
    {bottomBar && (
      <div className={classes.BottomIcon}>
        <div className={classes.IconContainer}>
          <Icon path={messageIcon} color={bgColor} size={32} />
          <p className={classes.IconValue} style={{ color: bgColor }}>
            {activeChats}
          </p>
        </div>
      </div>
    )}
    <div className={classes.Separator} />
  </>
);

export default NavbarItem;
