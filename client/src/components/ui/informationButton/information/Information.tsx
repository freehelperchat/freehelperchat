import React from 'react';

import Icon from 'components/ui/icon/Icon';
import { Bar, Name } from './styles';

interface IProps {
  icon?: string;
  content: string;
  color: string;
  big?: boolean;
}

const Information: React.FC<IProps> = ({ icon, content, color, big }) => {
  return (
    <Bar>
      {icon && (
        <Icon
          path={icon}
          size={big ? '32px' : '16px'}
          color={color}
          margin="8px"
        />
      )}
      <Name color={color}>{content}</Name>
    </Bar>
  );
};

export default Information;
