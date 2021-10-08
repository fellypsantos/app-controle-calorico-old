import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import DeviceLocaleHandler from '../DeviceLocaleHandler';

import portuguese from './translation/pt';
import english from './translation/en';
import spanish from './translation/es';

const resources = {
  pt: {translation: portuguese},
  en: {translation: english},
  es: {translation: spanish},
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: DeviceLocaleHandler.getSupported(),
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
