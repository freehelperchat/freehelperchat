import React from 'react';
import Icon from '../icon/Icon';

interface IProps {
  size: string;
  icon: string;
  onClick(): void;
  backgroundColor: string;
  hoverColor?: string;
}

const ImageButton: React.FC<IProps> = ({
  backgroundColor,
  icon,
  size,
  onClick,
  hoverColor,
}) => (
  <div style={{ backgroundColor }} className="teste" onClick={onClick}>
    <Icon path={icon} size={size} />
  </div>
);

export default ImageButton;
