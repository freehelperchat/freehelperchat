import React from 'react';

import { Svg } from './styles';

interface IProps {
  stroke?: string;
  color: string;
}

const StatusCircle: React.FC<IProps> = ({
  stroke = '#202020',
  color = '#aaa',
}) => {
  return (
    <Svg height="45" width="32">
      <circle
        cx="16"
        cy="16"
        r="11"
        stroke={stroke}
        strokeWidth="4"
        fill={color}
      />
    </Svg>
  );
};

export default StatusCircle;
