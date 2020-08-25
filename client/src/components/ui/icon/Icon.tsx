import React from 'react';

import { Container } from './styles';

interface IProps {
  path: string;
  color?: string;
  size?: string;
  minSize?: string;
  maxSize?: string;
  margin?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Icon: React.FC<IProps> = ({
  path,
  color = '#aaa',
  size = '32px',
  minSize = size,
  maxSize,
  margin,
  onClick,
}) => {
  return (
    <Container
      path={path}
      color={color}
      minSize={minSize}
      size={size}
      margin={margin}
      maxSize={maxSize}
      onClick={onClick}
    />
  );
};

export default Icon;
