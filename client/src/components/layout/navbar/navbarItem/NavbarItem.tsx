import React from 'react';
import { NavLink } from 'react-router-dom';

import messageIcon from 'assets/message.svg';
import Icon from 'components/ui/icon/Icon';
import classes from './NavbarItem.module.css';

interface IProps {
  path: string;
  bgColor?: string;
  exact?: boolean;
  bottomBar?: boolean;
}

const NavbarItem: React.FC<IProps> = ({
  path,
  exact = false,
  bgColor = '#fff',
  bottomBar = false,
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
        <div
          style={{
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Icon path={messageIcon} color={bgColor} size={32} />
          <p style={{ color: bgColor, margin: '0 5px' }}>2</p>
        </div>
        <div
          style={{
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Icon path={messageIcon} color={bgColor} size={32} />
          <p style={{ color: bgColor, margin: '0 5px' }}>2</p>
        </div>
        <div
          style={{
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Icon path={messageIcon} color={bgColor} size={32} />
          <p style={{ color: bgColor, margin: '0 5px' }}>2</p>
        </div>
        <div
          style={{
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Icon path={messageIcon} color={bgColor} size={32} />
          <p style={{ color: bgColor, margin: '0 5px' }}>2</p>
        </div>
      </div>
    )}
    <div className={classes.Separator} />
  </>
);

export default NavbarItem;
