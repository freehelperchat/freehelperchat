import React from 'react';
import { useTranslation } from 'react-i18next';

import { getMessageTime } from 'utils/utils';
import classes from './ChatInfo.module.css';

const ChatInfo = ({ chatInfo }) => {
  const { t } = useTranslation('translation');
  return (
    <>
      <div className={classes.ChatInfoCell}>
        <p className={classes.ChatInfoTitle}>{t('info.name')}</p>
        <p className={classes.ChatInfoContent}>{chatInfo.name}</p>
      </div>
      <div className={classes.ChatInfoCell}>
        <p className={classes.ChatInfoTitle}>{t('info.email')}</p>
        <p className={classes.ChatInfoContent}>{chatInfo.email}</p>
      </div>
      <div className={classes.ChatInfoCell}>
        <p className={classes.ChatInfoTitle}>{t('info.chatId')}</p>
        <p className={classes.ChatInfoContent}>{chatInfo.chatId}</p>
      </div>
      <div className={classes.ChatInfoCell}>
        <p className={classes.ChatInfoTitle}>{t('info.createdAt')}</p>
        <p className={classes.ChatInfoContent}>
          {chatInfo.time && getMessageTime(chatInfo.time.started)}
        </p>
      </div>
      <div className={classes.ChatInfoCell}>
        <p className={classes.ChatInfoTitle}>{t('info.department')}</p>
        <p className={classes.ChatInfoContent}>
          {chatInfo.department && chatInfo.department.name}
        </p>
      </div>
      {chatInfo.userData &&
        chatInfo.userData.map(data => (
          <div className={classes.ChatInfoCell} key={data._id}>
            <p className={classes.ChatInfoTitle}>{data.fieldId}</p>
            <p className={classes.ChatInfoContent}>{data.value}</p>
          </div>
        ))}
    </>
  );
};

export default ChatInfo;
