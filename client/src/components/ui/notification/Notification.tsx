import React from 'react';

import { baseURL } from 'services/api';
import Icon from 'components/ui/icon/Icon';
import { Container, Message, Timestamp } from './styles';

interface IProps {
  text: string;
  color: string;
  vector: string;
  timestamp: string;
}

const Notification: React.FC<IProps> = ({ text, color, vector, timestamp }) => {
  return (
    <Container>
      <Icon
        path={`${baseURL}images/notifications/${vector}`}
        color={color}
        size="32px"
      />
      <Message backgroundColor={color}>
        <p>{text}</p>
      </Message>
      <Timestamp color={color}>{timestamp}</Timestamp>
    </Container>
  );
};

export default Notification;
