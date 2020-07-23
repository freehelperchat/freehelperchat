import React from 'react';

import classes from './Icon.module.css';

interface IProps {
  path: string;
  color?: string;
  size?: number | string;
  minSize?: number | string;
  maxSize?: number | string;
  margin?: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Icon: React.FC<IProps> = ({
  path,
  color = 'white',
  size = 32,
  minSize = size,
  maxSize,
  margin,
  onClick,
}) => {
  return (
    <div
      className={classes.Image}
      style={{
        WebkitMaskImage: `url(${path})`,
        backgroundColor: color,
        minWidth: minSize,
        minHeight: minSize,
        width: size,
        height: size,
        margin,
        maxHeight: maxSize,
        maxWidth: maxSize,
      }}
      onClick={onClick}
    />
  );
};

export default Icon;
