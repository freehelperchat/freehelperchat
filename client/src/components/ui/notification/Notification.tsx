import React from 'react';

import { baseURL } from 'services/api';
import classes from './Notification.module.css';

interface IProps {
  type: string;
  text: string;
}

const Notification: React.FC<IProps> = ({ type, text }) => {
  return (
    <div className={classes.Container}>
      <img
        className={classes.Image}
        src={`${baseURL}/images/notifications/${type.toLowerCase()}.svg`}
        alt={type}
      />
      <div className={classes.Message}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Notification;
