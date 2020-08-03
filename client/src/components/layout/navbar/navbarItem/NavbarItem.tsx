import React from 'react';
import { NavLink } from 'react-router-dom';

import messageIcon from 'assets/message.svg';
import Icon from 'components/ui/icon/Icon';
import StatusCircle from 'components/ui/statusCircle/StatusCircle';
import classes from './NavbarItem.module.css';

interface IProps {
  path: string;
  bgColor?: string;
  showStatus?: boolean;
  statusColor?: string;
  exact?: boolean;
  activeChats?: number;
  bottomBar?: boolean;
}

const NavbarItem: React.FC<IProps> = ({
  path,
  exact = false,
  bgColor = '#fff',
  showStatus = false,
  statusColor = '#44bd32',
  bottomBar = false,
  activeChats,
  children,
}) => (
  <div style={{ position: 'relative' }}>
    {showStatus && <StatusCircle color={statusColor} />}
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
          <Icon path={messageIcon} color={bgColor} size="32px" />
          <p className={classes.IconValue} style={{ color: bgColor }}>
            {activeChats}
          </p>
        </div>
      </div>
    )}
    <div className={classes.Separator} />
  </div>
);

export default NavbarItem;
