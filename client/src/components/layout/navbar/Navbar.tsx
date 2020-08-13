import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { IChatInfo, IOnlineOperator } from 'interfaces';

import { getColorByText } from 'utils/utils';
import NavbarItem from 'components/layout/navbar/navbarItem/NavbarItem';
import Icon from 'components/ui/icon/Icon';
import messageIcon from 'assets/message.svg';
import userIcon from 'assets/user.svg';
import settingsIcon from 'assets/settings.svg';
import stonksIcon from 'assets/stonks.svg';
import backIcon from 'assets/back.svg';
import chatStatus from 'constants/chatStatus';
import { Container, Title, BottomBar, TopBar } from './styles';

interface IProps {
  yourChatsArr?: IChatInfo[];
  otherChatsArr?: IChatInfo[];
  operatorsArr?: IOnlineOperator[];
  options?: boolean;
  yourChats?: boolean;
  operators?: boolean;
  otherChats?: boolean;
}

const Navbar: React.FC<IProps> = ({
  yourChatsArr = [],
  operatorsArr = [],
  otherChatsArr = [],
  options,
  yourChats,
  operators,
  otherChats,
}) => {
  const { t } = useTranslation();
  return (
    <Container>
      {yourChats && (
        <>
          <Title>{t('dashboard.your_chats')}</Title>
          <TopBar>
            {yourChatsArr.map(chat => (
              <NavbarItem
                bgColor={getColorByText(chat.name)}
                path={`/admin/chat/${chat._id}`}
                showStatus={chat.status === chatStatus.PENDING}
                statusColor="#17c0eb"
                exact
                key={chat.clientToken}
              >
                <Icon path={messageIcon} color="white" size="32px" />
                {chat.name}
              </NavbarItem>
            ))}
          </TopBar>
        </>
      )}
      {operators && (
        <>
          <Title>{t('dashboard.online_operators')}</Title>
          <TopBar>
            {operatorsArr.map(operator => (
              <NavbarItem
                bgColor="#178CFF"
                bottomBar
                showStatus
                statusColor={
                  operator.operator.hideOnline ? '#ff3838' : undefined
                }
                activeChats={operator.operator.activeChats}
                key={operator._id}
              >
                <Icon path={userIcon} color="white" size="32px" />
                {operator.operator.fullName}
              </NavbarItem>
            ))}
          </TopBar>
        </>
      )}
      {options && (
        <>
          <BottomBar>
            <NavbarItem bgColor="#A5A5A5" path="/admin" exact>
              <Icon path={stonksIcon} color="white" size="32px" />
              {t('navbar.dashboard')}
            </NavbarItem>
            <NavbarItem bgColor="#A5A5A5" path="/admin/profile" exact>
              <Icon path={userIcon} color="white" size="32px" />
              {t('navbar.profile')}
            </NavbarItem>
            <NavbarItem bgColor="#A5A5A5" path="/admin/settings">
              <Icon path={settingsIcon} color="white" size="32px" />
              {t('navbar.settings')}
            </NavbarItem>
            <NavbarItem bgColor="#AA4444" path="/logout" exact>
              <Icon path={backIcon} color="white" size="32px" />
              {t('navbar.logout')}
            </NavbarItem>
          </BottomBar>
        </>
      )}
      {otherChats && (
        <>
          <Title>{t('dashboard.other_chats')}</Title>
          <TopBar>
            {otherChatsArr.map(chats => (
              <NavbarItem
                key={chats.clientToken}
                bgColor="#A5A5A5"
                path={`/admin/chat/${chats._id}`}
                exact
              >
                <Icon path={messageIcon} color="white" size="32px" />
                {chats.name}
              </NavbarItem>
            ))}
          </TopBar>
        </>
      )}
    </Container>
  );
};

function arePropsEqual(prevProps: IProps, nextProps: IProps): boolean {
  if (prevProps.yourChatsArr) {
    if (prevProps.yourChatsArr.length !== nextProps.yourChatsArr?.length)
      return false;
    const filteredChats = prevProps.yourChatsArr.filter(
      (chat, i) =>
        nextProps.yourChatsArr &&
        (chat._id !== nextProps.yourChatsArr[i]._id ||
          chat.status !== nextProps.yourChatsArr[i].status)
    );
    if (filteredChats.length !== 0) return false;
  }

  if (prevProps.operatorsArr) {
    if (prevProps.operatorsArr.length !== nextProps.operatorsArr?.length)
      return false;
    const filteredOperators = prevProps.operatorsArr.filter(
      (operator, i) =>
        nextProps.operatorsArr &&
        (operator._id !== nextProps.operatorsArr[i]._id ||
          operator.operator.activeChats !==
            nextProps.operatorsArr[i].operator.activeChats ||
          operator.operator.hideOnline !==
            nextProps.operatorsArr[i].operator.hideOnline)
    );
    if (filteredOperators.length !== 0) return false;
  }

  if (prevProps.otherChatsArr) {
    if (prevProps.otherChatsArr.length !== nextProps.otherChatsArr?.length)
      return false;
    const filteredChats = prevProps.otherChatsArr.filter(
      (chat, i) =>
        nextProps.otherChatsArr &&
        (chat._id !== nextProps.otherChatsArr[i]._id ||
          chat.status !== nextProps.otherChatsArr[i].status)
    );
    if (filteredChats.length !== 0) return false;
  }
  return true;
}

export default memo(Navbar, arePropsEqual);
