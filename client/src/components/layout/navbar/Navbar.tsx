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
  chats: {
    chatId: number;
    name: string;
    status: number;
  }[];
}

const Navbar: React.FC<IProps> = ({ chats }) => {
  const { t } = useTranslation();
  return (
    <div className={classes.Navbar}>
      <div className={classes.TopBar}>
        <p className={classes.Title}>Seus chats</p>
        {chats.map(chat => (
          <NavbarItem
            bgColor={getColorByText(chat.name)}
            path={`/admin/chat/${chat.chatId}`}
            exact
            key={chat.chatId}
          >
            <Icon path={messageIcon} color="white" size={20} />
            {chat.name}
          </NavbarItem>
        ))}
      </div>
      <div className={classes.Separator} />
      <div className={classes.BottomBar}>
        <NavbarItem bgColor="#A5A5A5" path="/admin" exact>
          <Icon path={stonksIcon} color="white" size={20} />
          {t('navbar.dashboard')}
        </NavbarItem>
        <NavbarItem bgColor="#A5A5A5" path="/admin/profile" exact>
          <Icon path={userIcon} color="white" size={20} />
          {t('navbar.profile')}
        </NavbarItem>
        <NavbarItem bgColor="#A5A5A5" path="/admin/settings">
          <Icon path={settingsIcon} color="white" size={20} />
          {t('navbar.settings')}
        </NavbarItem>
        <NavbarItem bgColor="#AA4444" path="/logout" exact>
          <Icon path={backIcon} color="white" size={20} />
          {t('navbar.logout')}
        </NavbarItem>
      </div>
    </div>
  );
};

function areChatsEqual(prevProps: IProps, nextProps: IProps): boolean {
  const filteredChats = prevProps.chats.filter(
    (chat, i) => chat.chatId !== nextProps.chats[i].chatId
  );
  return filteredChats.length === 0;
}

export default memo(Navbar, areChatsEqual);
