import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { I18nextProvider } from 'react-i18next';

import Routes from 'routes';
import AuthContextProvider from 'context/AuthContext';
import Loading from 'components/ui/loading/Loading';
import { baseURL } from 'services/api';

import 'index.css';

const lang = localStorage.getItem('lang') || 'en-US';
i18next.use(Backend).init({
  interpolation: { escapeValue: false },
  fallbackLng: 'en-US',
  lng: lang,
  backend: {
    loadPath: `${baseURL}translations/{{lng}}/{{ns}}.json`,
  },
});

const app = (
  <Suspense fallback={Loading}>
    <I18nextProvider i18n={i18next}>
      <Helmet>
        <title>Free Helper Chat</title>
        <link rel="icon" href={`${baseURL}images/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${baseURL}images/logo192.png`} />
        <meta name="description" content="Free Helper Chat" />
        <meta httpEquiv="content-language" content={lang.toLowerCase()} />
      </Helmet>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </I18nextProvider>
  </Suspense>
);

ReactDOM.render(app, document.getElementById('root'));
