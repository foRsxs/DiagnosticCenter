import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import RNLanguages from 'react-native-languages';

import en from './translations/en.json';
import kz from './translations/kz.json';
import ru from './translations/ru.json';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback) => { 
    RNLanguages.addEventListener('change', ({ language }) => {
      callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: () => {}
}

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'ru',
    resources: {en, kz, ru},
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    }
  });

export default i18n;