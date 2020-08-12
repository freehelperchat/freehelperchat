import React, { useRef, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import Icon from 'components/ui/icon/Icon';
import { getMessageTime, getColorByText } from 'utils/utils';
import fileIcon from 'assets/text.svg';
import { MsgContainer, MessageDiv, Name, ImgContainer, Img } from './styles';

interface IProps {
  type: string;
  time: number;
  name: string;
  message: string;
  file?: string;
}

const Message: React.FC<IProps> = ({ type, time, name, message, file }) => {
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [filePreview, setFilePreview] = useState<JSX.Element>();

  const downloadFile = useCallback(() => {
    const filename = file?.split('/').pop();
    axios
      .get(file || '', {
        responseType: 'blob',
      })
      .then(res => {
        if (downloadRef.current) {
          downloadRef.current.href = URL.createObjectURL(res.data);
          downloadRef.current.download = filename || '';
          downloadRef.current.click();
        }
      })
      .catch(err => console.log(err));
  }, [file]);

  useEffect(() => {
    if (file) {
      const filename = file?.split('/').pop();
      const ext = filename?.split('.').pop();
      const imageTypes = ['jpeg', 'jpg', 'png', 'svg', 'gif', 'ico'];
      if (ext && imageTypes.includes(ext)) {
        setFilePreview(<Img src={file} alt="File" />);
      } else {
        setFilePreview(
          <div
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
              {filename}
            </p>
          </div>
        );
      }
    }
  }, [file, downloadFile]);

  return (
    <MsgContainer
      backgroundColor={getColorByText(name)}
      messageType={type}
      title={getMessageTime(time)}
    >
      <Name>{name}</Name>
      <MessageDiv>{message}</MessageDiv>
      {file && (
        <ImgContainer onClick={downloadFile}>{filePreview}</ImgContainer>
      )}
      <a href="/" ref={downloadRef} style={{ display: 'none' }}>
        Download
      </a>
    </MsgContainer>
  );
};

export default Message;
