import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import translation from 'services/translation';
import Routes from 'routes';
import AuthContextProvider from 'context/AuthContext';
import LangContextProvider from 'context/LangContext';
import Loading from 'components/ui/loading/Loading';

import 'index.css';

const app = (
  <Suspense fallback={<Loading />}>
    <I18nextProvider i18n={translation}>
      <LangContextProvider>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </LangContextProvider>
    </I18nextProvider>
  </Suspense>
);

ReactDOM.render(app, document.getElementById('root'));
