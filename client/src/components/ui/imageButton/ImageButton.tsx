import React from 'react';
import Icon from '../icon/Icon';

import { ImgButton } from './styles';

interface IProps {
  size: string;
  width?: string;
  height?: string;
  icon: string;
  iconColor?: string;
  margin?: string;
  onClick?: () => void;
  backgroundColor?: string;
  borderRadius?: string;
  padding?: string;
}

const ImageButton: React.FC<IProps> = ({
  backgroundColor,
  borderRadius,
  icon,
  iconColor,
  width,
  height,
  size,
  margin,
  onClick,
  padding,
}) => (
  <ImgButton
    backgroundColor={backgroundColor}
    borderRadius={borderRadius}
    onClick={onClick}
    type="button"
    padding={padding}
    width={width}
    height={height}
  >
    <Icon path={icon} size={size} color={iconColor} margin={margin} />
  </ImgButton>
);

export default ImageButton;
