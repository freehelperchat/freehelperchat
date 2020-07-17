import React from 'react';

import classes from './StatusCircle.module.css';

interface IProps {
  stroke?: string;
  color: string;
}

const StatusCircle: React.FC<IProps> = ({
  stroke = '#ccc',
  color = 'white',
}) => {
  return (
    <svg height="45" width="32" className={classes.svg}>
      <circle
        cx="16"
        cy="16"
        r="11"
        stroke={stroke}
        strokeWidth="4"
        fill={color}
      />
    </svg>
  );
};

export default StatusCircle;
