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

import classes from './Navbar.module.css';

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
    <div className={classes.Navbar}>
      {yourChats && (
        <>
          <p className={classes.Title}>{t('dashboard.your_chats')}</p>
          <div className={classes.TopBar}>
            {yourChatsArr.map(chat => (
              <NavbarItem
                bgColor={getColorByText(chat.name)}
                path={`/admin/chat/${chat._id}`}
                exact
                key={chat.clientToken}
              >
                <Icon path={messageIcon} color="white" size={32} />
                {chat.name}
              </NavbarItem>
            ))}
          </div>
        </>
      )}
      {operators && (
        <>
          <p className={classes.Title}>{t('dashboard.online_operators')}</p>
          <div className={classes.TopBar}>
            {operatorsArr.map(operator => (
              <NavbarItem
                bgColor="#178CFF"
                path="/admin"
                exact
                bottomBar
                activeChats={operator.operator.activeChats}
                key={operator._id}
              >
                <Icon path={userIcon} color="white" size={32} />
                {operator.operator.fullName}
              </NavbarItem>
            ))}
          </div>
        </>
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
        <>
          <p className={classes.Title}>{t('dashboard.other_chats')}</p>
          <div className={classes.TopBar}>
            {otherChatsArr.map(chats => (
              <NavbarItem
                key={chats.clientToken}
                bgColor="#A5A5A5"
                path={`/admin/chat/${chats._id}`}
                exact
              >
                <Icon path={messageIcon} color="white" size={32} />
                {chats.name}
              </NavbarItem>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

function areChatsEqual(prevProps: IProps, nextProps: IProps): boolean {
  if (prevProps.yourChatsArr) {
    if (prevProps.yourChatsArr.length !== nextProps.yourChatsArr?.length)
      return false;
    const filteredChats = prevProps.yourChatsArr.filter(
      (chat, i) =>
        nextProps.yourChatsArr && chat._id !== nextProps.yourChatsArr[i]._id
    );
    return filteredChats.length === 0;
  }
  return false;
}

export default memo(Navbar, areChatsEqual);
