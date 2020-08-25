import React from 'react';
import { NavLink } from 'react-router-dom';

import messageIcon from 'assets/message.svg';
import Icon from 'components/ui/icon/Icon';
import StatusCircle from 'components/ui/statusCircle/StatusCircle';

import {
  Container,
  ItemContainer,
  BottomIcon,
  IconContainer,
  IconValue,
} from './styles';

interface IProps {
  path?: string;
  bgColor?: string;
  showStatus?: boolean;
  statusColor?: string;
  exact?: boolean;
  activeChats?: number;
  bottomBar?: boolean;
  onClick?: () => void;
  active?: boolean;
}

const NavbarItem: React.FC<IProps> = ({
  path,
  exact = false,
  bgColor = '#fff',
  showStatus = false,
  statusColor = '#44bd32',
  bottomBar = false,
  onClick,
  active,
  activeChats,
  children,
}) => (
  <Container>
    {showStatus && <StatusCircle color={statusColor} />}
    <ItemContainer backgroundColor={bgColor}>
      {path ? (
        <NavLink to={path} exact={exact} activeClassName="active">
          {children}
        </NavLink>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={active ? 'active' : undefined}
        >
          {children}
        </button>
      )}
    </ItemContainer>
    {bottomBar && (
      <BottomIcon>
        <IconContainer>
          <Icon path={messageIcon} color="#aaaaaa" size="32px" />
          <IconValue color="#aaaaaa">{activeChats}</IconValue>
        </IconContainer>
      </BottomIcon>
    )}
  </Container>
);

export default NavbarItem;
