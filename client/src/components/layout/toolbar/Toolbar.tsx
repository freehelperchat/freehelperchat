import React, { memo } from 'react';

import Navbar from 'components/layout/navbar/Navbar';
import DrawerToggle from 'components/layout/drawerToggle/DrawerToggle';
import Logo from 'components/ui/logo/Logo';

import { IChatInfo, IOnlineOperator } from 'interfaces';
import { Container, LogoContainer, Desktop } from './styles';

interface IProps {
  drawerToggleClicked(): void;
  yourChatsArr?: IChatInfo[];
  otherChatsArr?: IChatInfo[];
  operatorsArr?: IOnlineOperator[];
  side?: 'left' | 'right';
  logo?: boolean;
  options?: boolean;
  yourChats?: boolean;
  operators?: boolean;
  otherChats?: boolean;
  fitContent?: boolean;
}

const Toolbar: React.FC<IProps> = ({
  drawerToggleClicked,
  side = 'left',
  logo,
  options,
  yourChats,
  yourChatsArr,
  operators,
  operatorsArr,
  otherChats,
  otherChatsArr,
  fitContent,
}) => (
  <Container
    side={side}
    fitContent={fitContent}
    style={{
      left: side === 'left' ? 0 : undefined,
      right: side === 'right' ? 0 : undefined,
      width: fitContent ? 'fit-content' : '300px',
    }}
  >
    <DrawerToggle clicked={drawerToggleClicked} />
    {logo && (
      <LogoContainer>
        <Logo />
      </LogoContainer>
    )}
    <Desktop
      logo={logo}
      style={{ height: logo ? 'calc(100% - (128px + 16px))' : '100%' }}
    >
      <Navbar
        yourChats={yourChats}
        yourChatsArr={yourChatsArr}
        operators={operators}
        operatorsArr={operatorsArr}
        options={options}
        otherChats={otherChats}
        otherChatsArr={otherChatsArr}
      />
    </Desktop>
  </Container>
);

export default memo(Toolbar);
