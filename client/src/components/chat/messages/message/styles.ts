import styled from 'styled-components';
import { messageTypes } from 'constants/messageTypes';

interface IProps {
  messageType: string;
  backgroundColor: string;
}

const message = {
  [messageTypes.INCOMING_MESSAGE]: {
    alignSelf: 'flex-start',
    color: 'white',
    borderRadius: '3px 12px 12px 12px',
  },
  [messageTypes.OUTGOING_MESSAGE]: {
    alignSelf: 'flex-end',
    color: 'white',
    borderRadius: '12px 3px 12px 12px',
  },
};

export const MsgContainer = styled.div`
  margin: 4px;
  min-width: 30%;
  max-width: 60%;
  padding: 10px;
  background-color: ${(props: IProps) => props.backgroundColor};
  align-self: ${(props: IProps) => message[props.messageType].alignSelf};
  color: ${(props: IProps) => message[props.messageType].color};
  border-radius: ${(props: IProps) => message[props.messageType].borderRadius};
`;

export const Name = styled.p`
  font-weight: 800;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const MessageDiv = styled.div`
  white-space: pre-wrap;
  text-align: left;
  width: 100%;
  font-size: 18px;
  word-wrap: break-word;
`;
