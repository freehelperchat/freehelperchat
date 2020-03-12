import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import en_US from './translations/en_US/translation.json';
import pt_BR from './translations/pt_BR/translation.json';

const lang = localStorage.getItem('lang');
i18next.init({
  interpolation: { escapeValue: false },
  fallbackLng: 'en_US',
  lng: lang || 'en_US',
  resources: {
    pt_BR: {
      translation: pt_BR,
    },
    en_US: {
      translation: en_US,
    },
  },
});

const app = (
  <I18nextProvider i18n={i18next}>
    <Routes />
  </I18nextProvider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
