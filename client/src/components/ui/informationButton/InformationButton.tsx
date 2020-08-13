import React from 'react';

import Icon from 'components/ui/icon/Icon';
import { Grid } from 'components/chat/chatInfo/styles';
import { InfoButton, BottomBar, Name } from './styles';
import Information from './information/Information';

interface IProps {
  icon: string;
  name: string;
  onClick?: () => void;
  backgroundColor: string;
  information: {
    icon?: string;
    content: string;
  }[];
}

const ImageButton: React.FC<IProps> = ({
  backgroundColor,
  icon,
  name,
  onClick,
  information,
}) => (
  <InfoButton backgroundColor={backgroundColor} onClick={onClick} type="button">
    <Grid>
      {information.map((info, index) => (
        <Information
          key={index}
          color="white"
          content={info.content}
          icon={info.icon}
        />
      ))}
    </Grid>
    <Information content={name} icon={icon} color="white" big />
  </InfoButton>
);

export default ImageButton;
