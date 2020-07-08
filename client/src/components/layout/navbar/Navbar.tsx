import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { getColorByText } from 'utils/utils';
import NavbarItem from 'components/layout/navbar/navbarItem/NavbarItem';
import Icon from 'components/ui/icon/Icon';
import messageIcon from 'assets/message.svg';
import userIcon from 'assets/user.svg';
import settingsIcon from 'assets/settings.svg';
import stonksIcon from 'assets/stonks.svg';
import backIcon from 'assets/back.svg';

import classes from './Navbar.module.css';

interface IProps {
  yourChatsArr?: {
    chatId: number;
    name: string;
    status: number;
  }[];
  otherChatsArr?: {
    chatId: number;
    name: string;
    status: number;
  }[];
  operatorsArr?: {
    _id: string;
    name: string;
    activeChats: number;
    status: boolean;
  }[];
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
    <div className={classes.Navbar}>
      {yourChats && (
        <div className={classes.TopBar}>
          <p className={classes.Title}>Seus chats</p>
          {yourChatsArr.map(chat => (
            <NavbarItem
              bgColor={getColorByText(chat.name)}
              path={`/admin/chat/${chat.chatId}`}
              exact
              key={chat.chatId}
            >
              <Icon path={messageIcon} color="white" size={32} />
              {chat.name}
            </NavbarItem>
          ))}
        </div>
      )}
      {operators && (
        <div className={classes.TopBar}>
          <p className={classes.Title}>Operadores Online</p>
          {operatorsArr.map(operator => (
            <NavbarItem
              bgColor="#178CFF"
              path="/admin"
              exact
              bottomBar
              key={operator._id}
            >
              <Icon path={userIcon} color="white" size={32} />
              {operator.name}
            </NavbarItem>
          ))}
        </div>
      )}
      {options && (
        <>
          <div className={classes.Separator} />
          <div className={classes.BottomBar}>
            <NavbarItem bgColor="#A5A5A5" path="/admin" exact>
              <Icon path={stonksIcon} color="white" size={32} />
              {t('navbar.dashboard')}
            </NavbarItem>
            <NavbarItem bgColor="#A5A5A5" path="/admin/profile" exact>
              <Icon path={userIcon} color="white" size={32} />
              {t('navbar.profile')}
            </NavbarItem>
            <NavbarItem bgColor="#A5A5A5" path="/admin/settings">
              <Icon path={settingsIcon} color="white" size={32} />
              {t('navbar.settings')}
            </NavbarItem>
            <NavbarItem bgColor="#AA4444" path="/logout" exact>
              <Icon path={backIcon} color="white" size={32} />
              {t('navbar.logout')}
            </NavbarItem>
          </div>
        </>
      )}
      {otherChats && (
        <div className={classes.BottomBar}>
          <p className={classes.Title}>Outros chats</p>
          {otherChatsArr.map(chats => (
            <NavbarItem bgColor="#A5A5A5" path="/admin" exact>
              <Icon path={userIcon} color="white" size={32} />
              {chats.name}
            </NavbarItem>
          ))}
        </div>
      )}
    </div>
  );
};

function areChatsEqual(prevProps: IProps, nextProps: IProps): boolean {
  if (prevProps.yourChatsArr) {
    const filteredChats = prevProps.yourChatsArr.filter(
      (chat, i) =>
        nextProps.yourChatsArr &&
        chat.chatId !== nextProps.yourChatsArr[i].chatId
    );
    return filteredChats.length === 0;
  }
  return false;
}

export default memo(Navbar, areChatsEqual);
