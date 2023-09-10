import i18next from 'i18next';
import i18nHttpMiddleware from 'i18next-http-middleware';

import ptLocale from '../locales/pt-br.json';

i18next.use(i18nHttpMiddleware.LanguageDetector).init({
  lng: 'pt-BR',
  preload: ['pt-BR'],
  fallbackLng: 'pt-BR',
  resources: {
    "pt-BR": ptLocale
  }
})

export default i18next;