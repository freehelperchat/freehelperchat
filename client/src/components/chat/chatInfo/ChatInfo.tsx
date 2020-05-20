import React from 'react';
import { useTranslation } from 'react-i18next';

import { getMessageTime } from 'utils/utils';
import classes from './ChatInfo.module.css';

interface IUserData {
  _id: string;
  fieldId: string;
  value: string | number;
}

export interface IChatInfo {
  _id?: string;
  name: string;
  email: string;
  chatId: number;
  time: {
    started: number;
    closed?: number;
    pending?: number;
  };
  department: {
    _id: string;
    name: string;
  };
  userData: IUserData[];
}

interface IProps {
  chatInfo: IChatInfo;
}

const ChatInfo: React.FC<IProps> = ({ chatInfo }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={classes.ChatInfoCell}>
        <p className={classes.ChatInfoTitle}>{t('info.name')}</p>
        <p className={classes.ChatInfoContent}>{chatInfo?.name}</p>
      </div>
      <div className={classes.ChatInfoCell}>
        <p className={classes.ChatInfoTitle}>{t('info.email')}</p>
        <p className={classes.ChatInfoContent}>{chatInfo?.email}</p>
      </div>
      <div className={classes.ChatInfoCell}>
        <p className={classes.ChatInfoTitle}>{t('info.chatId')}</p>
        <p className={classes.ChatInfoContent}>{chatInfo?.chatId}</p>
      </div>
      <div className={classes.ChatInfoCell}>
        <p className={classes.ChatInfoTitle}>{t('info.createdAt')}</p>
        <p className={classes.ChatInfoContent}>
          {getMessageTime(chatInfo?.time?.started)}
        </p>
      </div>
      <div className={classes.ChatInfoCell}>
        <p className={classes.ChatInfoTitle}>{t('info.department')}</p>
        <p className={classes.ChatInfoContent}>{chatInfo?.department?.name}</p>
      </div>
      {chatInfo?.userData?.map(data => (
        <div className={classes.ChatInfoCell} key={data._id}>
          <p className={classes.ChatInfoTitle}>{data.fieldId}</p>
          <p className={classes.ChatInfoContent}>{data.value}</p>
        </div>
      ))}
    </>
  );
};

export default ChatInfo;