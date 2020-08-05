import React from 'react';
import Icon from '../icon/Icon';

import { ImgButton } from './styles';

interface IProps {
  size: string;
  icon: string;
  iconColor?: string;
  margin?: string;
  onClick?: () => void;
  backgroundColor?: string;
  hoverColor?: string;
  padding?: string;
}

const ImageButton: React.FC<IProps> = ({
  backgroundColor = 'transparent',
  hoverColor,
  icon,
  iconColor,
  size,
  margin,
  onClick,
  padding,
}) => (
  <ImgButton
    backgroundColor={backgroundColor}
    hoverColor={hoverColor}
    onClick={onClick}
    type="button"
    padding={padding}
  >
    <Icon path={icon} size={size} color={iconColor} margin={margin} />
  </ImgButton>
);

export default ImageButton;
