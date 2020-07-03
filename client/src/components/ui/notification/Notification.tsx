import React from 'react';

import { baseURL } from 'services/api';
import Icon from 'components/ui/icon/Icon';
import classes from './Notification.module.css';

interface IProps {
  text: string;
  color: string;
  vector: string;
  timestamp: string;
}

const Notification: React.FC<IProps> = ({ text, color, vector, timestamp }) => {
  return (
    <div className={classes.Container}>
      <Icon
        path={`${baseURL}images/notifications/${vector}`}
        color={color}
        size={32}
      />
      <div className={classes.Message} style={{ backgroundColor: color }}>
        <p>{text}</p>
      </div>
      <p className={classes.Timestamp} style={{ color }}>
        {timestamp}
      </p>
    </div>
  );
};

export default Notification;
