import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Api from 'services/api';
import Input from 'components/ui/input/Input';
import Button from 'components/ui/button/Button';
import Notification from 'components/ui/notification/Notification';
import chatStatus from 'constants/chatStatus';
import { IChatInfo } from 'components/chat/chatInfo/ChatInfo';
import { getMessageTime } from 'utils/utils';
import classes from './StartChatForm.module.css';

interface INotificationTypes {
  [key: string]: {
    color: string;
    vector: string;
  };
}

interface INotification {
  text: string;
  type: string;
  index: number;
  time: number;
}

interface IFormValues {
  [key: string]: string | number;
}

interface IFormField {
  _id: string;
  name: string;
  label: string;
  inputType: string;
  required: boolean;
  options: string[];
}

const StartChatForm: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [chatForm, setChatForm] = useState<IFormField[]>();
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formValues, setFormValues] = useState<IFormValues>({});
  const [notificationTypes, setNotificationTypes] = useState<
    INotificationTypes
  >({});
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    Api.get('/startchat')
      .then(res => setChatForm(res.data))
      .catch(err => console.log(err));
    Api.get('/department/names')
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    Api.get('/notification/types')
      .then(res => {
        setNotificationTypes(res.data);
        Api.get('/notification')
          .then(resp => {
            setNotifications(resp.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = (value: string | number, id: string) => {
    setFormValues(fv => ({ ...fv, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = Object.keys(formValues).map(fv => ({
      fieldId: fv,
      value: formValues[fv as keyof IFormValues],
    }));

    Api.post<IChatInfo>('/chat', {
      userData,
      department,
      name,
      email,
      status: chatStatus.PENDING,
    })
      .then(res => history.push(`/id/${res.data.chatId}/${res.data._id}`))
      .catch(err => console.log(err));
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Form}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label={t('info.name')}
            name={t('info.name').toLowerCase().replace(/ /gi, '-')}
            required
            value={name}
            change={e => setName(e.target.value)}
          />
          <Input
            type="email"
            label={t('info.email')}
            name={t('info.email').toLowerCase().replace(/ /gi, '-')}
            required
            value={email}
            change={e => setEmail(e.target.value)}
          />
          {chatForm?.map(c => (
            <Input
              key={c._id}
              type={c.inputType}
              label={c.label}
              name={c.name}
              required={c.required}
              options={c.options}
              value={formValues[c.name]}
              change={e => handleChange(e.target.value, c.name)}
            />
          ))}
          <Input
            type="select"
            label={t('info.department')}
            name={t('info.department').toLowerCase()}
            required
            options={departments}
            value={department}
            change={e => setDepartment(e.target.value)}
          />
          <Button type="submit" label={t('button.startchat')} />
        </form>
      </div>
      <div className={classes.NotificationContainer}>
        {notifications.map(n => (
          <Notification
            timestamp={getMessageTime(n.time)}
            text={n.text}
            color={notificationTypes[n.type].color}
            vector={notificationTypes[n.type].vector}
          />
        ))}
      </div>
    </div>
  );
};

export default StartChatForm;
