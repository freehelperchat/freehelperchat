import i18next from 'i18next';
import Backend from 'i18next-chained-backend';
import HttpApiBackend from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';

import {
  DEFAULT_LANGUAGE,
  DEFAULT_NAMESPACE,
  LOCALSTORAGE_PREFIX,
} from 'constants/translation';
import { baseURL } from 'services/api';

const lang = localStorage.getItem('lang');

i18next.use(Backend).init({
  interpolation: { escapeValue: false },
  fallbackLng: DEFAULT_LANGUAGE,
  ns: [DEFAULT_NAMESPACE],
  defaultNS: DEFAULT_NAMESPACE,
  lng: lang || DEFAULT_LANGUAGE,
  backend: {
    backends: [LocalStorageBackend, HttpApiBackend],
    backendOptions: [
      {
        prefix: LOCALSTORAGE_PREFIX,
        expirationTime: 10 * 24 * 60 * 60 * 1000,
      },
      {
        loadPath: `${baseURL}translations/{{lng}}/{{ns}}.json`,
      },
    ],
  },
});

export default i18next;
