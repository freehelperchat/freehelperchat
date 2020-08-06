import React from 'react';

// import Icon from 'components/ui/icon/Icon';
import { getMessageTime, getColorByText } from 'utils/utils';
// import fileIcon from 'assets/text.svg';
import { MsgContainer, MessageDiv, Name } from './styles';

interface IProps {
  type: string;
  time: number;
  name: string;
  message: string;
  file?: string;
}

const Message: React.FC<IProps> = ({ type, time, name, message, file }) => {
  return (
    <MsgContainer
      backgroundColor={getColorByText(name)}
      messageType={type}
      title={getMessageTime(time)}
    >
      <Name>{name}</Name>
      <MessageDiv>{message}</MessageDiv>
      {!file && (
        <>
          <div
            style={{
              marginTop: '10px',
              backgroundColor: '#FFFFFF30',
              borderRadius: '10px',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            <img
              src="https://i.redd.it/mu0jnsj5i2h31.jpg"
              alt="File"
              style={{ width: '100%' }}
            />
            {/* <div
              style={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Icon size="32px" path={fileIcon} color="white" />
              <p
                style={{
                  width: '100%',
                  marginTop: '10px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                bom_dia_bbasifduhhjsdfhlsdfsdfsdfjsdfsdflsjdlfsdjlfsjdlfjsdlfjsldjfsldfsdfkjsdhfksdfsjdf.png
              </p>
            </div> */}
          </div>
        </>
      )}
    </MsgContainer>
  );
};

export default Message;
