import React from 'react';
import { useTranslation } from 'react-i18next';
import { IChatInfo } from 'interfaces';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { getMessageTime } from 'utils/utils';
import transferIcon from 'assets/transfer.svg';
import emailIcon from 'assets/email.svg';
import printIcon from 'assets/print.svg';
import blockIcon from 'assets/block.svg';
import closeIcon from 'assets/close.svg';
import recycleIcon from 'assets/recycle.svg';
import ImageButton from 'components/ui/imageButton/ImageButton';
import { Cell, Content, Text, Title, Grid } from './styles';

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
          <Cell>
            <Skeleton style={{ borderRadius: 10 }} width="60%" height={32} />
            <Skeleton width="80%" height={32} />
          </Cell>
          <Cell>
            <Skeleton style={{ borderRadius: 10 }} width="70%" height={32} />
            <Skeleton width="100%" height={40} />
          </Cell>
          <Cell>
            <Skeleton style={{ borderRadius: 10 }} width="50%" height={32} />
            <Skeleton width="70%" height={32} />
          </Cell>
          <Cell>
            <Skeleton style={{ borderRadius: 10 }} width="60%" height={32} />
            <Skeleton width="100%" height={48} />
          </Cell>
          <Cell>
            <Skeleton style={{ borderRadius: 10 }} width="90%" height={32} />
            <Skeleton width="50%" height={32} />
          </Cell>
        </SkeletonTheme>
      )}
      {chatInfo && (
        <>
          <Grid>
            <ImageButton
              backgroundColor="#000"
              hoverColor="red"
              icon={transferIcon}
              size="50px"
              padding="20px"
            />
            <ImageButton
              backgroundColor="#000"
              hoverColor="red"
              icon={emailIcon}
              size="50px"
              padding="20px"
            />
            <ImageButton
              backgroundColor="#000"
              hoverColor="red"
              icon={printIcon}
              size="50px"
              padding="20px"
            />
            <ImageButton
              backgroundColor="#000"
              hoverColor="red"
              icon={blockIcon}
              size="50px"
              padding="20px"
            />
            <ImageButton
              backgroundColor="#000"
              hoverColor="red"
              icon={closeIcon}
              size="50px"
              padding="20px"
            />
            <ImageButton
              backgroundColor="#000"
              hoverColor="red"
              icon={recycleIcon}
              size="50px"
              padding="20px"
            />
          </Grid>
          <Cell>
            <Title>
              <Text>{t('info.name')}</Text>
            </Title>
            <Content>{chatInfo?.name}</Content>
          </Cell>
          <Cell>
            <Title>
              <Text>{t('info.email')}</Text>
            </Title>
            <Content>{chatInfo?.email}</Content>
          </Cell>
          <Cell>
            <Title>
              <Text>{t('info.chatId')}</Text>
            </Title>
            <Content>{chatInfo?._id}</Content>
          </Cell>
          <Cell>
            <Title>
              <Text>{t('info.createdAt')}</Text>
            </Title>
            <Content>{getMessageTime(chatInfo?.time?.started)}</Content>
          </Cell>
          <Cell>
            <Title>
              <Text>{t('info.department')}</Text>
            </Title>
            <Content>{chatInfo?.department?.name}</Content>
          </Cell>
          {chatInfo?.userData?.map(data => (
            <Cell key={data._id}>
              <Title>
                <Text>{data.fieldId}</Text>
              </Title>
              <Content>{data.value}</Content>
            </Cell>
          ))}
        </>
      )}
    </>
  );
};

export default ChatInfo;
