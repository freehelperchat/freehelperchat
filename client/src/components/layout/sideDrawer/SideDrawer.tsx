import React from 'react';

import Logo from 'components/ui/logo/Logo';
import Navbar from 'components/layout/navbar/Navbar';
import Backdrop from 'components/layout/backdrop/Backdrop';
import { IChatInfo } from 'interfaces';
import { Container, LogoContainer } from './styles';

interface IProps {
  open: boolean;
  closed(): void;
  chats: IChatInfo[];
}

const SideDrawer: React.FC<IProps> = ({ chats, open, closed }) => {
  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <Container open={open} onClick={closed}>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <nav>
          <Navbar yourChatsArr={chats} />
        </nav>
      </Container>
    </>
  );
};

export default SideDrawer;
