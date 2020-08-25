import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IChatInfo, IOnlineOperator } from 'interfaces';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';

import { getMessageTime } from 'utils/utils';
import transferIcon from 'assets/transfer.svg';
import emailIcon from 'assets/email.svg';
import printIcon from 'assets/print.svg';
import blockIcon from 'assets/block.svg';
import closeIcon from 'assets/close.svg';
import recycleIcon from 'assets/recycle.svg';
import ImageButton from 'components/ui/imageButton/ImageButton';
import socket from 'services/socket';
import Modal from 'components/ui/modal/Modal';
import NavbarItem from 'components/layout/navbar/navbarItem/NavbarItem';
import api from 'services/api';
import { Container, Cell, Content, Text, Title, Grid } from './styles';

interface IProps {
  chatInfo?: IChatInfo;
  loading?: boolean;
  token: string;
}

const ChatInfo: React.FC<IProps> = ({ chatInfo, loading, token }) => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [operators, setOperators] = useState<IOnlineOperator[]>([]);
  const history = useHistory();
  const { t } = useTranslation();

  const closeChat = () => {
    socket.emit('close_chat', {
      chatId: chatInfo?._id,
      token,
    });
    history.push('/admin');
  };

  const showTransferOptions = () => {
    if (!showTransferModal) {
      api
        .get<IOnlineOperator[]>('/online', {
          params: {
            excludeSelf: true,
          },
          headers: {
            authorization: token,
          },
        })
        .then(res => setOperators(res.data))
        .catch(err => console.log(err));
    }
    setShowTransferModal(!showTransferModal);
  };

  const transferChat = (id: string) => {
    console.log(id);
    setShowTransferModal(false);
    history.push('/admin');
  };

  return (
    <>
      <Modal show={showTransferModal} closeModal={showTransferOptions}>
        <h1>TESTE</h1>
        <Grid columns={4}>
          {operators.map(operator => (
            <NavbarItem
              key={operator._id}
              bgColor="#002A54"
              activeChats={operator.operator.activeChats}
              bottomBar
              onClick={() => transferChat(operator.operator._id)}
            >
              {operator.operator.fullName}
            </NavbarItem>
          ))}
        </Grid>
      </Modal>
      <Container>
        {loading && (
          <SkeletonTheme color="#ddd" highlightColor="#e7e7e7">
            <Grid columns={3}>
              <Skeleton style={{ borderRadius: 15 }} width="100%" height={90} />
              <Skeleton style={{ borderRadius: 15 }} width="100%" height={90} />
              <Skeleton style={{ borderRadius: 15 }} width="100%" height={90} />
              <Skeleton style={{ borderRadius: 15 }} width="100%" height={90} />
              <Skeleton style={{ borderRadius: 15 }} width="100%" height={90} />
              <Skeleton style={{ borderRadius: 15 }} width="100%" height={90} />
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
            <Grid columns={3}>
              <ImageButton
                backgroundColor="#002A54"
                icon={transferIcon}
                size="50px"
                padding="20px"
                width="100%"
                borderRadius="15px"
                onClick={showTransferOptions}
              />
              <ImageButton
                backgroundColor="#002A54"
                icon={emailIcon}
                size="50px"
                padding="20px"
                width="100%"
                borderRadius="15px"
              />
              <ImageButton
                backgroundColor="#002A54"
                icon={printIcon}
                size="50px"
                padding="20px"
                width="100%"
                borderRadius="15px"
              />
              <ImageButton
                backgroundColor="#002A54"
                icon={blockIcon}
                size="50px"
                padding="20px"
                width="100%"
                borderRadius="15px"
              />
              <ImageButton
                backgroundColor="#002A54"
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
