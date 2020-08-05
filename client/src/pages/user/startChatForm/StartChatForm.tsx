import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Api from 'services/api';
import Input from 'components/ui/input/Input';
import Button from 'components/ui/button/Button';
import Notification from 'components/ui/notification/Notification';
import {
  IChatInfo,
  IFormField,
  INotificationType,
  INotification,
  IFormValue,
} from 'interfaces';
import { getMessageTime } from 'utils/utils';
import { Container, Form, NotificationContainer } from './styles';

const StartChatForm: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [chatForm, setChatForm] = useState<IFormField[]>();
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formValues, setFormValues] = useState<IFormValue>({});
  const [notificationTypes, setNotificationTypes] = useState<INotificationType>(
    {}
  );
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
      value: formValues[fv as keyof IFormValue],
    }));

    Api.post<IChatInfo>('/chat', {
      userData,
      department,
      name,
      email,
    })
      .then(res => history.push(`/id/${res.data._id}`))
      .catch(err => console.log(err));
  };

  return (
    <Container>
      <Form>
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
      </Form>
      <NotificationContainer>
        {notifications.map(n => (
          <Notification
            key={n.time}
            timestamp={getMessageTime(n.time)}
            text={n.text}
            color={notificationTypes[n.type].color}
            vector={notificationTypes[n.type].vector}
          />
        ))}
      </NotificationContainer>
    </Container>
  );
};

export default StartChatForm;
