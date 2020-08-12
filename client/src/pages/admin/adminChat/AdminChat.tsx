import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Api from 'services/api';
import { AuthContext } from 'context/AuthContext';

import Chat from 'components/chat/Chat';
import { IChatInfo, IOperator } from 'interfaces';
import ChatInfo from 'components/chat/chatInfo/ChatInfo';
import { AxiosError } from 'axios';
import { Container, ChatInfoContainer, AdminChatContainer } from './styles';

const AdminChat: React.FC = () => {
  const { chatId } = useParams();
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const history = useHistory();
  const [chatInfo, setChatInfo] = useState<IChatInfo>();
  const [operatorInfo, setOperatorInfo] = useState<IOperator>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let redirected = false;
    setChatInfo(undefined);
    setLoading(true);
    Api.get<IChatInfo>(`/chat/${chatId}`, {
      headers: { Authorization: token },
    })
      .then(res => {
        if (!redirected) {
          setChatInfo(res.data);
          setLoading(false);
        }
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          switch (err.response.status) {
            case 401:
              history.push('/logout');
              break;
            case 404:
              history.push('/admin');
              break;
            default:
              break;
          }
        }
      });

    Api.get('/operator', { headers: { Authorization: token } })
      .then(res => {
        if (!redirected) setOperatorInfo(res.data);
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          history.push('/logout');
        }
      });
    return () => {
      redirected = true;
    };
  }, [chatId, history, token]);

  return (
    <Container>
      <AdminChatContainer>
        <Chat chatId={chatId} token={token} name={operatorInfo?.fullName} />
      </AdminChatContainer>
      <ChatInfoContainer>
        <ChatInfo token={token} chatInfo={chatInfo} loading={loading} />
      </ChatInfoContainer>
    </Container>
  );
};

export default AdminChat;
