import React from 'react';
import { useTranslation } from 'react-i18next';
import { IChatInfo } from 'interfaces';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Icon from 'components/ui/icon/Icon';
import { getMessageTime } from 'utils/utils';
import closeIcon from 'assets/close.svg';
import ImageButton from 'components/ui/imageButton/ImageButton';
import classes from './ChatInfo.module.css';

interface IProps {
  chatInfo?: IChatInfo;
  loading?: boolean;
}

const ChatInfo: React.FC<IProps> = ({ chatInfo, loading }) => {
  const { t } = useTranslation();
  return (
    <>
      {loading && (
        <SkeletonTheme color="#ddd" highlightColor="#e7e7e7">
          <div className={classes.ChatInfoCell}>
            <Skeleton style={{ borderRadius: 10 }} width="60%" height={32} />
            <Skeleton width="80%" height={32} />
          </div>
          <div className={classes.ChatInfoCell}>
            <Skeleton style={{ borderRadius: 10 }} width="70%" height={32} />
            <Skeleton width="100%" height={40} />
          </div>
          <div className={classes.ChatInfoCell}>
            <Skeleton style={{ borderRadius: 10 }} width="50%" height={32} />
            <Skeleton width="70%" height={32} />
          </div>
          <div className={classes.ChatInfoCell}>
            <Skeleton style={{ borderRadius: 10 }} width="60%" height={32} />
            <Skeleton width="100%" height={48} />
          </div>
          <div className={classes.ChatInfoCell}>
            <Skeleton style={{ borderRadius: 10 }} width="90%" height={32} />
            <Skeleton width="50%" height={32} />
          </div>
        </SkeletonTheme>
      )}
      {chatInfo && (
        <>
          <ImageButton
            backgroundColor="#000"
            icon={closeIcon}
            size="32px"
            onClick={() => {}}
          />
          <Icon path={closeIcon} size="32px" minSize="32px" color="red" />
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
            <p className={classes.ChatInfoContent}>
              {chatInfo?.department?.name}
            </p>
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
      )}
    </>
  );
};

export default ChatInfo;
