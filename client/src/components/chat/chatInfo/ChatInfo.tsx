import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IChatInfo } from 'interfaces';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { getMessageTime } from 'utils/utils';
import userIcon from 'assets/user.svg';
import transferIcon from 'assets/transfer.svg';
import emailIcon from 'assets/email.svg';
import printIcon from 'assets/print.svg';
import blockIcon from 'assets/block.svg';
import closeIcon from 'assets/close.svg';
import recycleIcon from 'assets/recycle.svg';
import ImageButton from 'components/ui/imageButton/ImageButton';
import InformationButton from 'components/ui/informationButton/InformationButton';
import socket from 'services/socket';
import Modal from 'components/ui/modal/Modal';
import { Container, Cell, Content, Text, Title, Grid } from './styles';

interface IProps {
  chatInfo?: IChatInfo;
  loading?: boolean;
  token: string;
}

const ChatInfo: React.FC<IProps> = ({ chatInfo, loading, token }) => {
  const [showTransferModal, setShowTransferModal] = useState(true);
  const { t } = useTranslation();

  const closeChat = () => {
    socket.emit('close_chat', {
      chatId: chatInfo?._id,
      token,
    });
  };

  const showTransferOptions = () => {
    setShowTransferModal(!showTransferModal);
  };

  return (
    <>
      <Modal show={showTransferModal} closeModal={showTransferOptions}>
        <h1>TESTE</h1>
        <Grid columns={4}>
          <InformationButton
            information={[
              { icon: transferIcon, content: 'eae' },
              { icon: closeIcon, content: '3' },
              { icon: emailIcon, content: 'fala_ae_galera kk' },
            ]}
            icon={userIcon}
            name="fala"
            backgroundColor="#178CFF"
          />
          <InformationButton
            information={[
              { icon: transferIcon, content: 'eae' },
              { icon: closeIcon, content: '3' },
              { icon: emailIcon, content: 'fala_ae_galera kk' },
            ]}
            icon={userIcon}
            name="mano"
            backgroundColor="#178CFF"
          />
          <InformationButton
            information={[
              { icon: transferIcon, content: 'eae' },
              { icon: closeIcon, content: '3' },
              { icon: emailIcon, content: 'fala_ae_galera kk' },
            ]}
            icon={userIcon}
            name="blz"
            backgroundColor="#178CFF"
          />
          <InformationButton
            information={[
              { icon: transferIcon, content: 'eae' },
              { icon: closeIcon, content: '3' },
              { icon: emailIcon, content: 'fala_ae_galera kk' },
              { icon: transferIcon, content: 'eae' },
            ]}
            icon={userIcon}
            name="eae"
            backgroundColor="#178CFF"
          />
        </Grid>
      </Modal>
      <Container>
        {loading && (
          <SkeletonTheme color="#ddd" highlightColor="#e7e7e7">
            <Grid>
              <Skeleton style={{ borderRadius: 30 }} width="100%" height={90} />
              <Skeleton style={{ borderRadius: 30 }} width="100%" height={90} />
              <Skeleton style={{ borderRadius: 30 }} width="100%" height={90} />
              <Skeleton style={{ borderRadius: 30 }} width="100%" height={90} />
              <Skeleton style={{ borderRadius: 30 }} width="100%" height={90} />
              <Skeleton style={{ borderRadius: 30 }} width="100%" height={90} />
            </Grid>
            <Cell>
              <Skeleton style={{ borderRadius: 10 }} width="100%" height={32} />
              <Skeleton width="80%" height={32} />
            </Cell>
            <Cell>
              <Skeleton style={{ borderRadius: 10 }} width="75%" height={32} />
              <Skeleton width="100%" height={40} />
            </Cell>
            <Cell>
              <Skeleton style={{ borderRadius: 10 }} width="80%" height={32} />
              <Skeleton width="70%" height={32} />
            </Cell>
            <Cell>
              <Skeleton style={{ borderRadius: 10 }} width="60%" height={32} />
              <Skeleton width="100%" height={48} />
            </Cell>
            <Cell>
              <Skeleton style={{ borderRadius: 10 }} width="85%" height={32} />
              <Skeleton width="50%" height={32} />
            </Cell>
            <Cell>
              <Skeleton style={{ borderRadius: 10 }} width="95%" height={32} />
              <Skeleton width="50%" height={32} />
            </Cell>
          </SkeletonTheme>
        )}
        {chatInfo && (
          <>
            <Grid>
              <ImageButton
                backgroundColor="#178CFF"
                icon={transferIcon}
                size="50px"
                padding="20px"
                width="100%"
                borderRadius="15px"
                onClick={showTransferOptions}
              />
              <ImageButton
                backgroundColor="#178CFF"
                icon={emailIcon}
                size="50px"
                padding="20px"
                width="100%"
                borderRadius="15px"
              />
              <ImageButton
                backgroundColor="#178CFF"
                icon={printIcon}
                size="50px"
                padding="20px"
                width="100%"
                borderRadius="15px"
              />
              <ImageButton
                backgroundColor="#178CFF"
                icon={blockIcon}
                size="50px"
                padding="20px"
                width="100%"
                borderRadius="15px"
              />
              <ImageButton
                backgroundColor="#178CFF"
                icon={closeIcon}
                size="50px"
                padding="20px"
                width="100%"
                borderRadius="15px"
                onClick={closeChat}
              />
              <ImageButton
                backgroundColor="#ff1717"
                icon={recycleIcon}
                size="50px"
                padding="20px"
                width="100%"
                borderRadius="15px"
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
      </Container>
    </>
  );
};

export default ChatInfo;
