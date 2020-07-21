import React from 'react';

import classes from './Icon.module.css';

interface IProps {
  path: string;
  color?: string;
  size?: number;
  margin?: number;
}

const Icon: React.FC<IProps> = ({
  path,
  color = 'white',
  size = 32,
  margin = 0,
}) => {
  return (
    <div
      className={classes.Image}
      style={{
        WebkitMaskImage: `url(${path})`,
        backgroundColor: color,
        minWidth: size,
        minHeight: size,
        width: size,
        height: size,
        margin,
      }}
    />
  );
};

export default Icon;
