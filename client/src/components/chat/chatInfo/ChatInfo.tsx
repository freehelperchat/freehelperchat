import React from 'react';
import { useTranslation } from 'react-i18next';
import { IChatInfo } from 'interfaces';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Icon from 'components/ui/icon/Icon';
import { getMessageTime } from 'utils/utils';
import closeIcon from 'assets/close.svg';
import classes from './ChatInfo.module.css';

interface IProps {
  chatInfo: IChatInfo;
  loading?: boolean;
}

const ChatInfo: React.FC<IProps> = ({ chatInfo, loading }) => {
  const { t } = useTranslation();
  return (
    <>
      {!loading && (
        <SkeletonTheme color="#ddd" highlightColor="#e7e7e7">
          <div className={classes.Loading}>
            <div style={{ width: '50%' }}>
              <Skeleton style={{ borderRadius: 10 }} width="50%" height={32} />
              <Skeleton style={{ borderRadius: 10 }} width="70%" height={32} />
            </div>
            <div style={{ width: '50%' }}>
              <Skeleton width="60%" height={32} />
              <Skeleton width="30%" height={32} />
            </div>
          </div>
        </SkeletonTheme>
      )}
      <Icon path={closeIcon} size={32} minSize={32} color="red" />
      <div className={classes.ChatInfoCell}>
        <div className={classes.ChatInfoTitle}>
          <p className={classes.ChatInfoText}>{t('info.name')}</p>
        </div>
        <p className={classes.ChatInfoContent}>{chatInfo?.name}</p>
      </div>
      <div className={classes.ChatInfoCell}>
        <div className={classes.ChatInfoTitle}>
          <p className={classes.ChatInfoText}>{t('info.email')}</p>
        </div>
        <p className={classes.ChatInfoContent}>{chatInfo?.email}</p>
      </div>
      <div className={classes.ChatInfoCell}>
        <div className={classes.ChatInfoTitle}>
          <p className={classes.ChatInfoText}>{t('info.chatId')}</p>
        </div>
        <p className={classes.ChatInfoContent}>{chatInfo?._id}</p>
      </div>
      <div className={classes.ChatInfoCell}>
        <div className={classes.ChatInfoTitle}>
          <p className={classes.ChatInfoText}>{t('info.createdAt')}</p>
        </div>
        <p className={classes.ChatInfoContent}>
          {getMessageTime(chatInfo?.time?.started)}
        </p>
      </div>
      <div className={classes.ChatInfoCell}>
        <div className={classes.ChatInfoTitle}>
          <p className={classes.ChatInfoText}>{t('info.department')}</p>
        </div>
        <p className={classes.ChatInfoContent}>{chatInfo?.department?.name}</p>
      </div>
      {chatInfo?.userData?.map(data => (
        <div className={classes.ChatInfoCell} key={data._id}>
          <div className={classes.ChatInfoTitle}>
            <p className={classes.ChatInfoText}>{data.fieldId}</p>
          </div>
          <p className={classes.ChatInfoContent}>{data.value}</p>
        </div>
      ))}
    </>
  );
};

export default ChatInfo;
