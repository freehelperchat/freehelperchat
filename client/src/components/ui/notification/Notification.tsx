import React from 'react';

import { baseURL } from 'services/api';
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
      <div
        className={classes.Image}
        style={{
          WebkitMaskImage: `url(${baseURL}images/notifications/${vector})`,
          backgroundColor: color,
        }}
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
