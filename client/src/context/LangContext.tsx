import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE } from 'constants/translation';

interface ILangContext {
  lang: string;
  changeLanguage: (language: string) => void;
}

export const LangContext = React.createContext<ILangContext>({
  lang: '',
  changeLanguage: () => undefined,
});

const LangContextProvider: React.FC = ({ children }) => {
  const [lang, setLang] = useState(
    localStorage.getItem('lang') || DEFAULT_LANGUAGE
  );
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    localStorage.setItem('lang', language);
    setLang(language);
    i18n.changeLanguage(language);
  };

  return (
    <LangContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangContextProvider;
