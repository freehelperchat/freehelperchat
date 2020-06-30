import React from 'react';

import { baseURL } from 'services/api';
import classes from './Notification.module.css';

interface IProps {
  type: string;
  text: string;
  timestamp: string;
}

const Notification: React.FC<IProps> = ({ type, text, timestamp }) => {
  return (
    <div className={classes.Container}>
      {/* <object
        className={classes.Image}
        type="image/svg+xml"
        data={`${baseURL}images/notifications/${type.toLowerCase()}.svg`}
      >
        Image
      </object> */}
      <div
        className={classes.Image}
        style={{
          maskSize: 'contain',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: `url(${baseURL}images/notifications/${type.toLowerCase()}.svg)`,
          backgroundColor: '#2980B9',
        }}
      />
      {/* <img
        className={classes.Image}
        src={`${baseURL}images/notifications/${type.toLowerCase()}.svg`}
        alt={type}
      /> */}
      <div className={classes.Message}>
        <p>{text}</p>
      </div>
      <p className={classes.Timestamp}>{timestamp}</p>
    </div>
  );
};

export default Notification;
